import React, { useState } from 'react'
import {
  Container,
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Grid,
  Segment,
  Loader
} from 'semantic-ui-react'

import { useKeycloak } from '@react-keycloak/web'

import TopMenu from '../../topmenus/TopMenu'

import {appbankApi} from '../../utils/AppBankApi'

const Home = () => {
    const [user, setUser] = useState(false)
    const [token, setToken ] = useState(false)
    const { keycloak, initialized } = useKeycloak()

    const getName = () => {
       return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
    }

    const getAllUsers = async () => {
        console.log("Toz")
        console.log(appbankApi.getAllUsers (token))
        return true
    }
    
    const getUserIdFromEmail = async (email) => {
        console.log('getUserIdFromEmail', email)
        // call api, who return data
        // Here a "MOCK"
        const data = {
            email,
            id: '001-111-DDDD'
        }
        setUser(data)
        return true
    }
    
    console.log('Home.js', 'renderer')

    if (initialized === false) {
        return (
            <>
            <div>
                <Loader active inline='centered' />
            </div>
            </>
        )
    }

    if (user === false && keycloak.authenticated && keycloak.tokenParsed) {
        const { email } = keycloak.tokenParsed
        setToken(keycloak.token)
        getUserIdFromEmail(email)
        return (
            <>
            <div>
                <Loader active inline='centered' />
            </div>
            </>
        )
    }

    return (
        <>
        <TopMenu/>
        {!keycloak.authenticated &&
        <>
            <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 400, padding: '15em 0em' }}
            vertical>
                
                <Header 
                    as='h1'
                    content='RandomBank'
                    inverted
                    style={{
                        fontWeight: 'normal',
                        fontSize:'4em',
                    }}
                />
                <Header 
                    as='h2'
                    content='Nouveau parmi nous?'
                    inverted
                    style={{
                        fontWeight: 'normal',
                        fontSize:'1.7em',
                    }}
                />
                <Button primary size='huge'>
                    S'enregistrer
                    <Icon name='right arrow' />
                </Button>
                
            </Segment>
        </>
        }
        {keycloak.authenticated &&
        <>
         <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 200, padding: '12em 0em 8em' }}
            vertical>
     
                <Header 
                    as='h2'
                    content='Bonjour'
                    inverted
                    style={{
                        fontWeight: 'normal',
                        fontSize:'1.7em',
                    }}
                />
                {getName()}
            </Segment>
         <Segment style={{ padding: '5em 0em' }} vertical>
         <Grid container stackable verticalAlign='middle'>
           <Grid.Row>
             <Grid.Column width={8}>
               <Header as='h3' style={{ fontSize: '2em' }}>
                 Voir mes comptes
               </Header>
               <p style={{ fontSize: '1.33em' }}>
                   <ul>
                    {['toto', 'titi'].map((value, index) => {
                        return (
                            <li>{index}: {value}</li>
                        )
                    })}
                  </ul>
                 User: {user.email}<br />
                 Token: {token}

                 
                </p>
                
               
             </Grid.Column>
           </Grid.Row>
          
         </Grid>
       </Segment>
        </>
        }
        </>
    )
}
export default Home
