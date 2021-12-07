import React from 'react'
import { Header, Container, Form, Grid, Icon, Dimmer, Loader, Placeholder } from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'

import TopMenu from '../components/TopMenu'

  /*
  * L'utilisateur peut faire des virements : ils sont placés en attentes jusqu'à réponse de l'administrateur
  * L'administrateur peut accepter ou non les virements
  */

  

const Toz = () => {
  return (
    <Grid>
      <Grid.Column width={4}>
        
      </Grid.Column>
      <Grid.Column width={9}>
      <Form>
        <Form.Input label='Numéro de compte source'></Form.Input>
        <Form.Input label='Numéro de compte dest'></Form.Input> 
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
      <Toz />
    </Container>
  )
}

export default UserTransfers
