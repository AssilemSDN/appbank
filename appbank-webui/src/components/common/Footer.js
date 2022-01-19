import React from 'react'
import { 
  Container, 
  Segment,
  List,
  Icon,
} from 'semantic-ui-react'

const Footer = () => {
    return (
      <>
      <Segment className='Footer1' inverted vertical style={{ margin: '5em 0em 0em', padding: '2em 0em' , position: 'relative', width: '100%'}}>
        <Container textAlign='center'>
            <Icon link size='large' name='facebook' /> 
            <Icon link size='large' name='instagram' />
            <Icon link size='large' name='linkedin' /> 
            <Icon link size='large' name='twitter' /> <br /> 
            <List className='listFooter1' horizontal inverted divided link size='small'>
                <List.Item as='a' href='#'> 
                    <h4>Ma banque</h4>
                </List.Item>
                <List.Item as='a' href='#'>
                    <h4>Ouvrir un compte</h4>
                </List.Item>
                <List.Item as='a' href='#'>
                    <h4>Plus d'infos</h4>
                </List.Item>
                <List.Item as='a' href='#'>
                    <h4>Nous contacter</h4>
                </List.Item>
            </List>
        </Container>
        
      </Segment>
    <Segment className='Footer2' inverted vertical style={{ position: 'relative', width: '100%'}}>
        <Container textAlign='center'>
        <List className='listFooter2' horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
            Banane
            </List.Item>
            <List.Item as='a' href='#'>
            Fraise
            </List.Item>
            <List.Item as='a' href='#'>
            Pomme
            </List.Item>
            <List.Item as='a' href='#'>
            Poire
            </List.Item>
        </List>
        </Container>
    </Segment>
    <Segment className='Footer3' inverted vertical style={{ position: 'absolute', width: '100%'}}>
        <Container textAlign='center'>
            <List className='listFooter3' horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
                Sécurité
            </List.Item>
            <List.Item as='a' href='#'>
                Termes et conditions
            </List.Item>
            <List.Item as='a' href='#'>
                Documentations et tarifs
            </List.Item>
            <List.Item as='a' href='#'>
                Informations légales
            </List.Item>
            <List.Item as='a' href='#'>
                Politique des cookies et de protection des données
            </List.Item>
            <List.Item as='a' href='#'>
                Accessibilité numérique
            </List.Item>
            </List>
        </Container>
    </Segment>
    </>
    )
}
export default Footer