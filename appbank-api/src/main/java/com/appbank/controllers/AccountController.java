package com.appbank.controllers;

import java.util.List;
import java.util.ArrayList;

import com.appbank.models.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.appbank.repositories.AccountRepository;


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

@RestController
@RequestMapping(path="/api")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

// Requetes sur la table des accounts
    /**
     * Ajouter un nouveau compte en l'associant a un utilisateur.
     * Cette fonction veille a ce que l'id fourni existe dans la base de donnees des
     * utilisateurs. 
     * @param proprietaireID : l'id du proprietaire du compte à ajouter
     * @param soldeDepart : le solde de depart du compte
     * @return Saved si le compte a été ajouté avec succes, sinon l'erreur http
     */
    @PostMapping(path="/accounts")
    public @ResponseBody String addNewAccount (@RequestParam Integer proprietaireID, @RequestParam Integer soldeDepart) {
        Account account = new Account(proprietaireID, soldeDepart);
        //verifier que l'id existe. S'il n'existe pas il faut renvoyer une erreur...
        accountRepository.save(account);
        return "Saved";
    }

    @GetMapping(path="/accounts")
    public @ResponseBody Iterable<Account> getAllAccounts() {
        return accountRepository.findAll();
    }    
    
    /**
     * Avoir la liste des comptes associés à un utilisateur.
     * Peut etre utilise pour n'importe quel utilisateur depuis un compte administrateur.
     * Peut etre utilise pour un utilisateur depuis un compte utilisateur donne.
     * @param proprietaireID : l'ID du client proprietaire du ou des comptes
     * @return
     */
    @GetMapping(path="/accounts/{id}")
    public @ResponseBody List<Account> getAccountsFromUser(@RequestParam Integer proprietaireID) {
        List <Account> accountsFromUser = new ArrayList <>();
        for (Account account : accountRepository.findAll()) {
            if (account.getProprietaireID().equals(proprietaireID)) {
                accountsFromUser.add(account);
            }
        }
        return accountsFromUser;
    }





   

}
