import React, {useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Card, 
  Dropdown, 
  Button,
  Header, 
  Container, 
  Form, 
  Grid, 
  Icon, 
  Dimmer, 
  Loader,
  Label, 
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue } from 'recoil'

import TopMenu from '../components/TopMenu'
import {
  adminUsersState,
  userIsAdminState,
  userAccountsState,
  userEmailState
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'
  /*
  * L'utilisateur peut faire des virements : ils sont placés en attentes jusqu'à réponse de l'administrateur
  * L'administrateur peut accepter ou non les virements
  */

const FormTransfer = () => {
  const userAccounts = useRecoilValue(userAccountsState)
  const [currentAccount, setCurrentAccount] = useState(false)
  const [currentAmount, setCurrentAmount] = useState (false)

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
    appbankApi.addBankTransfer(currentAccount).then(accounts => {
      if (accounts === false) {
        // try to do something in case of error
        return false
      }
      console.log('addBankTransfer', 'addBankTransfer()', currentAccount, accounts)
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
          <Form.Input type='number' as='input' min="0" step="1" onKeyDown={handleChangeCheckAmountPositive}  ></Form.Input> 
          <header> Compte destinataire </header>
          <Form.Input type='number' as='input' min="0" step="1" onKeyDown={handleChangeCheckAmountPositive}  ></Form.Input>  
          <Button onClick={addBankTransfer} disabled={currentAccount === false && currentAmount === false} color='blue'>Ajouter</Button>
        </Form>
      </Grid.Column>
  </Grid> 
  )
}

const UserTransfers = () => {
  const { initialized } = useKeycloak()
  
  if (!initialized) {
    return (
      <Container>
        <Dimmer active>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    )
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
      <FormTransfer />
    </Container>
  )
}

export default UserTransfers
