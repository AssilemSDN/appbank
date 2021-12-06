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
 *
 * From AccountController :
 *
 * 1- GET /api/accounts : get all accounts (admin only)
 *
 * 2- GET /api/accounts/email/{email} : get all accounts associate with this email (to protect)
 * 3- POST /api/accounts/email/{email} : add an account associate with this email (admin only)
 *
 * 4- GET /api/accounts/{accountid}   (param: accountid) : get account with its id (to protect)
 * 5- PATCH /api/accounts/deposer/{accountid} (param: accountid, depot) : add depot to account (can be a retrait ?) (to protect)
 * 6- DELETE /api/accounts/{accountid} (param:accountid) : remove an account (admin only)
 *
 * ----------------------------------------
 * From UserController :
 *
 * 7- GET /api/users : get all of users (admin only)
 * 8- PUT /api/users/synchronize/{email} :  Synchronize database of keycloak with our api for an user
 *
 */

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

const getAccountFromAccountId = async (accountid) => {
  return instance.get(`/api/accounts/${accountid}`)
}

const updateAccount = async (accountid, depotOrRetrait, token) => {
  return instance.post(`/api/accounts/${accountid}`, accountid,
    depotOrRetrait, {
      headers: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
}

const removeAccountFromAccountId = async (accountid, token) => {
  return instance.delete(`/api/accounts/${accountid}`, {
    headers: { Authorization: bearerAuth(token) }
  })
}

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

const synchronizeDatabaseWithKeycloak = async (email, isAdmin, token) => {
  console.log('AppBankApi', 'synchronizeDatabaseWithKeycloak', email)
  try {
    const { status, data } = await instance.put(`/api/users/synchronize?email=${email}&isAdmin=${isAdmin}`, {
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

export const appbankApi = {
  // From AccountController
  getAllAccounts, // 1

  getAccountsFromEmail, // 2
  addAccountFromEmail, // 3

  getAccountFromAccountId, // 4 //Pas sûre d'avoir besoin de ça...
  updateAccount, // 5
  removeAccountFromAccountId, // 6
  // -------------------------------------------
  // From UserController
  getAllUsers, // 7
  synchronizeDatabaseWithKeycloak // 8

}
