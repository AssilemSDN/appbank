package com.appbank.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

import com.appbank.models.User;

import com.appbank.repositories.UserRepository;

//Controller
@CrossOrigin(origins={ "http://localhost:3000"})
@RestController
@RequestMapping(path="/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/authentification") // A utiliser : Digest / basic
    public ResponseEntity<User> authentication(@RequestParam String email) {
        for (User user : userRepository.findAll()) {
            if (user.getEmail().equals(email)) {
                return ResponseEntity.ok(user);
            }
        }
       
        return ResponseEntity.notFound().build();
    }   
}