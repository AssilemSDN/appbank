package com.appbank.controllers;

import com.appbank.models.Administrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.appbank.repositories.AdminRepository;

@RestController
@RequestMapping(path="/api")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;


// Requete sur la table des utilisateurs
    /**
     * Ajouter un nouvel administrateur dans la base de donnees.
     * -> Accessible uniquement en root ...
     * @param firstName : prenom de l'administrateur
     * @param lastName : nom de famille de l'administrateur
     * @return
     */
    @PostMapping(path="/administrators")
    public @ResponseBody String addNewAdmin (@RequestParam String firstName , @RequestParam String lastName) {
        Administrator administrator = new Administrator();
        administrator.setFirstName(firstName);
        administrator.setLastName(lastName);
        adminRepository.save(administrator);
         return "Saved";
    }
    /**
     * Renvoie la liste de tous les administrateurs : cense rendre un unique element
     * @return
     */
    @GetMapping(path="/administrators")
    public @ResponseBody Iterable<Administrator> getAllAdmins() {
        return adminRepository.findAll();
    }

}
