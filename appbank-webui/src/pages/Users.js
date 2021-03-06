import React from 'react'
import { Header, Container, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'

import TopMenu from '../components/common/TopMenu'
import AdminMenuUsers from '../components/users/AdminMenuUsers'
import Footer from '../components/common/Footer'

const Users = () => {
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
      <Container className='Page' style={{padding: "15px", 'min-height': '65vh'}} >
        <TopMenu />
        <Header as='h1' block style={{ marginTop: '100px' }}>
          <Icon name='print' />
          <Header.Content>
            Utilisateurs 
            <Header.Subheader>Gestion des utilisateurs</Header.Subheader>
          </Header.Content>
        </Header>
        <AdminMenuUsers />
      </Container>
      <Footer />
      </>
    )
  }
  
  export default Users
  