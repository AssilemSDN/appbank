package com.appbank.controllers;

import java.util.List;

import com.appbank.models.Account;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.appbank.services.IAccountService;
import com.appbank.services.IUserService;

// A faire : sécuriser l'API

/**
* 1- GET /api/accounts : get all accounts (admin only)
 * 
 * 2- GET /api/accounts/users/{email} : get all accounts associate with this email (to protect)
 * 3- POST /api/accounts/users/{email} : add an account associate with this email (admin only)
 * 
 * 4- GET /api/accounts/{accountid}   (param: accountid) : get account with its id (to protect)
 * 5- PATCH /api/accounts/{accountid} (param: accountid, depot) : add depot to account (can be a retrait ?) (to protect)
 * 6- DELETE /api/accounts/{accountid} (param:accountid) : remove an account (admin only)
 *
 */

@CrossOrigin(origins={ "http://localhost:3000"})
@RestController
@RequestMapping(path="/api/accounts")
public class AccountController {

    private IAccountService accountService;
    private IUserService userService;

    public AccountController(IAccountService accountService, IUserService userService) {
        this.accountService=accountService;
        this.userService=userService;
    }

    @GetMapping
    public ResponseEntity <Iterable<Account>> getAllAccounts (@RequestParam String email) {
        return ResponseEntity.ok().body(accountService.getAllAccounts());
    }    

    @GetMapping(path="/users/{email}")
    public ResponseEntity <List<Account>> getAccountsFromEmail (@PathVariable("email") String email) {
        Integer userid = userService.getUserFromEmail(email).getId();
        if (userid < 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(accountService.getAccountsFromUserid(userid));
    }       

    @PostMapping(path="/users/{email}")
    public ResponseEntity<Account> addAccountFromEmail (@PathVariable("email") String email) {
        Account accountAdd = accountService.addAccountFromUserid(userService.getUserFromEmail(email).getId());   
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
    
    @DeleteMapping(path="/{accountId}") 
    public ResponseEntity<Boolean> removeAccountFromAccountId (@PathVariable Integer accountId) {
        // True : si l'id du compte est valide et a bien ete supprime
        return ResponseEntity.ok().body(accountService.removeAccountFromAccountId(accountId));
    }

    
}
