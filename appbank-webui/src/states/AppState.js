import { atom } from 'recoil'

// The personify theme : 
import '../theming/themes/theme_credit_agricole.css'

// Needed if you use a personify theme :
import '../theming/appbank-css.css'

// States theming ---------
const logoState = atom({
  key: 'logoState',
  //default: 'logo-banque-postale.jpeg'
  default: 'ca-logo.png'
  //default: 'logo-bnp.jpg'
  //default: 'logo-smc.png'
  //default: 'logo-societe-generale.png'
  //default: 'logo-bank.png'
})

const nomState = atom({
  key: 'nomState',
  default: 'SimpleApp'
})

/*
const iconState = atom({
  key: 'iconState',
  default: 'icon-societe-generale.ico'
})
*/

// ---------------------

const userIsAdminState = atom({
  key: 'userIsAdminState',
  default: false
})

const userIdState = atom({
  key: 'userIdState',
  default: false
})

const userEmailState = atom({
  key: 'userEmailState',
  default: false
})

const userFirstNameState = atom({
  key: 'userFirstNameState',
  default: false
})

const userLastNameState = atom({
  key: 'userLastNameState',
  default: false
})

const userLastSyncroState = atom({
  key: 'userLastSyncroState',
  default: false
})

const userAccountsState = atom({
  key: 'userAccountsState',
  default: []
})

const userBankTransfersWaitingState = atom({
  key: 'userBankTransfersWaitingState',
  default: []
})

const adminUsersState = atom({
  key: 'adminUsersState',
  default: []
})

const adminAccountsState = atom({
  key: 'adminAccountsState',
  default: []
})

const bankTransfersState = atom({
  key: 'bankTransfersState',
  default: []
})

const allAccountsState = atom({
  key: 'allAccountsState',
  default: []
})

export {
  logoState,
  userIsAdminState,
  userLastSyncroState,
  userIdState,
  userEmailState,
  userLastNameState,
  userFirstNameState,
  userAccountsState,
  userBankTransfersWaitingState,
  adminUsersState,
  adminAccountsState,
  bankTransfersState,
  allAccountsState,
  nomState
}
