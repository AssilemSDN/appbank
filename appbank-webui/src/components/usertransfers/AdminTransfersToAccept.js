import React from 'react'
import { 
  Card, 
  Button,
  Container, 
  Message,
} from 'semantic-ui-react'
import { useRecoilState } from 'recoil'

import { bankTransfersState } from '../../states/AppState'

import { appbankApi } from '../../utils/AppBankApi'

const AdminTransfersToAccept = () => {
    const [bankTransfers, setBankTransfers] = useRecoilState(bankTransfersState)
  
    const data = []
    bankTransfers.foreach(bankTransfer => {
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
export default AdminTransfersToAccept;
  