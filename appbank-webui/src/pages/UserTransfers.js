import React from 'react'
import { Header, Container, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'

import TopMenu from '../components/TopMenu'

  /*
  * L'utilisateur peut faire des virements : ils sont placés en attentes jusqu'à réponse de l'administrateur
  * L'administrateur peut accepter ou non les virements
  */
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
    </Container>
  )
}

export default UserTransfers
