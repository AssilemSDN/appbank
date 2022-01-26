import React, { useCallback, useState } from 'react'
import { 
  Card,
  Dropdown, 
  Button, 
  Message
} from 'semantic-ui-react'
import { 
  useRecoilState 
} from 'recoil'

import {
  adminAccountsState,
} from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'

const AdminRemoveAccount = () => {
    const [adminAccounts, setAdminAccounts] = useRecoilState (adminAccountsState)
    const [currentAccount, setCurrentAccount] = useState(false)
    const [hasBeenSuccessful, setHasBeenSuccessful] = useState (false)
  
    const data = []
    adminAccounts.map(account =>{
      data.push({
        key: `accountId_${account.id}`,
        text: `Compte n°${account.id}`,
        value: account.id
      })
      return true
    })
  
    const removeAccountFromAccountId = useCallback((accountid) => {
      appbankApi.removeAccountFromAccountId(accountid).then(data => {
        if (data === false) {
          // try to do something in case of error
          return false
        }
        const newAdminAccounts = adminAccounts.filter((account) => account.id !== accountid);
        setAdminAccounts(newAdminAccounts);
        setHasBeenSuccessful(true)
        setCurrentAccount(false)
      })
    }, [adminAccounts, setAdminAccounts, setHasBeenSuccessful, setCurrentAccount])
  
    const handleChangeCurrentAccount = (e, data) => {
      console.log('AdminListUsers', 'handleChangeCurrentAccount()', adminAccounts)
      setCurrentAccount(data.value)
      setHasBeenSuccessful(false)
    }
    
    return (
      <>
        <Card fluid color='blue'>
            <Card.Content header='Quel compte à supprimer ?' />
            {adminAccounts.length===0 &&
            <Card.Content>
                <Message negative>Aucun compte n'est enregistré pour le moment.</Message>
            </Card.Content>}
            {adminAccounts.length!==0 &&
            <Card.Content>
                <Dropdown onChange={handleChangeCurrentAccount} placeholder='Sélectionner un compte' fluid selection options={data} />
            </Card.Content>}
            <Card.Content extra>
                {adminAccounts.length!==0 &&
                <Button onClick={() => {removeAccountFromAccountId(currentAccount)}} disabled={currentAccount === false} color='blue'>Supprimer</Button>}
                {hasBeenSuccessful &&
                <Message positive>
                Compte supprimé avec succès ! 
                </Message>}
            </Card.Content>
        </Card>
      </>
    )
}
export default AdminRemoveAccount