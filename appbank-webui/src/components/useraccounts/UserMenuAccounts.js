import React, {useState} from 'react'
import { 
  Card, 
  Button,
  Header, 
  Modal,
  Form,
  Message,
} from 'semantic-ui-react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  userAccountsState,
  userEmailState
} from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'



const DepositModal = (props) => {
    const { accountId, accountSolde } = props
    const [open, setOpen] = useState();
    const [amount,setAmount] = useState(false)
    const setUserAccounts = useSetRecoilState(userAccountsState)
    const userEmail = useRecoilValue(userEmailState)

    const confirmation = () => {
        console.log('confirmation')
        appbankApi.depositAccount(accountId, amount).then(data => {
            if (data === false) {
                return false
            }
            appbankApi.getAccountsFromEmail(userEmail).then(data => {
                if (data === false) {
                    // try to do something in case of error
                    return false
                }
                console.log('HomePage', 'getAllgetAccountsFromEmailAccouts()', 'accounts', data.length)
                setUserAccounts(data)
            })
        }) 
        setOpen(false)
    }

    return(
    <Modal
        onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button color='black'>Déposer</Button>}>
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
            <Button content="Confirmer" labelPosition='right' icon='checkmark' onClick={confirmation} positive/>
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
            appbankApi.getAccountsFromEmail(userEmail).then(data => {
                if (data === false) {
                    // try to do something in case of error
                    return false
                }
                console.log('HomePage', 'getAllgetAccountsFromEmailAccouts()', 'accounts', data.length)
                setUserAccounts(data)
            })
            console.log('withdrawal hello')
            setOpen(false)
        }
    })}

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
    const userAccounts = useRecoilValue(userAccountsState)

    console.log('accounts',userAccounts)
    return (
        <Card.Group>
        {userAccounts.map(account => {
            return (
            <Card color='blue' key={`accountId_${account.id}`}>
                <Card.Content>
                <Card.Header>Compte n°{account.id}</Card.Header>
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

export default UserMenuAccounts
