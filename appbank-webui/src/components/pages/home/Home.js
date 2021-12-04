import React, { useEffect, useState } from 'react'
import {
  Button,
  Header,
  Icon,
  Grid,
  Segment,
  Loader
} from 'semantic-ui-react'

import { useKeycloak } from '@react-keycloak/web'

import TopMenu from '../../topmenus/TopMenu'

import {appbankApi} from '../../utils/AppBankApi'

const Home = () => {

    return  (
        <TopMenu />
    )
    // const [mounted, setMounted] = useState(false)
    // const [user, setUser] = useState(false) //User connected
    // const [token, setToken ] = useState(false)
    // const [users, setUsers] = useState([])
    // const { keycloak } = useKeycloak()

    // const getName = () => {
    //    return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.name
    // }
    // const getFirstName = () => {
    //     return getName().split(" ")[0];
    // }

    // const getAllUsers = async () => {
    //     console.log('getAllUsers')
    //     const data = await appbankApi.getAllUsers(token)
    //     setUsers(data)
    //     return true
    // }

    // const synchronizeDatabaseWithKeycloak = async (email) => {
    //     console.log('synchronizeDatabaseWithKeycloak', email)
    //     setUser(email)
    //     const result = await appbankApi.synchronizeDatabaseWithKeycloak(email,token)
    //     console.log('result', result)
    //     return true
    // }

    // const getAccountsFromEmail = async (email) => {
    //     console.log('getAccountsFromEmail','home')
    //     await appbankApi.getAccountsFromEmail(email,token)
    //     return true;
    // }
    // const addAccountFromEmail = async () => {
    //     console.log('getAccountsFromEmail','home')
    //     await appbankApi.addAccountFromEmail(user,token)
    //     return true;
    // }

    // const initialized = async () => {
    //     console.log('initialized')
    //     setMounted(true)
    //     if (keycloak.authenticated) {
    //         const { email } = keycloak.tokenParsed
    //         // setToken(keycloak.token)
    //         await synchronizeDatabaseWithKeycloak(email)
    //         await getAllUsers()
    //     }
    // }

    // if (!mounted) {
    //     initialized()
    // }

    // if (keycloak.initialized === false) {
    //     return (
    //         <>
    //         <div>
    //             <Loader active inline='centered' />
    //         </div>
    //         </>
    //     )
    // }

    // return (
    //     <>
    //     <TopMenu/>
    //     {!keycloak.authenticated &&
    //     <>
    //         <Segment
    //         inverted
    //         textAlign='center'
    //         style={{ minHeight: 400, padding: '15em 0em' }}
    //         vertical>
                
    //             <Header 
    //                 as='h1'
    //                 content='RandomBank'
    //                 inverted
    //                 style={{
    //                     fontWeight: 'normal',
    //                     fontSize:'4em',
    //                 }}
    //             />
    //             <Header 
    //                 as='h2'
    //                 content='Nouveau parmi nous?'
    //                 inverted
    //                 style={{
    //                     fontWeight: 'normal',
    //                     fontSize:'1.7em',
    //                 }}
    //             />
    //             <Button primary size='huge'>
    //                 S'enregistrer
    //                 <Icon name='right arrow' />
    //             </Button>
                
    //         </Segment>
    //     </>
    //     }
    //     {keycloak.authenticated &&
    //     <>
    //      <Segment
    //         inverted
    //         textAlign='center'
    //         style={{ minHeight: 200, padding: '12em 0em 8em' }}
    //         vertical>
     
    //             <Header 
    //                 as='h2'
    //                 content='Bonjour'
    //                 inverted
    //                 style={{
    //                     fontWeight: 'normal',
    //                     fontSize:'1.7em',
    //                 }}
    //             />
    //             {getFirstName()}
    //         </Segment>
    //      <Segment style={{ padding: '5em 0em' }} vertical>
    //      <Grid container stackable verticalAlign='middle'>
    //        <Grid.Row>
    //          <Grid.Column width={8}>
    //             <Button 
    //             primary 
    //             size='huge'
    //             onClick={addAccountFromEmail}
    //             >
    //                 Ajouter un compte pour {getFirstName()}
    //                 <Icon name='right arrow' />
    //             </Button>
    //            <Header as='h3' style={{ fontSize: '2em' }}>
    //              Voir mes comptes
    //            </Header>
    //            <p style={{ fontSize: '1.33em' }}>
    //                 <ul>
    //                 {['toto', 'titi'].map((value, index) => {
    //                     return (
    //                         <li key={index}>{index}: {value}</li>
    //                     )
    //                 })}
    //                 </ul>
    //                 Nb Users: {users.length}<br />
    //                 User: {user}<br />
    //                 Token: {token}
    //             </p>
    //          </Grid.Column>
    //        </Grid.Row>
          
    //      </Grid>
    //    </Segment>
    //     </>
    //     }
    //     </>
    // )
}
export default Home
