// Fait le lien avec spring boot
import axios from 'axios'

// -- Axios

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

instance.interceptors.response.use(response => {
  return response
}, function (error) {
  return Promise.reject(error.response)
})

// -- Helper functions

// authorization: keycloak.idToken()

function bearerAuth (token) {
  return `Bearer ${token}`
}

/**
 * From AccountController :
 *
 * 1- GET /api/accounts : get all accounts (admin only)
 *
 * 2- GET /api/accounts/email/{email} : get all accounts associate with this email (to protect)
 * 3- POST /api/accounts/email/{email} : add an account associate with this email (admin only)
 *
 * 4- GET /api/accounts/{accountid} : get account with its id (to protect)
 * 5- DELETE /api/accounts/{accountid} : remove an account (admin only)
 * 6- POST /api/accounts/ (param : accountid, canBeOverdraft) : change if an account can be overdraft or not
 * 
 * 6- POST /api/accounts/retrait : (param: accountid, amount) depose money on the account
 * 7- POST /api/accounts/depot : (param: accountid, amount) take money from the acount
 *
 * ----------------------------------------
 * From UserController :
 *
 * 8- GET /api/users : get all of users (admin only)
 * 9- PUT /api/users/synchronize/{email} :  Synchronize database of keycloak with our api for an user
 *
 * ----------------------------------------
 * From BankTransferController :
 * 
 * 10- POST /api/banktransfers : add a bank transfer that has to be validate by the admin
 * 11- GET /api/banktransfers
 * 
 * 12- DELETE /api/banktransfers/{userid} : validate or not a bank transfer from userid. This will delete the data.
 * 13- GET /api/banktransfers/{userid} : get all transferts in waiting from userid.
 * 
 */


// 1
const getAllAccounts = async (token) => {
  console.log('AppBankApi', 'getAllAccounts')
  try {
    const { status, data } = await instance.get('/api/accounts', {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllAccounts', 'error', e)
    return false
  }
}

// 2
const getAccountsFromEmail = async (email, token) => {
  console.log('AppBankApi', 'getAccountsFromEmail', email)
  try {
    const { status, data } = await instance.get(`/api/accounts/users/${email}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAccountsFromEmail', 'error', e)
    return false
  }
}

// 3
const addAccountFromEmail = async (email, token) => {
  console.log('AppBankApi', 'addAccountFromEmail', email)
  try {
    const { status, data } = await instance.post(`/api/accounts/users/${email}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'addAccountFromEmail', 'error', e)
    return false
  }
}

// 4
const getAccountFromAccountId = async (accountid) => {
  return instance.get(`/api/accounts/${accountid}`)
}

// 5
const removeAccountFromAccountId = async (accountid, token) => {
  console.log('AppBankApi', 'removeAccountFromAccountId', accountid)
  try {
    const { status, data } = await instance.delete(`/api/accounts/${accountid}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'removeAccountFromAccountId', 'error', e)
    return false
  }
}

// 6
const withdrawalAccount = async (accountid, retrait, token) => {
  console.log('AppBankApi', 'withdrawalAcount', accountid)
  try {
    const { status, data } = await instance.post(`/api/accounts/retrait?accountId=${accountid}&withdrawal=${retrait}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })

    console.log('AppBankApi', 'withdrawalAcount', data)
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'withdrawalAccount', 'error', e)
    return false
  }
}

// 7
const depositAccount = async (accountid, depot, token) => {
  console.log('AppBankApi', 'depositAccount', accountid)
  try {
    const { status, data } = await instance.post(`/api/accounts/depot?accountId=${accountid}&deposit=${depot}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'depositaccount', 'error', e)
    return false
  }
}

const changeCanBeOverdraft = async (accountid, canBeOverdraft, token) => {
  console.log('AppBankApi', 'changeCanBeOverdraft', accountid)
  try {
    const { status, data } = await instance.post(`/api/accounts?accountid=${accountid}&canBeOverdraft=${canBeOverdraft}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'changeCanBeOverdraft', 'error', e)
    return false
  }
}

// 8
const getAllUsers = async (token) => {
  console.log('AppBankApi', 'getAllUsers')
  try {
    const { status, data } = await instance.get('/api/users', {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllUsers', 'error', e)
    return false
  }
}

// 9
const synchronizeDatabaseWithKeycloak = async (email, isAdmin, firstName, lastName, token) => {
  console.log('AppBankApi', 'synchronizeDatabaseWithKeycloak', email)
  try {
    const { status, data } = await instance.put(`/api/users/synchronize?email=${email}&isAdmin=${isAdmin}&firstName=${firstName}&lastName=${lastName}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'synchronizeDatabaseWithKeycloak', 'error', e)
    return false
  }
}

// 10
const addBankTransfer = async (accountIdSrc, accountIdDst, amount, token) => {
  console.log('AppBankApi', 'addBankTransfer', amount)
  try {
    const { status, data } = await instance.post(`/api/banktransfers?accountIdSrc=${accountIdSrc}&accountIdDst=${accountIdDst}&amount=${amount}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'addBankTransfer', 'error', e)
    return false
  }
}

// 11
const getAllBankTransfers = async (token) => {
  console.log('AppBankApi', 'getAllBankTransfers')
  try {
    const { status, data } = await instance.get('/api/banktransfers', {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllBankTransfers', 'error', e)
    return false
  }
}

// 12
const validateBankTransfer = async (bankTransferId, validate, token) => {
  console.log('AppBankApi', 'validateBankTransfer')
  try {
    const { status, data } = await instance.delete(`/api/banktransfers/${bankTransferId}?validate=${validate}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'validateBankTransfer', 'error', e)
    return false
  }
}

// 13
const getAllBankTransfersFromUserid = async (userId, token) => {
  console.log('AppBankApi', 'getAlgetAllBankTransfersFromUseridlBankTransfers')
  try {
    const { status, data } = await instance.get(`/api/banktransfers/${userId}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllBankTransfersFromUserid', 'error', e)
    return false
  }
}

const deleteBankTransfer = async (userId, bankTransferId, token) => {
  console.log('AppBankApi', 'deleteBankTransfer')
  try {
    const { status, data } = await instance.delete(`/api/banktransfers/user/${userId}?bankTransferId=${bankTransferId}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'deleteBankTransfer', 'error', e)
    return false
  }
}

export const appbankApi = {
  // From AccountController
  getAllAccounts, // 1

  getAccountsFromEmail, // 2
  addAccountFromEmail, // 3

  getAccountFromAccountId, // 4 //Pas sûre d'avoir besoin de ça...
  depositAccount, // 7
  withdrawalAccount ,
  removeAccountFromAccountId, // 6
  changeCanBeOverdraft,
  // -------------------------------------------
  // From UserController
  getAllUsers, // 7
  synchronizeDatabaseWithKeycloak, // 8

  //--------------------------------------------
  // From BankTransferController
  addBankTransfer, //9
  getAllBankTransfers, // 10
  validateBankTransfer, //11
  getAllBankTransfersFromUserid, //12
  deleteBankTransfer, //
}
