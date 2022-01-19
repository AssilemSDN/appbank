import React, { useCallback } from 'react'
import { 
  Image, 
  Header, 
  Container, 
  Icon, 
  Dimmer, 
  Loader, 
  Grid
} from 'semantic-ui-react'
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

import Footer from '../components/common/Footer'

const HomePage = () => {
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const setAdminUsersState = useSetRecoilState(adminUsersState)
  const setAdminAccountsState = useSetRecoilState(adminAccountsState)
  const setUserAccountsState = useSetRecoilState(userAccountsState)
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
      setAdminUsersState(data)
    })
  }, [keycloak, setAdminUsersState])

  const getAllAccounts = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAllAccounts()', 'authenticated', authenticated)
    appbankApi.getAllAccounts().then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllAccounts()', 'accounts', data.length)
      setAdminAccountsState(data)
      setAllAccounts(data)
    })
  }, [keycloak, setAdminAccountsState])

  const getAccountsFromEmail = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAccountsFromEmail()', 'authenticated', authenticated)
    appbankApi.getAccountsFromEmail(userEmail).then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllgetAccountsFromEmailAccouts()', 'accounts', data.length)
      setUserAccountsState(data)
    })
  }, [keycloak, setUserAccountsState, userEmail])

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
    <>
    <Container className='Page' style={{padding: "15px", 'min-height': '65vh'}} >
      <Synchronizer />
      <TopMenu />
      {!keycloak.authenticated &&
      <Container className='Image'>
        <Image src='/assets/images/home.jpg' fluid />
      </Container>}
      {keycloak.authenticated &&
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='home' />
        <Header.Content>
          Accueil
          {userIsAdmin &&
            <Header.Subheader>Administrateur</Header.Subheader>}
          {!userIsAdmin &&
            <Header.Subheader>Client</Header.Subheader>}
      </Header.Content>
      </Header>}
      {keycloak.authenticated &&
        <UserCard />}
    </Container>
    <Footer />
  </> 
  )
}

export default HomePage
