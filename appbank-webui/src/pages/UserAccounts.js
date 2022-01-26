import React from 'react'
import { 
  Header, 
  Container, 
  Icon, 
  Dimmer, 
  Loader, 
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { 
  useRecoilValue,
} from 'recoil'

import TopMenu from '../components/common/TopMenu'
import Footer from '../components/common/Footer'
import AdminMenuAccounts from '../components/useraccounts/AdminMenuAccounts'
import UserMenuAccounts from '../components/useraccounts/UserMenuAccounts'
import {
  userIsAdminState,
} from '../states/AppState'


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
    <>
    <Container className='Page' style={{padding: "15px", 'minHeight': '65vh'}} >
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='print' />
        <Header.Content>
          Comptes
          {userIsAdmin &&
            <Header.Subheader>Gestion des comptes bancaires des utilisateurs</Header.Subheader>}
          {!userIsAdmin &&
            <Header.Subheader>Gestion de vos comptes personnels</Header.Subheader>} 
        </Header.Content>
      </Header>
      {userIsAdmin &&
        <AdminMenuAccounts />}
      {!userIsAdmin &&
        <UserMenuAccounts />}   
    </Container>
    <Footer />
    </>
  )
}

export default UserAccounts
