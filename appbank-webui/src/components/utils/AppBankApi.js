// Fait le lien avec spring boot

import axios from 'axios'

// -- Axios

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

instance.interceptors.response.use(response => {
    return response;
}, function (error) {
    if (error.response.status === 404) {
        return { status: error.response.status };
    }
    return Promise.reject(error.response);
});

// -- Helper functions

 //authorization: keycloak.idToken()
 
 
function bearerAuth(token) {
  return `Bearer ${token}`
}

/**
 * 1- GET /api/accounts   (param : email) : get all accounts with an email (to protect)
 * 2- POST /api/accounts  (param : email) : add an account associate with this email (admin only)
 * 
 * 3- GET /api/accounts/{accountid}   (param: accountid) : get account with its id (to protect)
 * 4- PATCH /api/accounts/{accountid} (param: accountid, depot) : add depot to account (can be a retrait ?) (to protect)
 * 5- DELETE /api/accounts/{accountid} (param:accountid) : remove an account (admin only)
 *
 * 6- GET /api/users : get all of users (admin only)
 * 7- PUT /api/users (param : email)  :  Synchronize database of keycloak with our api when someone log in 
 */
export const appbankApi = {
    getAccountsFromEmail,       //1
    addAccountForUser,          //2

    getAccountFromAccountId,    //3
    updateAccount,              //4
    removeAccountFromAccountId, //5
    
    getAllUsers,                //6
    loginApi,                   //7
}

function getAccountsFromEmail(email) {
    return instance.get('/api/accounts',email)
}

//Ouvrir un nouveau compte pour l'utilisateur
//N'est censé être accessible que depuis un compte admin
function addAccountForUser(email, token) {
    return instance.post(`/api/accounts/`, email, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    })
}

function getAccountFromAccountId(accountid) {
    return instance.get(`/api/accounts/${accountid}`)
}

function updateAccount (accountid, depot, token) {
    return instance.post(`/api/accounts/${accountid}`, accountid, depot, {
    headers: {
        'Content-type': 'application/json',
        'Authorization': bearerAuth(token)
    }
  })
}

function removeAccountFromAccountId (accountid, token) {
    return instance.delete(`/api/accounts/${accountid}`, {
        headers: { 'Authorization': bearerAuth(token) }
    })
}

//Liste de tous les utilisateurs 
//N'est censé être accessible que depuis un compte admin
function getAllUsers(token) {
    return instance.get(`/api/users/`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    })
}

function loginApi(email, token) {
    return instance.put(`/api/users/`, email, {
        hearders: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    })
}



