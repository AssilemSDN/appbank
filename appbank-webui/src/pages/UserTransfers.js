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
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import TopMenu from '../components/TopMenu'
import {
  userAccountsState,
  userIsAdminState,
  bankTransfersState,
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'
  /*
  * L'utilisateur peut faire des virements : ils sont placés en attentes jusqu'à réponse de l'administrateur
  * L'administrateur peut accepter ou non les virements
  */

const TransfersToAccept = () => {
  const bankTransfers = useRecoilValue(bankTransfersState)

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

  const validateBankTransfer = (bankTransferId, validate) => {
    appbankApi.validateBankTransfer(bankTransferId, validate).then(data => {
      if (data === false) {
        return false
      }
    })
  }

  return (
    <Card.Group>
      {data.map(bankTransfer => {
        return (
          <Card color='blue' key={`bank_transfert_${bankTransfer}`}>
            <Card.Content>
              <Card.Header>Transfer n°{bankTransfer.id}</Card.Header>
              <Card.Description>
                <strong>Compte émetteur :</strong> n°{bankTransfer.src}  <br />
                <strong>Compte destinataire :</strong> n°{bankTransfer.dst}  <br />
                <strong>Montant</strong> : {bankTransfer.amount}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color='black' content="Refuser" onClick={validateBankTransfer} />
              <Button color='teal' content="Accepter" onClick={validateBankTransfer} />
            </Card.Content> 
          </Card>
          
        )
      })}
    </Card.Group>
  )
}

const FormTransfer = () => {
  const userAccounts = useRecoilValue(userAccountsState)
  const [currentAccount, setCurrentAccount] = useState(false)
  const [otherAccount, setOtherAccount] = useState(false)
  const [currentAmount, setCurrentAmount] = useState (false)
  const [amount,setAmount] = useState(false)

  const accounts = []
  userAccounts.map(account => {
    accounts.push({
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
      
      console.log('addBankTransfer', 'addBankTransfer()', currentAccount, bankTransfer)
    })
  }, [currentAccount])

  const handleChangeCurrentAccount = (e, accounts) => {
    console.log('FormListAccounts', 'handleChangeCurrentAccount()', accounts.value)
    setCurrentAccount(accounts.value)
  }

  const handleChangeCheckAmountPositive = (event) => {
    console.log('FormListAccounts', 'checkAmountPositive()', event.key)

    if (event.key == '-') {
      event.preventDefault()
    }
  }
  
  return (
    <Grid>
      <Grid.Column width={4}></Grid.Column>
      <Grid.Column width={9}>
        <Form>
          <Card fluid color='blue'>
            <Card.Content header='Envoyer depuis le compte : ' />
            <Card.Content>
              <Dropdown onChange={handleChangeCurrentAccount} placeholder='Sélectionner un compte' fluid selection options={accounts} />
            </Card.Content>
          </Card>
          <header> Montant </header>
          <Form.Input type='number' as='input' value={amount} onChange={(e => setAmount(e.target.value))} min="0" step="1" onKeyDown={handleChangeCheckAmountPositive}  ></Form.Input> 
          <header> Compte destinataire </header>
          <Form.Input type='number' as='input' value={otherAccount} onChange={(e => setOtherAccount(e.target.value))} min="0" step="1" onKeyDown={handleChangeCheckAmountPositive}  ></Form.Input>  
          <Button onClick={addBankTransfer} disabled={currentAccount === false && currentAmount === false} color='blue'>Ajouter</Button>
        </Form>
      </Grid.Column>
  </Grid> 
  )
}

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

  return (
    <Container>
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='calculator' />
        <Header.Content>
          UserTransfers
          <Header.Subheader>Nothing to do...</Header.Subheader>
        </Header.Content>
      </Header>
      {!userIsAdmin &&
        <FormTransfer />}
      {userIsAdmin &&
        <TransfersToAccept />}
    </Container>
  )
}

export default UserTransfers
