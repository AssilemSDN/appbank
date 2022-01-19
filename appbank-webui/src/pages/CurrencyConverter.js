import axios from "axios";
import React, { useState } from "react";
import {
    Container,
    Header,
    Icon,
    Form,
    Dropdown,
    Divider,
    Button,
    Segment,
    Message

} from 'semantic-ui-react'
import TopMenu from "../components/common/TopMenu"
import Footer from "../components/common/Footer";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("PHP_EUR")
  const [toCurrency, setToCurrency] = useState("PHP_USD")
  const [amount, setAmount] = useState(false)
  const [ret, setRet] = useState(false)
   
  const currencies = [
    {
      text: 'Euro',
      icon: 'eur',
      image: '/assets/images/logo-union-europeenne.jpg',
      value: 'PHP_EUR',
    },
    {
      text: 'Dollar',
      icon: 'dollar',
      image: '/assets/images/logo-usa.jpg',
      value: 'PHP_USD',
    },
    {
      text: 'Livre',
      icon: 'pound',
      image: '/assets/images/logo-gb.jpg',
      value: 'PHP_GBP',
    },
    {
      text: 'Shekel',
      icon: 'shekel sign',
      image: '/assets/images/logo-israel.jpg',
      value: 'PHP_ILS'
  
    }
  ];

  const handleChangeFirstCurrency = (e, {value}) => {
    console.log(value)
    setFromCurrency(value);
  };
  const handleChangeSecondCurrency = (e, {value}) => {
    console.log(value)
    setToCurrency(value);
  };
  const handleConverter = async () => {
    const { value1 = false, value2 = false } = await getRate(fromCurrency, toCurrency)
    if (value1 === false || value2 === false) {
      // do something
      console.log(".....")
      return false
    }
    console.log(`VALUES: ${value1} ${value2}`)
    setRet(amount * value2 / value1)
  }

  const getRate = async (from, to) => {
    const response = await axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${from},${to}&compact=ultra&apiKey=d6a00977ad323a7dc798`,
    }).catch((error) => {
      console.log(error);
      return false
    });
    const [k1, k2] = Object.keys(response.data)
    return {
      value1: response.data[k1],
      value2: response.data[k2]
    }
  };

  return (
    <>
    <Container className='Page' style={{padding: "15px", 'min-height': '65vh'}} >
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='money' />
        <Header.Content>
          Convertisseur de devise
        </Header.Content>
      </Header>

      <Segment compact>
      <Form>
        <header>Montant</header>
        <Form.Input type='number' as='input' placeholder='Insérer un montant' value={amount} onChange={e => setAmount(e.target.value)}></Form.Input> 
        <header>De</header>
        <Dropdown onChange={handleChangeFirstCurrency} placeholder='DE' fluid selection options={currencies} value={fromCurrency} />
        <header>En</header>
        <Dropdown onChange={handleChangeSecondCurrency} placeholder='EN' fluid selection options={currencies} value={toCurrency}/>
        <Divider />
        <Button onClick={handleConverter} disabled={fromCurrency === toCurrency || amount === false || amount === '' || fromCurrency === false || toCurrency === false} color='teal'>Convertir</Button>
        {amount !== false && ret !== false &&
          <Message>Valeur : {ret}</Message>
        }
      </Form>
      </Segment>
    </Container>
    <Footer />
    </>
  ); 
};
   
export default CurrencyConverter