import React from 'react'

import {
  Container,
  Dropdown,
  Media,
  Visibility,
  Segment,
  Button,
  Header,
  Icon,
  Image,
  Menu
} from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import logobank from '../../images/logo-bank.png'

const TopMenu = (props) => {
    const { keycloak } = useKeycloak()

    const handleLogout = () => {
        props.history.push('/')
        keycloak.logout()
    }

    const handleLogin = () => {
        keycloak.login()  // Si nouveau client : il faut l'ajouter dans notre api
    }

    const checkAuthenticated = () => {
        if (!keycloak.authenticated) {
            handleLogin()
        }
    }

    const getName = () => {
       return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
    }


    return(
        <>
        <Visibility>
            <Menu inverted
              fixed='top'
              size='large'
            >
                <Container>
                    <Menu.Item as={NavLink} exact to="/accueil" >
                        Accueil
                    </Menu.Item>
                    <Menu.Item position='right'>
                        {keycloak.authenticated &&
                        <>
                        <Menu.Item as={NavLink} exact to="/espace-client/comptes" active>
                            Comptes
                        </Menu.Item>
                        <Menu.Item as={NavLink} exact to="/espace-client/virements" active>
                            Virements
                        </Menu.Item>
                        <Button 
                            as={NavLink} 
                            to="/" 
                            onClick={handleLogout}
                            inverted 
                            style={{ marginLeft: '0.5em' }}
                        >
                            Se déconnecter
                        </Button>
                        </>
                        }   
                        {!keycloak.authenticated &&
                        <>
                        
                        <Button as='a' inverted>
                            S'enregistrer
                        </Button>
                        <Button 
                            as={NavLink} 
                            to="/espace-client" 
                            onClick={handleLogin}
                            inverted 
                            style={{ marginLeft: '0.5em' }}
                        >
                            Se connecter
                        </Button>
                        </>
                        }
                    </Menu.Item>
                </Container>
            </Menu>
        </Visibility>

       
        </>
    )
}
export default TopMenu

