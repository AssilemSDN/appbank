import React, {useCallback} from 'react'
import { 
  Header, 
  Container, 
  Grid, 
  Icon, 
  Dimmer, 
  Loader,
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import TopMenu from '../components/common/TopMenu'
import Footer from '../components/common/Footer'
import {
  userIsAdminState,
  userBankTransfersWaitingState,
  bankTransfersState,
  userIdState,
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'

import AdminTransfersToAccept from '../components/usertransfers/AdminTransfersToAccept'
import UserListTransfers from '../components/usertransfers/UserListTransfers'
import UserFormTransfer from '../components/usertransfers/UserFormTransfer'


const UserTransfers = () => {

  const userId = useRecoilValue(userIdState)
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const setBankTransfers = useSetRecoilState(bankTransfersState)
  const setUserBankTransfersWaiting = useSetRecoilState (userBankTransfersWaitingState)
  const { initialized } = useKeycloak()
  

  const getAllBankTransfers = useCallback(() => {
    if (initialized === true && userIsAdmin === true) {
      console.log('UserTransfers', 'getAllBankTransfer()')
      appbankApi.getAllBankTransfers().then(data => {
        console.log('UserTransfers', 'getAllBankTransfers()', data)
        if (data === false) { return false }
        setBankTransfers(data)
      })
    }
  }, [initialized, userIsAdmin, setBankTransfers])


  const getAllBankTransfersFromUserid = useCallback(() => {
    if (initialized === true && userIsAdmin === false) {
      console.log('UserTransfers', 'getAllBankTransfersFromUserid()')
      appbankApi.getAllBankTransfersFromUserid(userId).then(data => {
        console.log('UserTransfers', 'getAllBankTransfersFromUserid()', data)
        if (data === false) { return false }
        setUserBankTransfersWaiting (data)
      })
    }
  }, [initialized, userIsAdmin, userId, setUserBankTransfersWaiting])

  if (!initialized) {
    return (
      <Container>
        <Dimmer active>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    )
  }

  if (userIsAdmin === true) {
    getAllBankTransfers()
  } 
  else {
    getAllBankTransfersFromUserid(userId)
  }

  return (
    <>
    <Container className='Page' style={{padding: "15px", 'min-height': '65vh'}} >
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='calculator' />
        <Header.Content>
          Virements
          {userIsAdmin &&
            <Header.Subheader>Gestion des virements en attente de validation</Header.Subheader>}
        </Header.Content>
      </Header>
      {!userIsAdmin &&
        <Grid columns={2} padded='vertically'>
          <Grid.Column>
            <UserFormTransfer />
          </Grid.Column>
          <Grid.Column>
            <UserListTransfers />
          </Grid.Column>
        </Grid> }
      {userIsAdmin &&
        <AdminTransfersToAccept />}
    </Container>
    <Footer />
    </>
  )
}

export default UserTransfers
