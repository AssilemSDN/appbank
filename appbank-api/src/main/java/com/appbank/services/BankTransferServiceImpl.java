package com.appbank.services;

import com.appbank.repositories.BankTransferRepository;
import com.appbank.models.BankTransfer;

import org.springframework.stereotype.Service;

@Service
public class BankTransferServiceImpl implements IBankTransferService {

    private BankTransferRepository bankTransferRepository;

    public BankTransferServiceImpl (BankTransferRepository bankTransferRepository) {
        this.bankTransferRepository = bankTransferRepository;
    }

    @Override
    public Iterable<BankTransfer> getAllBankTransfer() {
        return bankTransferRepository.findAll();
    }

    @Override
    public boolean validateBankTransfer (int bankTransferId, boolean validate) {
        bankTransferRepository.delete(getBankTransferFromId(bankTransferId));
        return validate;
    }

    @Override
    public BankTransfer getBankTransferFromId (int bankTransferId) {
        for (BankTransfer bankTransfer : bankTransferRepository.findAll()) {
            if (bankTransfer.getId() == bankTransferId) {
                return bankTransfer;
            }
        }
        return null;
    }

    @Override
    public BankTransfer addNewBankTransfer (Integer accountIdSrc, Integer accountIdDst, int amount) {
        if (amount >= 0) { //La verification de l'existence des comptes se fera lors de la validation dans le controller
            BankTransfer bankTransfer = new BankTransfer(accountIdSrc, accountIdDst, amount);
            return bankTransferRepository.save(bankTransfer);
        }
        return null;
    }
 
}
