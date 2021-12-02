import React from 'react'
import {
  Container,
  Header,
} from 'semantic-ui-react'

class AdminDashboard extends React.Component {
    render()  {
        return (
            <>
            <div className="border-red">
                <Container text style={{ marginTop: '7em' }}>
                    <Header as='h1'>Blabla</Header>
                    <p>
                        bonjour admin
                    </p>
                </Container>
            </div>
         </>
        )
    }
} 
export default AdminDashboard
