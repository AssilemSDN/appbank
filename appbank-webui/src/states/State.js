//Conserver le nom, prenom, id 
//isAuth

import {atom} from 'recoil'

const userFirstNameState = atom({
    key:"userFirstNameState",
    default:'',
})

const userLastNameState = atom({
    key:"userLastNameState",
    default:'',
})

const useridState = atom ({
    key:"useridState",
    default:-1,
})

const userAuthState = atom ({
    key:"userAuthState",
    default:false,
}) 

export {userAuthState, useridState, userLastNameState, userFirstNameState};