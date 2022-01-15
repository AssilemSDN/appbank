import React, { useCallback, useState } from 'react'
import { 
  Card,
  Dropdown,
  Button, 
  Message
} from 'semantic-ui-react'
import { 
  useRecoilValue,
  useRecoilState, 
  useSetRecoilState
} from 'recoil'

import {
  adminUsersState,
  adminAccountsState,
} from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'


const AdminAddAccount = () => {
  const users = useRecoilValue(adminUsersState)
  const setAdminAccounts = useSetRecoilState (adminAccountsState)
  const [currentUser, setCurrentUser] = useState(false)
  const [hasBeenSuccessful, setHasBeenSuccessful] = useState (false)

  const data = []
  users.map(user => {
    data.push({
      key: `userId_${user.id}`,
      text: `Client n°${user.id} | ${user.firstName} ${user.lastName}`,
      value: user.email
    })
    return true
  })

  const addAccountFromEmail = useCallback(() => {
    console.log('AdminListUsers', 'addAccountFromEmail()', currentUser)
    appbankApi.addAccountFromEmail(currentUser).then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'addAccountFromEmail()', currentUser, data)
      setHasBeenSuccessful(true)
      setCurrentUser(false)
      appbankApi.getAllAccounts().then(data => {
        if (data === false) {
          // try to do something in case of error
          return false
        }
        console.log('HomePage', 'getAllAccounts()', 'accounts', data.length)
        setAdminAccounts(data)
      })
    })
  }, [currentUser])

  const handleChangeCurrentUser = (e, data) => {
    console.log('AdminListUsers', 'handleChangeCurrentUser()', data.value)
    setCurrentUser(data.value)
    setHasBeenSuccessful(false)
  }
  
  return (
    <>
    <Card fluid color='blue'>
      <Card.Content header='Quel utilisateur choisir pour ajouter un compte ?' />
      <Card.Content>
        <Dropdown onChange={handleChangeCurrentUser} placeholder='Sélectionner un utilisateur' fluid selection options={data} />
      </Card.Content>
      <Card.Content extra>
        <Button onClick={addAccountFromEmail} disabled={currentUser === false} color='blue'>Ajouter</Button>
        {hasBeenSuccessful &&
          <Message positive>
            Compte ajouté avec succès ! 
          </Message>}
      </Card.Content>
    </Card>
    </>
  )
}
export default AdminAddAccount