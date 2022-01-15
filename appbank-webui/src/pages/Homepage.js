import React, { useCallback } from 'react'
import { Header, Container, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import TopMenu from '../components/common/TopMenu'
import Synchronizer from '../components/Synchronizer'
import UserCard from '../components/homepage/UserCard'
import { appbankApi } from '../utils/AppBankApi'
import {
  adminAccountsState,
  adminUsersState,
  userIsAdminState,
  userEmailState,
  userAccountsState,
  allAccountsState
} from '../states/AppState'

const HomePage = () => {
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const setAdminUsers = useSetRecoilState(adminUsersState)
  const setAdminAccounts = useSetRecoilState(adminAccountsState)
  const setUserAccounts = useSetRecoilState(userAccountsState)
  const setAllAccounts = useSetRecoilState(allAccountsState)
  const userEmail = useRecoilValue(userEmailState)
  const { keycloak, initialized } = useKeycloak()

  const getAllUsers = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAllUsers()', 'authenticated', authenticated)
    appbankApi.getAllUsers().then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllUsers()', 'users', data.length)
      setAdminUsers(data)
    })
  }, [keycloak, setAdminUsers])

  const getAllAccounts = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAllAccounts()', 'authenticated', authenticated)
    appbankApi.getAllAccounts().then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllAccounts()', 'accounts', data.length)
      setAdminAccounts(data)
      setAllAccounts(data)
    })
  }, [keycloak, setAdminAccounts])

  const getAccountsFromEmail = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAccountsFromEmail()', 'authenticated', authenticated)
    appbankApi.getAccountsFromEmail(userEmail).then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllgetAccountsFromEmailAccouts()', 'accounts', data.length)
      setUserAccounts(data)
    })
  }, [keycloak, setUserAccounts, userEmail])

  if (userIsAdmin) {
    getAllUsers()
    getAllAccounts()
  }

  if (!userIsAdmin && userEmail !== false) {
    getAccountsFromEmail()
    getAllAccounts()
  }

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
      <Synchronizer />
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='home' />
        <Header.Content>
          Accueil
          {userIsAdmin && keycloak.authenticated &&
            <Header.Subheader>Administrateur</Header.Subheader>}
          {!userIsAdmin && keycloak.authenticated &&
            <Header.Subheader>Client</Header.Subheader>}
            {!keycloak.authenticated &&
              <Header.Subheader>Bienvenue :)</Header.Subheader>}
      </Header.Content>
      </Header>
      {keycloak.authenticated &&
        <UserCard />}
    </Container>
  )
}

export default HomePage
