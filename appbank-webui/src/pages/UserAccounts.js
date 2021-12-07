import React, { useCallback, useState } from 'react'
import { Card, Dropdown, Header, Container, Icon, Dimmer, Loader, Menu, Button } from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

import TopMenu from '../components/TopMenu'
import {
  adminUsersState,
  userIsAdminState,
  userAccountsState,
  userEmailState
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'

const AdminListUsers = () => {
  const users = useRecoilValue(adminUsersState)
  const [currentUser, setCurrentUser] = useState(false)

  const data = []
  users.map(user => {
    data.push({
      key: `userId_${user.id}`,
      text: user.email,
      value: user.email
    })
    return true
  })

  const addAccountFromEmail = useCallback(() => {
    console.log('AdminListUsers', 'addAccountFromEmail()', currentUser)
    appbankApi.addAccountFromEmail(currentUser).then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'addAccountFromEmail()', currentUser, data)
    })
  }, [currentUser])

  const handleChangeCurrentUser = (e, data) => {
    console.log('AdminListUsers', 'handleChangeCurrentUser()', data.value)
    setCurrentUser(data.value)
  }

  return (
    <Card fluid color='blue'>
      <Card.Content header='Quel utilisateur choisir pour ajouter un compte ?' />
      <Card.Content>
        <Dropdown onChange={handleChangeCurrentUser} placeholder='Sélectionner un utilisateur' fluid selection options={data} />
      </Card.Content>
      <Card.Content extra>
        <Button onClick={addAccountFromEmail} disabled={currentUser === false} color='blue'>Ajouter</Button>
      </Card.Content>
    </Card>
  )
}

const AccountsCard = () => {
  const userEmail = useRecoilValue(userEmailState)
  const userAccounts = useRecoilValue(userAccountsState)
  //const navigate = useNavigate()
  const [currentAccount, setCurrentAccount] = useState(false)

  
  const handleOnAccountCard = (e) => {
    const accountid = e.currentTarget.getAttribute("accountid")
    console.log(e)
    //navigate(`/espace-client/comptes/test`)
    //navigate(`/espace-client/comptes/${accountid}`)
  }

  return (
    <Card.Group>
      {userAccounts.map(account => {
        return (
          <Card color='blue' key={`accountId_${account.id}`} onClick={handleOnAccountCard} accountid={account.id} >
            <Card.Content>
              <Card.Header>Compte n°{account.id}</Card.Header>
              <Card.Meta>Propriétaire: {userEmail}</Card.Meta>
              <Card.Description>
                <strong>Solde :</strong> ${account.solde}€<br />
                <strong>Autorisation de découvert :</strong> Non
              </Card.Description>
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}


const UserAccounts = () => {
  const userIsAdmin = useRecoilValue(userIsAdminState)
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
        <Icon name='print' />
        <Header.Content>
          UserAccounts
          <Header.Subheader>Nothing to do...</Header.Subheader>
        </Header.Content>
      </Header>
      {userIsAdmin &&
        <AdminListUsers />}
      {!userIsAdmin &&
        <AccountsCard />}
        
    </Container>
  )
}

export default UserAccounts
