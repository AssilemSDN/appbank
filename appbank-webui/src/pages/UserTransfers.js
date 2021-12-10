import React, {useCallback, useState} from 'react'
import { 
  Card, 
  Dropdown, 
  Button,
  Header, 
  Container, 
  Modal,
  Form, 
  Grid, 
  Icon, 
  Dimmer, 
  Loader,
  Message,
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'

import TopMenu from '../components/TopMenu'
import {
  userAccountsState,
  userIsAdminState,
  userBankTransfersWaitingState,
  bankTransfersState,
  allAccountsState
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'

// Administrateur vue --------------------

  /*
  * L'utilisateur peut faire des virements : ils sont placés en attentes jusqu'à réponse de l'administrateur
  * L'administrateur peut accepter ou non les virements
  */

const TransfersToAccept = () => {
  const [bankTransfers, setBankTransfers] = useRecoilState(bankTransfersState)
  const [validate, setValidate] = useState('')

  const data = []
  bankTransfers.map(bankTransfer => {
    data.push({
      key: `bankTransferId_${bankTransfer.id}`,
      id: bankTransfer.id,
      src : bankTransfer.accountIdSrc,
      dst: bankTransfer.accountIdDst,
      amount: bankTransfer.amount,
    })
  })

  const isEmpty = data.length===0

  const validateBankTransfer = (bankTransferId, validate) => {
    console.log ('validateBankTranfer')
    appbankApi.validateBankTransfer(bankTransferId, validate).then(data => {
      if (data === false) {
        return false
      }
      appbankApi.getAllBankTransfers().then(data => {
        if (data === false) {
          return false
        }
        setBankTransfers(data)
      })
    })
  }

  return (
    
    <Card.Group>
      {isEmpty &&
        <Container> 
          <Message>
            Il n'y a aucun virement à valider pour le moment. 
          </Message>
        </Container>
      }
      {data.map(bankTransfer => {
        return (
          <Card color='blue' key={`bank_transfert_${bankTransfer.id}`}>
            <Card.Content>
              <Card.Header>Virement n°{bankTransfer.id}</Card.Header>
              <Card.Description>
                <strong>Compte émetteur :</strong> n°{bankTransfer.src}  <br />
                <strong>Compte destinataire :</strong> n°{bankTransfer.dst}  <br />
                <strong>Montant</strong> : {bankTransfer.amount}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color='black' content="Refuser" onClick={() => validateBankTransfer(bankTransfer.id,false)} />
              <Button color='teal' content="Accepter" onClick={() => validateBankTransfer(bankTransfer.id,true)}  />
            </Card.Content> 
          </Card>
          
        )
      })}
    </Card.Group>
  )
}

// Utilisateur vue --------------------


const FormTransfer = () => {
  const userAccounts = useRecoilValue(userAccountsState)
  const allAccounts = useRecoilValue(allAccountsState)
  const [userBankTransfersWaiting, setUserBankTransfersWaiting] = useRecoilState (userBankTransfersWaitingState)
  const [currentAccount, setCurrentAccount] = useState(false)
  const [otherAccount, setOtherAccount] = useState(false)
  const [amount, setAmount] = useState(false)

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
    appbankApi.addBankTransfer(currentAccount,otherAccount,amount).then(bankTransfer => {
      if (bankTransfer === false) {
        // try to do something in case of error
        return false
      }
      setUserBankTransfersWaiting(userBankTransfersWaiting + 1)
      // setUserBankTransfersWaiting(appbankApi.getNbBankTransfersWaitingFromUserId(userId))
      console.log('addBankTransfer', 'addBankTransfer()', currentAccount, bankTransfer)
    })
  }, [currentAccount, otherAccount, amount])

  const handleChangeCurrentAccount = (e, accounts) => {
    console.log('FormListAccounts', 'handleChangeCurrentAccount()', accounts.value)
    setCurrentAccount(accounts.value)
  }

  const handleChangeOtherAccount = (e, accounts) => {
    console.log('FormListAccounts', 'handleChangeOtherAccount()', accounts.value)
    setOtherAccount(accounts.value)
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
      {/*<Container>
        <Message>
          Nombre de virements effectués : {userBankTransfersWaiting}
        </Message>
      </Container>*/}
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
      <Button onClick={addBankTransfer} disabled={currentAccount === false || amount === false || otherAccount === false} color='blue'>Ajouter</Button>
    </Form>
  )
}

// Page ------------------
const UserTransfers = () => {
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const setBankTransfers = useSetRecoilState(bankTransfersState)
  const { initialized } = useKeycloak()

  const getAllBankTransfers = useCallback(() => {
    if (initialized === true && userIsAdmin === true)
    console.log('UserTransfers', 'getAllBankTransfer()')
    appbankApi.getAllBankTransfers().then(data => {
      console.log('UserTransfers', 'getAllBankTransfers()', data)
      if (data === false) { return false }
      setBankTransfers(data)
    })
  }, [initialized, userIsAdmin])

  const getAllBankTransfersFromUserid = useCallback(() => {
    if (initialized === true && userIsAdmin === false)
    console.log('UserTransfers', 'getAllBankTransfersFromUserid()')
    appbankApi.getAllBankTransfersFromUserid().then(data => {
      console.log('UserTransfers', 'getAllBankTransfersFromUserid()', data)
      if (data === false) { return false }
      setBankTransfers(data)
    })
  }, [initialized, userIsAdmin])

  if (!initialized) {
    return (
      <Container>
        <Dimmer active>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    )
  }

  if (userIsAdmin === true) {
    getAllBankTransfers()
  } 
  // else {
  //   getAllBankTransfersFromUserid()
  // }


  return (
    <Container>
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='calculator' />
        <Header.Content>
          Virements
          {userIsAdmin &&
            <Header.Subheader>Gestion des virements en attente de validation</Header.Subheader>}
        </Header.Content>
      </Header>
      {!userIsAdmin &&
        <Grid>
          <Grid.Column width={4}>
            {/*<UserListTransfers /> */}
          </Grid.Column>
          <Grid.Column width={9}>
            <FormTransfer />
          </Grid.Column>
        </Grid> }
      {userIsAdmin &&
        <TransfersToAccept />}
    </Container>
  )
}

export default UserTransfers
