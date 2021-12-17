import React from 'react'
import { 
  Card, 
  Icon, 
  Image
} from 'semantic-ui-react'
import { useRecoilValue } from 'recoil'

import {
    adminAccountsState,
    adminUsersState,
    userIsAdminState,
    userIdState,
    userLastSyncroState,
    userEmailState,
    userFirstNameState,
    userLastNameState,
    userAccountsState,
} from '../../states/AppState'


const UserCard = () => {
    const userId = useRecoilValue(userIdState)
    const userEmail = useRecoilValue(userEmailState)
    const userFirstName = useRecoilValue(userFirstNameState)
    const userLastName = useRecoilValue(userLastNameState)
    const userLastSyncro = useRecoilValue(userLastSyncroState)
    const userIsAdmin = useRecoilValue(userIsAdminState)
    const adminUsers = useRecoilValue(adminUsersState)
    const adminAccounts = useRecoilValue(adminAccountsState)
    const userAccounts = useRecoilValue(userAccountsState)

    const avatar = !userIsAdmin ? 'https://react.semantic-ui.com/images/avatar/large/matthew.png' : 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'

    return (
    <Card>
        <Image src={avatar} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{userFirstName} {userLastName}</Card.Header>
        <Card.Meta>
            <span className='date'>Synchro: {userLastSyncro}</span>
        </Card.Meta>
        <Card.Description>
            <strong>Id :</strong> {userId}<br />
            <strong>Email :</strong> {userEmail}
        </Card.Description>
        </Card.Content>
        {userIsAdmin &&
        <Card.Content extra>
            <Icon name='user' />
            {adminUsers.length} utilisateurs
            <Icon name='print' style={{ marginLeft: '5px' }} />
            {adminAccounts.length} comptes
        </Card.Content>}
        {!userIsAdmin &&
        <Card.Content extra>
            <Icon name='print' />
            {userAccounts.length} comptes
        </Card.Content>}
    </Card>
    )
} 
export default UserCard