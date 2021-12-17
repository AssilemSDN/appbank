import React, { useState } from 'react'
import { 
  Card, 
  Modal,
  Header, 
  Grid,
  Container, 
  Icon, 
  Form,
  Menu,
  Dimmer, 
  Segment,
  Loader, 
  Button, 
  Message
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { 
  useRecoilValue,
  useSetRecoilState, 
} from 'recoil'

import TopMenu from '../components/common/TopMenu'
import AdminListAccounts from '../components/useraccounts/AdminListAccounts'
import AdminAddAccount from '../components/useraccounts/AdminAddAccount'
import AdminRemoveAccount from '../components/useraccounts/AdminRemoveAccount'

import {
  adminUsersState,
  userIsAdminState,
  userAccountsState,
  userEmailState
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'


const AdminListUsers = () => {
  const users = useRecoilValue(adminUsersState)
  const [nameUser, setNameUser] = useState(false)

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
              <Card.Header>{nameUser}</Card.Header>
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


// Users components ----------------------------

const DepositModal = (props) => {
  const { accountId, accountSolde } = props
  const [open, setOpen] = useState();
  const [amount,setAmount] = useState(false)

  const confirmation = () => {
    console.log('confirmation')
    appbankApi.depositAccount(accountId, amount).then(data => {
      if (data === false) {
        return false
      }
    }) 
    setOpen(false)
  }
  
  return(
  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color='black'>Déposer</Button>}
  >
    <Modal.Header>Compte n° : {accountId} Dépot</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Solde actuel : {accountSolde} </Header>
        <Form>
          <header>Insérer le montant à déposer</header>
          <Form.Input type='number' as='input' value={amount} onChange={e => setAmount(e.target.value)} min="0" step="1" ></Form.Input> 
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={() => setOpen(false)} content="Annuler" />
      <Button
        content="Confirmer"
        labelPosition='right'
        icon='checkmark'
        onClick={confirmation}
        positive
      />
      </Modal.Actions>
    </Modal>
    )
  }

  const WithdrawalModal = (props) => {
    const { accountId, accountSolde } = props
    const [open, setOpen] = useState();
    const [amount,setAmount] = useState(false)
    const [hasBeenSuccessful, setHasBeenSuccessful] = useState(true)
    const setUserAccounts = useSetRecoilState(userAccountsState)
    const userEmail = useRecoilValue(userEmailState)

    const confirmation = () => {
      console.log('WithdrawalModal', 'confirmation')
      appbankApi.withdrawalAccount(accountId, amount).then(data => {
        console.log('WithdrawalModal', 'confirmation','data', data)
        setHasBeenSuccessful(data)
        if (data === true) {
          setUserAccounts(appbankApi.getAccountsFromEmail(userEmail))
          console.log('withdrawal hello')
          setOpen(false)
        }
      }) 
    }

    // useEffect(() => {
    //   console.log('WithdrawalModal', 'confirmation', 'hasBeenSuccessful', hasBeenSuccessful)
    //   if (hasBeenSuccessful === true) {
    //     setHasBeenSuccessful(false)
    //   }
    // }, [hasBeenSuccessful])
    
    return(
    <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button color='teal'>Retirer</Button>}>
      <Modal.Header>Compte n°{accountId} : Retrait</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Solde actuel : {accountSolde} </Header>
          <Form>
            <header>Insérer le montant à retirer</header>
            <Form.Input type='number' as='input' value={amount} onChange={e => setAmount(e.target.value)} min="0" step="1" ></Form.Input> 
          </Form>
          {!hasBeenSuccessful &&
            <Message negative> 
              Oups, il semblerait que vous n'ayez pas ni les fonds nécessaires ni le droit pour effectuer ce retrait.
            </Message>}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)} content="Annuler" />
        <Button content="Confirmer" labelPosition='right' icon='checkmark' onClick={confirmation} positive />
        </Modal.Actions>
      </Modal>
      )
    }


const UserMenuAccounts = () => {
  const userEmail = useRecoilValue(userEmailState)
  const userAccounts = useRecoilValue(userAccountsState)

  console.log('accounts',userAccounts)
  return (
    <Card.Group>
      {userAccounts.map(account => {
        return (
          <Card color='blue' key={`accountId_${account.id}`}>
            <Card.Content>
              <Card.Header>Compte n°{account.id}</Card.Header>
              <Card.Meta>Propriétaire: {userEmail}</Card.Meta>
              <Card.Description>
                <strong>Solde :</strong> {account.solde}€<br />
                <strong>Autorisation de découvert :</strong> {!account.canBeOverdraft && <>Non</>} {account.canBeOverdraft && <>Oui</>}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <DepositModal accountId={account.id} accountSolde={account.solde} />
              <WithdrawalModal accountId={account.id} accountSolde={account.solde} /> 
            </Card.Content> 
          </Card>
        )
      })}
    </Card.Group> 
  )
}

// Page component

const UserAccounts = () => {
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const { initialized } = useKeycloak()

  if (!initialized) {
    return (
      <Container>
        <Dimmer active>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    )
  }
  return (
    <Container>
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='print' />
        <Header.Content>
          Comptes
          {userIsAdmin &&
            <Header.Subheader>Gestion des comptes bancaires des utilisateurs</Header.Subheader>}
          {!userIsAdmin &&
            <Header.Subheader>Gestion de vos comptes personnels</Header.Subheader>} 
        </Header.Content>
      </Header>
      {userIsAdmin &&
        <>
        <AdminMenuAccounts />
        </> }
      {!userIsAdmin &&
        <UserMenuAccounts />}   
    </Container>
  )
}

export default UserAccounts
