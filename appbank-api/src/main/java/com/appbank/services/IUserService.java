package com.appbank.services;

public interface IUserService {

    /**
     * 
     * Userid is always positive.
     * If the user is not found, then return -1. 
     * @param email
     * @return
     */
    Integer getUseridFromEmail(String email);
    
}
