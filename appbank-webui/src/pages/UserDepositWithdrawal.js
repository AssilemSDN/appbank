import React from 'react'
import {
  Container,
  Form,
  Button,
  
} from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'
import mastercard from '../images/mastercard.png'
import visa from '../images/visa.png'
import phone from '../images/phone.jpg'
import email from '../images/email.jpg'
import TopMenu from '../components/TopMenu'
import logobank from '../images/logo-bank.png'

import { Route, Navigate } from 'react-router-dom'
const ICONS = 
{
    Euro: '<i class="fas fa-euro-sign"></i>',
    Dollar: '<i class="fas fa-dollar-sign"></i>'
};

/**
 * Depot retrait
 */
const UserDepositWithdrawal = () => {
    
   
    return (
        <>
        <TopMenu/>
        <Container  >
            <div  style={stylemontant} width = "50%">
                <Form.Input
                        name='Montant'
                        icon= 'euro sign'
                        iconPosition='right' 
                        placeholder='0,00'
                        type="number"
                        min ="0"
                        
                    />
                
                    
            </div>
            <div style={text}><h2><b><i> Retrait </i></b></h2></div>
            <div  style={stylenum} width = "50%">
            <Form.Input
                        name='Numero compte'
                        icon= 'user circle'
                        iconPosition='right' 
                        placeholder='09'
                        type="number"
                        min ="0"
                        //onChange={handleChangeEmail} qui verifie le numero de compte idk comment faire
                        
                        
                    />
            </div>
            
            <div style={mystylebutton}>
            
            <Button color='teal' fluid size='large' onClick='submit' //faudrait mettre la condition qui gere que le solde du compte 
                    // - l'input >= -400 ps je hai ma vie
            > 
                        Valider
            </Button>
            </div>
            <div style={text1}><h4><b><i> Montant </i></b></h4></div>
            <div style={text2}><h4><b><i> Numero de compte </i></b></h4></div>

            </Container>
        </>

        
    ) 
    
    
} 
const stylemontant ={position: "absolute",textdecoration : "none",color : "#999",left: "40%",bottom : "45%"};
const stylenum ={ position: "absolute",textdecoration : "none",color : "#999",left: "40%",bottom : "35%"};
const text ={position: "absolute",textdecoration : "none",color : "#A4EEC0",left: "45%",bottom : "60%"};
const text1 ={position: "absolute",textdecoration : "none",color : "#A4EEC0",left: "35%",bottom : "47%"};
const text2 ={position: "absolute",textdecoration : "none",color : "#A4EEC0",left: "30%", bottom : "37%"};
const mystylebutton ={ position: "absolute",textdecoration : "none", color : "#A4EEC0",left: "44%",bottom : "22%"}
export default UserDepositWithdrawal