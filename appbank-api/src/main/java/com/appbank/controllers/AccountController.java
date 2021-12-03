package com.appbank.controllers;

import java.util.List;
import java.util.ArrayList;

import com.appbank.models.Account;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.appbank.repositories.AccountRepository;
import com.appbank.services.IAccountService;
import com.appbank.services.IUserService;

// A faire : sécuriser l'API

/**
 * 1- GET /api/accounts   (param : email) : get all accounts
 * 2- POST /api/accounts  (param : email) : add an account associate with this email (admin only)
 * 
 * 3- GET /api/accounts/{accountid}   (param: accountid) : get account with its id (to protect)
 * 4- PATCH /api/accounts/{accountid} (param: accountid, depot) : add depot to account (can be a retrait ?) (to protect)
 * 5- DELETE /api/accounts/{accountid} (param:accountid) : remove an account (admin only)
 * 
 * 6- GET /api/accounts/users : get all accounts associate with an email
 * 
 */

@CrossOrigin(origins={ "http://localhost:3000"})
@RestController
@RequestMapping(path="/api/accounts")
public class AccountController {

    private IAccountService accountService;
    private IUserService userService;

    @GetMapping(path="")
    public ResponseEntity <List<Account>> getAllAccountsFromEmail (@RequestParam String email) {
        Integer userid = userService.getUseridFromEmail(email);
        if (userid < 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(accountService.getAccountsFromUserid(userid));
    }    

    @PostMapping
    public ResponseEntity<Account> addAccountFromEmail (@RequestParam String email) {
        Account accountAdd = accountService.addAccountFromUserid(userService.getUseridFromEmail(email));   
        if (accountAdd == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(accountAdd);
    }

    @GetMapping(path="/{accountId}")
    public ResponseEntity<Account> getAccountFromAccountId (@PathVariable Integer accountId) {
        Account account = accountService.getAccountFromAccountId(accountId);
        if (account == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(account);
    }

    @PatchMapping(path="/{accountId}")
    public ResponseEntity<Boolean> updateAccount (@PathVariable Integer accountId, 
    @RequestParam int depotOrRetrait)  {
        if (depotOrRetrait < 0) {
            return ResponseEntity.ok().body(accountService.removeMoneyToAccount(accountId, depotOrRetrait));
        }
        return ResponseEntity.ok().body(accountService.addMoneyToAccount(accountId, depotOrRetrait));
    }
    
    
    /**
     * Avoir la liste des comptes associés à un utilisateur.
     * Peut etre utilise pour n'importe quel utilisateur depuis un compte administrateur.
     * Peut etre utilise pour un utilisateur depuis un compte utilisateur donne.
     * @param proprietaireID : l'ID du client proprietaire du ou des comptes
     * @return
     */
    /*@GetMapping(path="/accounts/{id}")
    public @ResponseBody List<Account> getAccountsFromUser(@RequestParam Integer proprietaireID) {
        List <Account> accountsFromUser = new ArrayList <>();
        for (Account account : accountRepository.findAll()) {
            if (account.getProprietaireID().equals(proprietaireID)) {
                accountsFromUser.add(account);
            }
        }
        return accountsFromUser;
    }*/





   

}
