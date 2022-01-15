import React, {useCallback, useState} from 'react'
import { 
  Card, 
  Dropdown, 
  Button,
  Header, 
  Container, 
  Divider,
  Form, 
  Grid, 
  Icon, 
  Dimmer, 
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'

import TopMenu from '../components/common/TopMenu'
import {
  userAccountsState,
  userIsAdminState,
  userBankTransfersWaitingState,
  bankTransfersState,
  userIdState,
  allAccountsState
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'

// Administrateur vue --------------------

  /*
  * L'utilisateur peut faire des virements : ils sont placés en attentes jusqu'à réponse de l'administrateur
  * L'administrateur peut accepter ou non les virements
  */

const AdminTransfersToAccept = () => {
  const [bankTransfers, setBankTransfers] = useRecoilState(bankTransfersState)

  const data = []
  bankTransfers.map(bankTransfer => {
    data.push({
      key: `bankTransferId_${bankTransfer.id}`,
      id: bankTransfer.id,
      src : bankTransfer.accountIdSrc,
      dst: bankTransfer.accountIdDst,
      amount: bankTransfer.amount,
    })
  })

  const validateBankTransfer = (bankTransferId, validate) => {
    console.log ('validateBankTranfer')
    appbankApi.validateBankTransfer(bankTransferId, validate).then(data => {
      if (data === false) {
        return false
      }
      appbankApi.getAllBankTransfers().then(data => {
        if (data === false) {
          return false
        }
        setBankTransfers(data)
      })
    })
  }

  return (
    <Card.Group>
      {data.length === 0 &&
        <Container> 
          <Message>
            Il n'y a aucun virement à valider pour le moment. 
          </Message>
        </Container>
      }
      {data.map(bankTransfer => {
        return (
          <Card color='blue' key={`bank_transfert_${bankTransfer.id}`}>
            <Card.Content>
              <Card.Header>Virement n°{bankTransfer.id}</Card.Header>
              <Card.Description>
                <strong>Compte émetteur :</strong> n°{bankTransfer.src}  <br />
                <strong>Compte destinataire :</strong> n°{bankTransfer.dst}  <br />
                <strong>Montant</strong> : {bankTransfer.amount}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color='black' content="Refuser" onClick={() => validateBankTransfer(bankTransfer.id,false)} />
              <Button color='teal' content="Accepter" onClick={() => validateBankTransfer(bankTransfer.id,true)}  />
            </Card.Content> 
          </Card>
          
        )
      })}
    </Card.Group>
  )
}

// Utilisateur vue --------------------

const UserListTransfers = () => {
  const [userBankTransfersWaiting, setUserBankTransfersWaiting] = useRecoilState(userBankTransfersWaitingState)
  const [bankTransferIdToDelete, setBankTransfersToDelete] = useState(-1)
  const userId = useRecoilValue(userIdState)

  const bankTransfers = []
  userBankTransfersWaiting.map(bankTransfer => {
    bankTransfers.push({
      key: `bankTransferId_${bankTransfer.id}`,
      text: bankTransfer.id,
      value: bankTransfer.amount,
    })
    return true
  })

  console.log (userBankTransfersWaiting)
  console.log(bankTransfers)

  const deleteBankTransfer = useCallback(() => {
    console.log('UserListTransfers', 'deleteBankTransfer()', bankTransferIdToDelete)
    appbankApi.deleteBankTransfer(userId,bankTransferIdToDelete).then(bankTransfer => {
      if (bankTransfer === false) {
        // try to do something in case of error
        return false
      }
      appbankApi.getAllBankTransfersFromUserid(userId).then (data => {
        setUserBankTransfersWaiting(data)
      })
    })
  }, [bankTransferIdToDelete, userId, setUserBankTransfersWaiting, userBankTransfersWaiting])

  const handleChangeBankToDelete = (e, bankTransferId) => {
    setBankTransfersToDelete(bankTransferId.options)
    deleteBankTransfer()
  }

  return (
    <Container>     
      <Header>
        Virements en attente de validation 
      </Header>
      {bankTransfers.length === 0 &&
        <Message>
          Il n'y a aucun virement en attente de validation pour le moment. 
        </Message>
      }
      {bankTransfers.map(bankTransfer => {
        return (
          <Segment>
            <Header as='h3'>Virement n°{bankTransfer.text}</Header>
            <Container>
              <strong>Montant: </strong>{bankTransfer.value} <br />
            </Container>
            <Divider />
            <Button onClick={handleChangeBankToDelete} color='black' content="Annuler mon virement" options={bankTransfer.text} />
          </Segment>
        )
      })}
    </Container>
  )

}

const UserFormTransfer = () => {
  const userAccounts = useRecoilValue(userAccountsState)
  const allAccounts = useRecoilValue(allAccountsState)
  const [userBankTransfersWaiting, setUserBankTransfersWaiting] = useRecoilState (userBankTransfersWaitingState)
  const [currentAccount, setCurrentAccount] = useState(false)
  const [otherAccount, setOtherAccount] = useState(false)
  const [amount, setAmount] = useState(false)
  const [isOk, setIsOk] = useState(true)

  const userId = useRecoilValue(userIdState)

  const accounts = []
  userAccounts.map(account => {
    accounts.push({
      key: `accountId_${account.id}`,
      text: account.id,
      value: account.id
    })
    return true
  })

  const accountsGlobal = []
  allAccounts.map(account => {
    accountsGlobal.push({
      key: `accountId_${account.id}`,
      text: account.id,
      value: account.id
    })
    return true
  })

  const addBankTransfer = useCallback(() => {
    console.log('FormListAccounts', 'addBankTransfer()', currentAccount)
    setIsOk(true)
    appbankApi.addBankTransfer(currentAccount,otherAccount,amount).then(bankTransfer => {
      if (bankTransfer === false || bankTransfer === null) {
        console.log("FormListAccounts", "addBankTransfer()", bankTransfer)
        setIsOk(false)
        return false
      }
      appbankApi.getAllBankTransfersFromUserid(userId).then(data => {
        setUserBankTransfersWaiting(data)
      })
      console.log('addBankTransfer', 'addBankTransfer()', currentAccount, bankTransfer)
    })
  }, [currentAccount, otherAccount, amount])

  const handleChangeCurrentAccount = (e, account) => {
    console.log('FormListAccounts', 'handleChangeCurrentAccount()', account.value)
    setCurrentAccount(account.value)
  }

  const handleChangeOtherAccount = (e, account) => {

    console.log('FormListAccounts', 'handleChangeOtherAccount()', account.value)
    setOtherAccount(account.value)
  }

  const handleChangeAmount = (e) => {
    console.log('FormListAccounts', 'handleChangeAmount()', e.target.value)
    setAmount(e.target.value)
  }

  const handleChangeCheckAmountPositive = (e) => {
    console.log('FormListAccounts', 'checkAmountPositive()', e.key)
    if (e.key === '-') {
      e.preventDefault()
    }
  }
  
  return (

    <Form>
      <Card fluid color='blue'>
        <Card.Content header='Envoyer depuis le compte : ' />
        <Card.Content>
          <Dropdown onChange={handleChangeCurrentAccount} placeholder='Sélectionner un compte' fluid selection options={accounts} />
        </Card.Content>
      </Card>
      <header> Montant </header>
      <Form.Input type='number' value={amount} onChange={handleChangeAmount} min="0" step="1" onKeyDown={handleChangeCheckAmountPositive}  ></Form.Input> 
      <header> Compte destinataire </header>
      <Dropdown onChange={handleChangeOtherAccount} placeholder='Sélectionner un compte' fluid selection options={accountsGlobal} />
      <Divider />
      <Button onClick={addBankTransfer} disabled={currentAccount === false || amount === false || otherAccount === false || otherAccount === currentAccount} color='blue'>Ajouter</Button>
      {!isOk &&
      <Message negative> 
        Oups, il semblerait que vous n'ayez pas ni les fonds nécessaires ni le droit pour effectuer ce virement depuis le compte {currentAccount}.
      </Message>
      }
    </Form>
  )
}

// Page ------------------
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
  }, [initialized, userIsAdmin])


  const getAllBankTransfersFromUserid = useCallback(() => {
    if (initialized === true && userIsAdmin === false) {
      console.log('UserTransfers', 'getAllBankTransfersFromUserid()')
      appbankApi.getAllBankTransfersFromUserid(userId).then(data => {
        console.log('UserTransfers', 'getAllBankTransfersFromUserid()', data)
        if (data === false) { return false }
        setUserBankTransfersWaiting (data)
      })
    }
  }, [initialized, userIsAdmin])

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
    <Container>
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
  )
}

export default UserTransfers
