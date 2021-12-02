import axios from 'axios'

const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'userAuthentified'

//Rajouter l'authentification des admin plus tard quand client marche...
class AuthentificationService {

    executeBasicAuthentificationService(email, password) {
        return axios.get(`${API_URL}/authentification`,
            { headers: { authorization: this.createBasicAuthToken(email, password) } })
    }

    createBasicAuthToken(email, password) {
        return 'Basic ' + window.btoa(email + ":" + password)
    }

    registerSuccessfulLogin(email, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(email + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
        this.setupAxiosInterceptors(this.createBasicAuthToken(email, password))
        
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {

        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthentificationService()