package com.appbank.services;

import com.appbank.models.User;
import com.appbank.repositories.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    private UserRepository userRepository;

    public UserServiceImpl (UserRepository userRepository) {
        this.userRepository=userRepository;
    }

    @Override
    public Iterable <User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserFromEmail(String email) {
        for (User user : userRepository.findAll()) {
            if (user.getEmail().equals(email)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User getUserFromUserid(Integer userid) {
        for (User user : userRepository.findAll()) {
            if (user.getId().equals(userid)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User addUserFromEmail (String email) {
        User userToAdd = new User ();
        userToAdd.setEmail(email);
        return userRepository.save(userToAdd);
    }
}
