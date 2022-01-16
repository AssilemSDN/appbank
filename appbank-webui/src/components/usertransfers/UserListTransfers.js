import React, {useCallback, useState} from 'react'
import {
  Button,
  Header, 
  Container, 
  Divider,
  Message,
  Segment,
} from 'semantic-ui-react'
import { useRecoilValue, useRecoilState } from 'recoil'

import {
  userBankTransfersWaitingState,
  userIdState,
} from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'


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
    }, [bankTransferIdToDelete, userId, setUserBankTransfersWaiting])

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
export default UserListTransfers