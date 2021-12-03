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

export const moviesApi = {
    getAccountsFromUserId,
    getAccountFromAccountId,
    addToAccount,
    removeToAccount,
    addAccountForUser,
  getUserExtrasMe,
  saveUserExtrasMe
}

function getAccountsFromUserId(userid) {
    return instance.get('/api/accounts')
}

function getAccountFromAccountId(accountid) {
    return instance.get(`/api/accounts/${accountid}`)
}

//Depot
function addToAccount(accountid, token) {
    return instance.post(`/api/accounts/${accountid}`, accountid, {
    headers: {
        'Content-type': 'application/json',
        'Authorization': bearerAuth(token)
    }
  })
}
//Retrait
function removeToAccount(accountid, token) {
    return instance.delete(`/api/accounts/${accountid}`, {
        headers: { 'Authorization': bearerAuth(token) }
    })
}

//Ouvrir un nouveau compte pour l'utilisateur
//N'est censé être accessible que depuis un compte admin
function addAccountForUser(userid, token) {
    return instance.post(`/api/accounts/`, userid, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
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

function getUserIdFromEmail (email, token) {
    return instance.get(`/api/users/${email}`, email, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(token)
        }
    })
}


