import React, { useState, useCallback } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue } from 'recoil'

import {
  userFirstNameState,
  userIsAdminState,
} from '../../states/AppState'

const routes = {
  home: '/',
  accounts: '/espace-client/comptes',
  transfers: '/espace-client/virements',
  users: '/espace-administrateur/utilisateurs',
  converter: '/convertisseur-devises'
}

const TopMenu = () => {
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
    <Menu inverted fixed='top' style={{ padding: '5px' }}>
      <Menu.Item onClick={handleOnSelectMenu} name='home' active={activeItem === routes.home}>Accueil</Menu.Item>
      {keycloak.authenticated &&
        <>
          {userIsAdmin && <Menu.Item onClick={handleOnSelectMenu} name='users' active={activeItem === routes.users}>Utilisateurs</Menu.Item>}
          <Menu.Item onClick={handleOnSelectMenu} name='accounts' active={activeItem === routes.accounts}>Comptes</Menu.Item>
          <Menu.Item onClick={handleOnSelectMenu} name='transfers' active={activeItem === routes.transfers}>Virements</Menu.Item>
          <Menu.Item onClick={handleOnSelectMenu} name='converter' active={activeItem === routes.converter}>Convertisseur de devises</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
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
              <Button onClick={handleOnLogin} color='blue' inverted>Se connecter</Button>
            </Menu.Item>
          </Menu.Menu>
        </>}
    </Menu>
  )
}

export default TopMenu
