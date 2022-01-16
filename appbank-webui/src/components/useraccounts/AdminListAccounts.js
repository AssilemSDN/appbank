import React, { useCallback } from 'react'
import { 
  Card,  
  Button, 
  Message
} from 'semantic-ui-react'
import { useRecoilState } from 'recoil'
import { adminAccountsState } from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'


const AdminListAccounts = () => {
    const [adminAccounts, setAdminAccounts] = useRecoilState(adminAccountsState)
    
    const handleChangeCanBeOverdraft = useCallback( async (accountid, canBeOverdraft) => {
      await appbankApi.changeCanBeOverdraft(accountid, canBeOverdraft)
      appbankApi.getAllAccounts().then(data => {
        setAdminAccounts(data)
      })
    }, [setAdminAccounts]) 
  
    return (
      <>
      {adminAccounts.length===0 &&
      <Message negative>
        Aucun compte n'a été rajouté pour le moment.
      </Message>}
      <Card.Group>
          {adminAccounts.map(account => {
          return (
            <Card color='blue' key={`accountId_${account.id}`}>
              <Card.Content>
                <Card.Header>Compte n°{account.id}</Card.Header>
                <Card.Meta> Client n°{account.proprietaireID}</Card.Meta>
                <Card.Description>
                  <strong>Solde :</strong> {account.solde}€<br />
                  <strong>Autorisation de découvert :</strong> {!account.canBeOverdraft && <>Non</>} {account.canBeOverdraft && <>Oui</>}
                </Card.Description>
              </Card.Content>
              {!account.canBeOverdraft && 
                <Button color='teal' content='Autoriser le découvert' onClick={() => {handleChangeCanBeOverdraft(account.id, true)}} />}
              {account.canBeOverdraft && 
                <Button color='black' content='Désactiver le découvert' onClick={() => {handleChangeCanBeOverdraft(account.id, false)}} />}
            </Card>
          )
        })}
      </Card.Group>
      </>
    )
}
export default AdminListAccounts