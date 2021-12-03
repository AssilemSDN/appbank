import React , {useState} from 'react'

import {
    Button,
    Container,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Menu,
    Message,
    Segment,
  } from 'semantic-ui-react'  



import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    Link
} from "react-router-dom"

import TopMenu from '../topmenus/TopMenu'


import {useRecoilState} from 'recoil'
import {userAuthState, userFirstNameState, useridState, userLastNameState} from '../../states/State'


// Page de login du client
const LoginFormClient = () => {
    const [userAuth, setUserAuth] = useRecoilState(userAuthState)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasLoginFailed, setLoginFailed] = useState(false)
    const [userFirstName, setUserFirstName] = useRecoilState(userFirstNameState)
    const [userLastName, setUserLastName] = useRecoilState(userLastNameState)
    const [userid, setUserid] = useRecoilState(useridState)

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    
        
    if (!userAuth) {
        return (
            <>
                <TopMenu/>
                <Grid columns= {2} relaxed='very' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment>
                    <Header as='h3' color='teal' textAlign='center'>
                        Connexion - Espace client
                    </Header>
                    {hasLoginFailed &&
                    <>
                    <Message>
                        Mot de passe ou email incorrects.
                    </Message>
                    </> }
                    <Form size='large'>
                        <Form.Input
                            name='email'
                            fluid 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='E-mail'
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <Form.Input
                            name='password'
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Mot de passe'
                            type='password'
                            value={password}
                            onChange={handleChangePassword}
                        />
                        <Button disabled={email==='' || password===''} color='teal' fluid size='large'>
                            Se connecter
                        </Button>
                        <Divider horizontal/>
                        <Container>
                            Se connecter avec
                            <Menu.Item>
                                <Icon link name='facebook'></Icon>
                                <Icon link name='github'>
                                </Icon>
                                <Icon link name='google'></Icon>
                                <Icon link name='microsoft'></Icon>
                            </Menu.Item>
                        </Container>
                    </Form>
                    <Divider horizontal/>
                    <Link to="/espace-professionnel">
                        Espace professionnel
                    </Link>
                </Segment>
                    
                </Grid.Column>
        
                <Grid.Column streatched='false' verticalAlign='middle' style={{ maxWidth:450 }}>
                    <Container>
                        <Header as='h4' textAlign='center'>
                            Nouveau parmi nous ?
                        </Header>
                        <Button color='teal' content="S'inscrire" icon='signup' size='big' />
                    </Container>
                </Grid.Column>
                
            </Grid>
            <Divider vertical>OU</Divider>
        </>
        )
    }
    else {
        return <Navigate to="/espace-client/9" />
    }
    
}
export default LoginFormClient