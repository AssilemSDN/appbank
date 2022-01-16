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


const AdminListUsers = () => {
  const users = useRecoilValue(adminUsersState)
  //const [nameUser, setNameUser] = useState(false)

  console.log('data',users)
  console.log(users.length)
  return (
    <Card.Group>
      {users.length===0 &&
        <Message negative>
          Aucun utilisateur n'est inscrit pour le moment.
        </Message>}
      {users.map(u => {
        return (
          <Card color='blue' key={`userID_${u.id}`}>
            <Card.Content>
              {/*<Card.Header>{nameUser}</Card.Header>*/}
              <Card.Meta>Client n°{u.id}</Card.Meta>
              <Card.Meta>{u.firstName} {u.lastName}</Card.Meta>
              <Card.Description>
                <strong>Email :</strong> {u.email} <br />
                <strong>Nombre de comptes bancaires :</strong> ...
              </Card.Description>
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}
export default AdminListUsers