package com.appbank.services.BankTransfer;

import com.appbank.repositories.BankTransferRepository;
import com.appbank.models.BankTransfer;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

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
    public boolean deleteBankTransfer (int bankTransferId, boolean validate) {
        System.out.println("BankService validateBankTransfer");
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
    public BankTransfer addNewBankTransfer (int idUserSrc, Integer accountIdSrc, Integer accountIdDst, int amount) {
        if (amount >= 0) { //La verification de l'existence des comptes se fera lors de la validation dans le controller
            BankTransfer bankTransfer = new BankTransfer(idUserSrc, accountIdSrc, accountIdDst, amount);
            return bankTransferRepository.save(bankTransfer);
        }
        return null;
    }

    @Override
    public List <BankTransfer> getAllBankTransfersFromUserId (int userId) {
        System.out.println("getAllBankTransfersFromUserId, userId: "+userId);
        List <BankTransfer> bankTransfers = new ArrayList <> ();
        for (BankTransfer bankTransfer : bankTransferRepository.findAll()) {
            if (bankTransfer.getIdUserSrc() == userId) {
                System.out.println("getAllBankTransfersFromUserId, if, userId: "+userId);
                bankTransfers.add(bankTransfer);
            }
        }
        return bankTransfers;
    }
 
}
