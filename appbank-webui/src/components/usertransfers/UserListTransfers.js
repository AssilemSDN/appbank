import React, { useEffect, useState} from 'react'
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

    useEffect(() => {
        console.log('bankTransferIdToDelete=', bankTransferIdToDelete)
        if (bankTransferIdToDelete !== -1) {
            console.log('deleteBankTransfer()', bankTransferIdToDelete, userId,bankTransferIdToDelete)
            appbankApi.deleteBankTransfer(userId,bankTransferIdToDelete).then(bankTransfer => {
                console.log('bankTransfer', bankTransfer)
                if (bankTransfer === false) {
                    // try to do something in case of error
                    return false
                }
                setBankTransfersToDelete(-1)
                appbankApi.getAllBankTransfersFromUserid(userId).then (data => {
                    console.log('data', data)
                    setUserBankTransfersWaiting(data)
                })
            })
        }
        console.log(userBankTransfersWaiting)
    }, [bankTransferIdToDelete, setUserBankTransfersWaiting, userId, userBankTransfersWaiting])

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
            console.log(bankTransfer)
            return (
            <Segment className='virement' key={bankTransfer.id}>
                <Header as='h3'>Virement n°{bankTransfer.id}</Header>
                <Container>
                <strong>Compte émetteur: </strong>{bankTransfer.accountIdSrc} <br />
                <strong>Compte récepteur: </strong>{bankTransfer.accountIdDst} <br />
                <strong>Montant: </strong>{bankTransfer.amount} <br />
                </Container>
                <Divider />
                <Button loading={bankTransferIdToDelete === -1 ? false : true} onClick={() => setBankTransfersToDelete(bankTransfer.id)} color='black' content="Annuler mon virement" />
            </Segment>
            )
        })}
        </Container>
    )
}
export default UserListTransfers