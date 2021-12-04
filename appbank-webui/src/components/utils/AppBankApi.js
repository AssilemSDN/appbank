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
    return response;
}, function (error) {
    return Promise.reject(error.response);
});

// -- Helper functions

 //authorization: keycloak.idToken()
 
 
function bearerAuth(token) {
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
    return instance.post(`/api/accounts/`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    })   
}

const getAccountsFromEmail = async (email) => {
    return instance.get('/api/accounts',email)
}

const addAccountFromEmail = async (email, token) => {
    return instance.post(`/api/accounts/users/${email}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    })
}

const getAccountFromAccountId = async (accountid) => {
    return instance.get(`/api/accounts/${accountid}`)
}

const updateAccount = async (accountid, depotOrRetrait, token) => {
    return instance.post(`/api/accounts/${accountid}`, accountid, 
    depotOrRetrait, {
    headers: {
        'Content-type': 'application/json',
        'Authorization': bearerAuth(token)
    }
  })
}

const removeAccountFromAccountId = async (accountid, token) => {
    return instance.delete(`/api/accounts/${accountid}`, {
        headers: { 'Authorization': bearerAuth(token) }
    })
}

const getAllUsers = async (token) => {
    return instance.get(`/api/users/`), {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    }
}

const synchronizeDatabaseWithKeycloak = async (email, token) => {
    return instance.put(`/api/users/`, email, {
        hearders: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    })
}

export const appbankApi = {
    //From AccountController
        getAllAccounts,                     //1
    
        getAccountsFromEmail,               //2
        addAccountFromEmail,                //3
    
        getAccountFromAccountId,            //4 //Pas sûre d'avoir besoin de ça...
        updateAccount,                      //5
        removeAccountFromAccountId,         //6
    //-------------------------------------------
    //From UserController
        getAllUsers,                        //7
        synchronizeDatabaseWithKeycloak,    //8
    
    }



