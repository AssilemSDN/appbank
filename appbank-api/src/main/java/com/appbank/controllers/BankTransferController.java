package com.appbank.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.appbank.services.Account.IAccountService;
import com.appbank.services.BankTransfer.IBankTransferService;
import com.appbank.models.BankTransfer;
import com.appbank.models.Account;

@CrossOrigin(origins={ "http://localhost:3000"})
@RestController
@RequestMapping(path="/api/banktransfers")
public class BankTransferController {

    private IBankTransferService bankTransferService;
    private IAccountService accountService;

    public BankTransferController (IBankTransferService bankTransferService, IAccountService accountService) {
        this.bankTransferService=bankTransferService;
        this.accountService=accountService;
    }

    @GetMapping
    public ResponseEntity <Iterable<BankTransfer>> getAllBankTransfer () {
        return ResponseEntity.ok().body(bankTransferService.getAllBankTransfer());
    }

    @PostMapping
    public ResponseEntity <BankTransfer> addNewBankTransfer (@RequestParam int accountIdSrc, @RequestParam int accountIdDst, @RequestParam int amount) {
        
        Account accountSrc = accountService.getAccountFromAccountId(accountIdSrc);
        Account accountDst = accountService.getAccountFromAccountId(accountIdDst);

        if (accountSrc == null || accountDst == null) {
            return ResponseEntity.notFound().build();
        }

        if (accountSrc.getSolde() < amount && ! accountSrc.getCanBeOverdraft()) {
            return ResponseEntity.ok().body(null);
        }

        BankTransfer bankTransfer = bankTransferService.addNewBankTransfer(accountService.getProprietaireId(accountIdSrc), accountIdSrc, accountIdDst, amount);
        if (bankTransfer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(bankTransfer);
    }

    @DeleteMapping (path="/user/{userId}")
    public ResponseEntity <Boolean> deleteBankTransfer (@PathVariable("userId") String userId, @RequestParam String bankTransferId) {
        // Verifier si le user a les droits pour le supprimer
        System.out.println("BankTransfer " + bankTransferId);
        BankTransfer bankTransfer = bankTransferService.getBankTransferFromId(Integer.parseInt(bankTransferId));
        if (bankTransfer != null && Integer.parseInt(userId) == bankTransfer.getIdUserSrc()) {
            bankTransferService.deleteBankTransfer (Integer.parseInt(bankTransferId), false);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.ok().body(false);
    }

    @GetMapping(path="/{userId}")
    public ResponseEntity <Iterable<BankTransfer>> getAllBankTransfersFromUserId (@PathVariable("userId") String userId) {
        return ResponseEntity.ok().body(bankTransferService.getAllBankTransfersFromUserId(Integer.parseInt(userId)));
    }

    /**
     * * If validate==true => apply the changes on the accounts.
     * Even if the administrator validate the transfer, if the transfer can't be do (because of the deletion of
     * the accounts, or if the account doesnt have the right to be overdraft), the function will return false.
     * @param bankTransferId
     * @return true if the tranfer is a success.Z
     */
    @DeleteMapping(path="/{bankTransferId}")
    public ResponseEntity<Boolean> validateBankTransfer (@PathVariable("bankTransferId") String bankTransferId, @RequestParam String validate) {
        BankTransfer bankTransfer = bankTransferService.getBankTransferFromId (Integer.parseInt(bankTransferId));   
        if (bankTransfer == null) {
            return ResponseEntity.notFound().build();
        }
        boolean booleanValidate = Boolean.parseBoolean(validate);
        int amount = bankTransfer.getAmount();
        int idSrc = bankTransfer.getAccountIdSrc();
        int idDst = bankTransfer.getAccountIdDst();
        boolean ret = bankTransferService.deleteBankTransfer (Integer.parseInt(bankTransferId), booleanValidate); //Suppression dans la bdd

        Account accountSrc = accountService.getAccountFromAccountId(idSrc);
        Account accountDst = accountService.getAccountFromAccountId(idDst);

        if (accountSrc == null || accountDst == null) {
            return ResponseEntity.notFound().build();
        }

        if (!ret) {
            return ResponseEntity.ok().body(false);
        }

        if (ret && accountSrc.getSolde() < amount && !accountSrc.getCanBeOverdraft()) {
            return ResponseEntity.ok().body(false);
        }
        accountService.removeMoneyToAccount(idSrc, amount);
        accountService.addMoneyToAccount(idDst, amount);
        return ResponseEntity.ok().body(true);
    }   
}
