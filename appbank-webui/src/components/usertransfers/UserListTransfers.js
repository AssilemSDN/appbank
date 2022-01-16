import React, {useCallback, useState} from 'react'
import {
  Button,
  Container, 
  Divider,
  Header, 
  Message,
  Segment,
} from 'semantic-ui-react'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  userBankTransfersWaitingState,
  userIdState,
} from '../../states/AppState'
import { appbankApi } from '../../utils/AppBankApi'


const UserListTransfers = () => {
    const [userBankTransfersWaiting, setUserBankTransfersWaiting] = useRecoilState(userBankTransfersWaitingState)
    const [bankTransferIdToDelete, setBankTransfersToDelete] = useState(-1)
    const userId = useRecoilValue(userIdState)

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
        {userBankTransfersWaiting.length === 0 &&
            <Message>
            Il n'y a aucun virement en attente de validation pour le moment. 
            </Message>
        }
        {userBankTransfersWaiting.map(bankTransfer => {
            return (
            <Segment>
                <Header as='h3'>Virement n°{bankTransfer.id}</Header>
                <Container>
                <strong>Montant: </strong>{bankTransfer.value} <br />
                </Container>
                <Divider />
                <Button onClick={handleChangeBankToDelete} color='black' content="Annuler mon virement" options={bankTransfer.id} />
            </Segment>
            )
        })}
        </Container>
    )
}
export default UserListTransfers