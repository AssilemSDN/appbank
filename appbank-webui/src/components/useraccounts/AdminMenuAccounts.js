import React, {useState} from 'react'
import { 
  Grid, 
  Segment,
  Menu,
} from 'semantic-ui-react'

import AdminAddAccount from './AdminAddAccount'
import AdminListAccounts from './AdminListAccounts'
import AdminRemoveAccount from './AdminRemoveAccount'

const AdminMenuAccounts = () => {
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
                name='Liste des comptes bancaires'
                active={activeItem === 'allAccounts'}
                onClick={() => {handleItemClick('allAccounts')}}
              />
              <Menu.Item
                name='Ajouter un compte bancaire'
                active={activeItem === 'addAccount'}
                onClick={() => {handleItemClick('addAccount')}}
              />
              <Menu.Item
                name='Supprimer un compte bancaire'
                active={activeItem === 'removeAccount'}
                onClick={() => {handleItemClick('removeAccount')}}
              />
            </Menu>
          </Grid.Column>
  
          <Grid.Column stretched width={12}>
            <Segment>
              {IsActiveItem('allAccounts') &&
                <AdminListAccounts />}
              {IsActiveItem('addAccount') &&
                <AdminAddAccount />}
              {IsActiveItem('removeAccount') &&
                <AdminRemoveAccount />}
            </Segment>
          </Grid.Column>
        </Grid>
    )
  }
  
export default AdminMenuAccounts