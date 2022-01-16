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
    Message

} from 'semantic-ui-react'
import TopMenu from "../components/common/TopMenu"

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("PHP_EUR")
  const [toCurrency, setToCurrency] = useState("PHP_USD")
  const [amount, setAmount] = useState(false)
  const [ret, setRet] = useState(false)
   
  const currencies = [
    {
      text: 'Euro',
      icon: 'eur',
      value: 'PHP_EUR',
    },
    {
      text: 'Dollar',
      icon: 'dollar',
      value: 'PHP_USD',
    },
    {
      text: 'Livre sterling',
      icon: 'pound',
      value: 'PHP_GBP',
    },
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
    <Container>
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='money' />
        <Header.Content>
          Convertisseur de devise
        </Header.Content>
      </Header>
      <Form>
        <header>Montant</header>
        <Form.Input type='number' as='input' placeholder='Insérer un montant' value={amount} onChange={e => setAmount(e.target.value)}></Form.Input> 
        <header>De</header>
        <Dropdown onChange={handleChangeFirstCurrency} placeholder='DE' fluid selection options={currencies} value={fromCurrency} />
        <header>En</header>
        <Dropdown onChange={handleChangeSecondCurrency} placeholder='EN' fluid selection options={currencies} value={toCurrency}/>
        <Divider />
        <Button onClick={handleConverter}>Convertir</Button>
        {amount !== false &&
          <Message>Valeur : ${ret}</Message>
        }
      </Form>
    </Container>
  );
};
   

export default CurrencyConverter