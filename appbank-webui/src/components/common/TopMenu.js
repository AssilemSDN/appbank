import React, { useState, useCallback } from 'react'
import { Menu, Button, Image, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue } from 'recoil'

import {
  userFirstNameState,
  userIsAdminState,
  logoState,
  nomState,
  iconState
} from '../../states/AppState'

const routes = {
  home: '/',
  accounts: '/espace-client/comptes',
  transfers: '/espace-client/virements',
  users: '/espace-administrateur/utilisateurs',
  converter: '/convertisseur-devises'
}

const TopMenu = () => {
  const title = useRecoilValue(nomState)
  const icon = useRecoilValue(iconState)
  window.document.title = title
  const favicon = window.document.getElementById("favicon")
  favicon.setAttribute("href", `/${icon}`)
  console.log(favicon)

  const logo = useRecoilValue(logoState)
  const userFirstName = useRecoilValue(userFirstNameState)
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const [activeItem] = useState(window.location.pathname)
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  const handleOnSelectMenu = (e, { name }) => {
    console.log('TopMenu', 'handleSelectMenu', name)
    navigate(routes[name])
  }

  // delegate keycloak login handler
  const handleOnLogin = useCallback(() => {
    keycloak.login()
  }, [keycloak])

  // delegate keycloak logout handler
  const handleOnLogout = useCallback(() => {
    keycloak.logout()
  }, [keycloak])


  return (
    <Menu inverted borderless fixed='top' >
      <Menu.Item> 
        <Image src={`/assets/images/${logo}`} size='mini' />
      </Menu.Item>
      <Menu.Item onClick={handleOnSelectMenu} name='home' active={activeItem === routes.home}>Accueil</Menu.Item>
      {!keycloak.authenticated &&
      <>
      <Menu.Item>Epargner</Menu.Item>
      <Menu.Item>Emprunter</Menu.Item>
      <Menu.Item>Assurer</Menu.Item>
      <Menu.Item>Trouver une agence</Menu.Item>
      <Menu.Item>Banque à distance</Menu.Item> </>}
      
      {keycloak.authenticated && userIsAdmin && 
        <Menu.Item onClick={handleOnSelectMenu} name='users' active={activeItem === routes.users}>Utilisateurs</Menu.Item>}
      {keycloak.authenticated &&
        <>
          <Menu.Item onClick={handleOnSelectMenu} name='accounts' active={activeItem === routes.accounts}>Comptes</Menu.Item>
          <Menu.Item onClick={handleOnSelectMenu} name='transfers' active={activeItem === routes.transfers}>Virements</Menu.Item>
          <Menu.Item onClick={handleOnSelectMenu} name='converter' active={activeItem === routes.converter}>Convertisseur de devises</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item className='hello'>
              Bonjour, {userFirstName}
            </Menu.Item>
            <Menu.Item>
              <Button onClick={handleOnLogout} color='red' inverted>Se déconnecter</Button>
            </Menu.Item>
          </Menu.Menu>
          
        </>}
      {!keycloak.authenticated &&
        <>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button disabled inverted color='blue' style={{ marginRight: '10px' }}>S'enregistrer</Button>
              <Button onClick={handleOnLogin} color='blue' inverted> <Icon name='lock' />Se connecter</Button>
            </Menu.Item>
          </Menu.Menu>
        </>}
    </Menu>
  )
}

export default TopMenu
