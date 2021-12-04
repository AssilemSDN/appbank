import React, { useCallback } from 'react'

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

    /*
     return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }*/
    const { keycloak, initialized } = useKeycloak()

    // delegate keycloak login handler
    const login = useCallback(() => {
        keycloak.login()
        // Communication with our API : we have to send the email. 
    }, [keycloak])

    // delegate keycloak logout handler
    const logout = useCallback(() => {
        keycloak.logout()
    }, [keycloak])

    if (initialized === false) {
        return (
            <>
            </>
        )
    }
    return(
        <>
        <Visibility>
            <Menu inverted
              fixed='top'
              size='large'
            >
                <Container>
                    <Menu.Item as={NavLink} exact to="/" active>
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
                            onClick={logout}
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
                            onClick={login}
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

