import React, {useState} from 'react'
import { 
  Grid, 
  Segment,
  Menu,
} from 'semantic-ui-react'

import AdminListUsers from './AdminListUsers'

const AdminMenuUsers = () => {
    const [activeItem, setActiveItem] = useState('allAccounts')
  
    const IsActiveItem  = (item) => {
      return activeItem === item
    }
  
    const handleItemClick = (newActiveItem) => {
      console.log(newActiveItem)
      setActiveItem(newActiveItem)
    }
  
    return (
      <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
            <Menu.Item
                name='Liste des utilisateurs'
                active={activeItem === 'allUsers'}
                onClick={() => {handleItemClick('allUsers')}}
              />
              <Menu.Item
                name='Ajouter un utilisateur'
                active={activeItem === 'addUser'}
                onClick={() => {handleItemClick('addUser')}}
              />
              <Menu.Item
                name='Supprimer un utilisateur'
                active={activeItem === 'removeUser'}
                onClick={() => {handleItemClick('removeUser')}}
              />
            </Menu>
          </Grid.Column>
  
          <Grid.Column stretched width={12}>
            <Segment>
              {IsActiveItem('allUsers') &&
                <AdminListUsers />}
              {IsActiveItem('addUser') &&
                <></>}
              {IsActiveItem('removeUser') &&
                <></>}
            </Segment>
          </Grid.Column>
        </Grid>
    )
  }
  
export default AdminMenuUsers