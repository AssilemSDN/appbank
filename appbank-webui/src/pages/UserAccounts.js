import React, { useCallback, useEffect, useState } from 'react'
import { 
  Card, 
  Modal,
  Dropdown, 
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
import { useRecoilValue } from 'recoil'

import TopMenu from '../components/TopMenu'
import {
  adminUsersState,
  adminAccountsState,
  userIsAdminState,
  userAccountsState,
  userEmailState
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'


// Admin components ----------------------------

const AdminListUsers = () => {
  const users = useRecoilValue(adminUsersState)
  const [nameUser, setNameUser] = useState(false)
  const [nbAccountsUser, setNbAccountsUser] = useState(false)
  
  const getNameUser = (userId) => {
    setNameUser('Toto')
  }
  console.log(users)
  return (
    <Card.Group>
      {users.map(user => {
        return (
          <Card color='blue' key={`userID_${user.id}`}>
            <Card.Content>
              <Card.Header>{nameUser}</Card.Header>
              <Card.Meta>Client n°{user.id}</Card.Meta>
              <Card.Description>
                <strong>Email :</strong> {user.email} <br />
                <strong>Nombre de comptes :</strong> 222222
              </Card.Description>
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}

const AdminAddAccount = () => {
  const users = useRecoilValue(adminUsersState)
  const [currentUser, setCurrentUser] = useState(false)
  const [hasBeenSuccessful, setHasBeenSuccessful] = useState (false)

  const data = []
  users.map(user => {
    data.push({
      key: `userId_${user.id}`,
      text: user.email,
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

const AdminListAccounts = () => {
  const adminAccounts = useRecoilValue(adminAccountsState)
  
  const handleChangeCanBeOverdraft = useCallback( (accountid, canBeOverdraft) => {
    appbankApi.changeCanBeOverdraft(accountid, canBeOverdraft)
  })

  console.log(adminAccounts)
  return (
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
              <Button content='Autoriser le découvert' onClick={() => {handleChangeCanBeOverdraft(account.id, true)}} />}
            {account.canBeOverdraft && 
              <Button content='Désactiver le découvert' onClick={() => {handleChangeCanBeOverdraft(account.id, false)}} />}
          </Card>
        )
      })}
    </Card.Group>
    
  )
}

const AdminMenu = () => {
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
            {IsActiveItem('allAccounts') &&
              <AdminListAccounts />}
            {IsActiveItem('addAccount') &&
              <AdminAddAccount />}
            {IsActiveItem('removeAccount') &&
              <></>}
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
  
    const confirmation = () => {
      console.log('WithdrawalModal', 'confirmation')
      appbankApi.withdrawalAccount(accountId, amount).then(data => {
        console.log('WithdrawalModal', 'confirmation','data', data)
        setHasBeenSuccessful(data)
        if (data === true) {
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
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='teal'>Retirer</Button>}
    >
      <Modal.Header>Compte n°  {accountId} : Retrait</Modal.Header>
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


const AccountsCard = () => {
  const userEmail = useRecoilValue(userEmailState)
  const userAccounts = useRecoilValue(userAccountsState)

  const accounts = []
  userAccounts.map(account => {
    accounts.push({
      key: `accountId_${account.id}`,
      text: account.id,
      value: account.id
    })
    return true
  })

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
                <strong>Autorisation de découvert :</strong> Non
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
        <AdminMenu />
        </> }
      {!userIsAdmin &&
        <AccountsCard />}
        
    </Container>
  )
}

export default UserAccounts
