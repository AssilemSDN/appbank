import React from 'react'
import {
  Container,
  Header,
} from 'semantic-ui-react'

import TopMenu from '../../topmenus/TopMenu'

import { Route, Navigate } from 'react-router-dom'

const UserAccounts = () => {

 
        return(
        <>
        <div className="border-red">
            <TopMenu/>
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>Content de vous revoir, .</Header>
                <p>
                    Vous êtes connecté en tant que client ! Youpi
                </p>
            </Container>
        </div>
        </>
    )

    
} 
export default UserAccounts