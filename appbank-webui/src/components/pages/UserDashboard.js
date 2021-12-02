import React from 'react'
import {
  Container,
  Header,
} from 'semantic-ui-react'

import TopMenu from '../topmenus/TopMenu'

import { Route, Navigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import {userAuthState, userFirstNameState, useridState, userLastNameState} from '../../states/State'

//import AuthentificationService from '../../services/AuthentificationService';

const UserDashboard = () => {
    const [userAuth, setUserAuth] = useRecoilState(userAuthState)
    const [userFirstName, setUserFirstName] = useRecoilState(userFirstNameState)
    const [userLastName, setUserLastName] = useRecoilState(userLastNameState)
    const [userid, setUserid] = useRecoilState(useridState)

    if (userAuth) {
        return(
        <>
        <div className="border-red">
            <TopMenu/>
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>Content de vous revoir, {userFirstName}.</Header>
                <p>
                    Vous êtes connecté en tant que client ! Youpi
                </p>
            </Container>
        </div>
        </>
    )} else { /* S'il n'est pas connecté */
        return <Navigate to="/espace-client" />
    }
    
} 
export default UserDashboard