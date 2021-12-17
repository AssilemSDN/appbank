import React from 'react'
import { 
  Card,  
  Message
} from 'semantic-ui-react'
import { 
  useRecoilValue,
} from 'recoil'

import {
  adminUsersState,
} from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'


const AdminListUsers = () => {
  const users = useRecoilValue(adminUsersState)
  //const [nameUser, setNameUser] = useState(false)

  const data = []
  users.map(user =>{
    appbankApi.getAccountsFromEmail(user.email).then(accounts => {
      data.push({
        userid: user.id,
        email: user.email,
        nbAccounts: accounts.length
      })
    })
  })
  
  console.log('data',data)
  console.log(data.length)

  return (
    <Card.Group>
      {data.length===0 &&
        <Message negative>
          Aucun utilisateur n'est inscrit pour le moment.
        </Message>}
      {data.map(d => {
        return (
          <Card color='blue' key={`userID_${d.userid}`}>
            <Card.Content>
              {/*<Card.Header>{nameUser}</Card.Header>*/}
              <Card.Meta>Client n°{d.userid}</Card.Meta>
              <Card.Description>
                <strong>Email :</strong> {d.email} <br />
                <strong>Nombre de comptes :</strong>  {d.nbAccounts}
              </Card.Description>
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}
export default AdminListUsers