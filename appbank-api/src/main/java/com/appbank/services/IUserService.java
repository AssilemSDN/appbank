package com.appbank.services;

import com.appbank.models.User;

public interface IUserService {
 
    Iterable<User> getAllUsers();

    User getUserFromEmail(String email);

    User getUserFromUserid(Integer userid);

    User addUserFromEmail(String email);
    
}
