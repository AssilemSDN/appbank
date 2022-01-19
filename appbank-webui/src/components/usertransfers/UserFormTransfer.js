import React, {useCallback, useState} from 'react'
import { 
  Card, 
  Dropdown, 
  Button,
  Divider,
  Form, 
  Message,
} from 'semantic-ui-react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  userAccountsState,
  userBankTransfersWaitingState,
  userIdState,
  allAccountsState
} from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'

const UserFormTransfer = () => {
    const userAccounts = useRecoilValue(userAccountsState)
    const allAccounts = useRecoilValue(allAccountsState)
    const setUserBankTransfersWaiting = useSetRecoilState (userBankTransfersWaitingState)
    const [currentAccount, setCurrentAccount] = useState(false)
    const [otherAccount, setOtherAccount] = useState(false)
    const [amount, setAmount] = useState(false)
    const [isOk, setIsOk] = useState(true)
  
    const userId = useRecoilValue(userIdState)
  
    const accounts = []
    userAccounts.map(account => {
      accounts.push({
        key: `accountId_${account.id}`,
        text: account.id,
        value: account.id
      })
      return true
    })
  
    const accountsGlobal = []
    allAccounts.map(account => {
      accountsGlobal.push({
        key: `accountId_${account.id}`,
        text: account.id,
        value: account.id
      })
      return true
    })
  
    const addBankTransfer = useCallback(() => {
      console.log('FormListAccounts', 'addBankTransfer()', currentAccount)
      setIsOk(true)
      appbankApi.addBankTransfer(currentAccount,otherAccount,amount).then(bankTransfer => {
        if (bankTransfer === false || bankTransfer === null) {
          console.log("FormListAccounts", "addBankTransfer()", bankTransfer)
          setIsOk(false)
          return false
        }
        appbankApi.getAllBankTransfersFromUserid(userId).then(data => {
          setUserBankTransfersWaiting(data)
        })
        console.log('addBankTransfer', 'addBankTransfer()', currentAccount, bankTransfer)
      })
    }, [currentAccount, otherAccount, amount, userId, setUserBankTransfersWaiting])
  
    const handleChangeCurrentAccount = (e, account) => {
      console.log('FormListAccounts', 'handleChangeCurrentAccount()', account.value)
      setCurrentAccount(account.value)
    }
  
    const handleChangeOtherAccount = (e, account) => {
  
      console.log('FormListAccounts', 'handleChangeOtherAccount()', account.value)
      setOtherAccount(account.value)
    }
  
    const handleChangeAmount = (e) => {
      console.log('FormListAccounts', 'handleChangeAmount()', e.target.value)
      setAmount(e.target.value)
    }
  
    const handleChangeCheckAmountPositive = (e) => {
      console.log('FormListAccounts', 'checkAmountPositive()', e.key)
      if (e.key === '-') {
        e.preventDefault()
      }
    }
    
    return (
  
      <Form>
        <Card fluid color='blue'>
          <Card.Content header='Envoyer depuis le compte : ' />
          <Card.Content>
            <Dropdown onChange={handleChangeCurrentAccount} placeholder='Sélectionner un compte' fluid selection options={accounts} />
          </Card.Content>
        </Card>
        <header> Montant </header>
        <Form.Input type='number' value={amount} onChange={handleChangeAmount} min="0" step="1" onKeyDown={handleChangeCheckAmountPositive}  ></Form.Input> 
        <header> Compte destinataire </header>
        <Dropdown onChange={handleChangeOtherAccount} placeholder='Sélectionner un compte' fluid selection options={accountsGlobal} />
        <Divider />
        <Button onClick={addBankTransfer} disabled={currentAccount === false || amount === false || otherAccount === false || otherAccount === currentAccount} color='teal'>Ajouter</Button>
        {!isOk &&
        <Message negative> 
          Oups, il semblerait que vous n'ayez pas ni les fonds nécessaires ni le droit pour effectuer ce virement depuis le compte {currentAccount}.
        </Message>
        }
      </Form>
    )
}
export default UserFormTransfer