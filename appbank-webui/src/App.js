import React from 'react'

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"

import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'

import { RecoilRoot } from 'recoil'

import Home from "./components/pages/home/Home.js"
import LoginFormAdmin from "./components/pages/LoginFormAdmin.js"
import LoginFormClient from "./components/pages/LoginFormClient.js"
import UserDashboard from './components/pages/UserDashboard'

function App () {

  const keycloak = new Keycloak({
    url: `http://localhost:8000/auth`, // KEYCLOAK URL
    realm: "appbank",
    clientId: "react-app"
  })

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {

      }
    }
  }

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={(event,error) => handleOnEvent(event,error)}
    >
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/accueil" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ReactKeycloakProvider>
  )
  
}
export default App;
