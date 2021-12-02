import React from 'react'
import {
    Button,
    Divider,
    Form,
    Grid,
    Header,
    Segment,
  } from 'semantic-ui-react'  

import {
    Link
} from "react-router-dom"


import TopMenu from '../topmenus/TopMenu'

//Page de login de l'admin
class LoginFormAdmin extends React.Component {
    render() {
        return (
            <>
                <TopMenu/>
                <Grid relaxed='very' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Segment>
                            <Header as='h3' color='teal' textAlign='center'>
                                Connexion - Espace professionnel
                            </Header>
                            <Form size='large'>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Identifiant' />
                                <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Mot de passe'
                                type='password'
                                />
                                <Button color='teal' fluid size='large'>
                                    Se connecter
                                </Button>
                                <Divider horizontal> </Divider>
                            </Form>
                            <Divider horizontal> </Divider>
                            <Link to="/espace-client">
                                Espace client
                            </Link>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        )
    }
}
  export default LoginFormAdmin