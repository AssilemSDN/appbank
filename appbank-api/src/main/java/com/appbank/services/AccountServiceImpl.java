package com.appbank.services;

import com.appbank.models.Account;
import com.appbank.repositories.AccountRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class AccountServiceImpl implements IAccountService {
    
    private AccountRepository accountRepository;

    public AccountServiceImpl (AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Iterable <Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public List <Account> getAccountsFromUserid (Integer userid) {
        List <Account> accounts = new ArrayList <> ();
        for (Account account : accountRepository.findAll()) {
            if (account.getProprietaireID().equals(userid)) {
                accounts.add(account);
            }
        }
        return accounts;
    }

    @Override
    public Account addAccountFromUserid (Integer userid) {
        Account account = new Account(userid);
        return accountRepository.save(account);
    }

    @Override
    public Account getAccountFromAccountId (Integer accountId) {
        return accountRepository.findById(accountId).get();

    }

    @Override
    public boolean addMoneyToAccount (Integer accountId, int moneyToAdd) {
        Account account = accountRepository.findById(accountId).get();
        if (account == null) {
            return false;
        }
        account.setSolde(account.getSolde()+moneyToAdd);
        return true;
    }

    @Override
    public boolean removeMoneyToAccount (Integer accountId, int moneyToRemove) {
        Account account = accountRepository.findById(accountId).get();
        if (account == null) {
            return false;
        }
        //A rajouter : les droits de retraits...
        account.setSolde(account.getSolde()-moneyToRemove);
        return true;
    }

    @Override
    public boolean removeAccountFromAccountId (Integer accountId) {
        Account account = accountRepository.findById(accountId).get();
        if (account != null) {
            accountRepository.delete(account);
            return true;
        }
        return false;
    }

}
