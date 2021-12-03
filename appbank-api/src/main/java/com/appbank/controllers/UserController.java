package com.appbank.controllers;

import com.appbank.models.User;
import com.appbank.repositories.UserRepository;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


/**
 * GET /api/users : getAllUsers -> Return all users filtered by lastname with pagination
 * GET /api/users/{id} : getUserFromId -> Find single user that matched {id}
 * POST /api/users : addNewUser -> Create new user 
 * PUT /api/users/{id} : updateUserFromId -> Update user with the id {id}
 * DELETE /api/users/{id} : deleteUserFromId -> delete the user associate with the {id}
 */
@CrossOrigin(origins={ "http://localhost:3000"})
@RestController
@RequestMapping(path="/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

   // private final int LINE_PER_PAGE = 5; // Pagination a faire

     /**
     * Avoir la liste des utilisateurs filtre par nom de famille.
     * Si aucun nom de famille n'est précisé, renvoie la liste de tous les
     * users.
     * Ne peut etre appelee que depuis un compte administrateur.
     * @return 200 OK + la liste des utilisateurs
     */
    @GetMapping(path="/users")
    public ResponseEntity<Iterable<User>> getAllUsers(
        @RequestParam(value="page", defaultValue="1") Integer pageNumber,
        @RequestParam(required = false) String lastName) {
        
        return ResponseEntity.ok().body(userRepository.findAll());
        // if (StringUtils.isEmpty(lastName)) {
        //     return userRepository.findAll();
        // }
        // return userRepository.findAll(lastName, pageNumber,LINE_PER_PAGE);
    }

    /**
     * Recuperer un utilisateur à partir de son id.
     * @param userid
     * @return 200 OK si l'utilisateur existe + l'utilisateur, 404 not found sinon.
     */
    @GetMapping(path="/users/{id}")
    public ResponseEntity<User> getUserFromId (@PathVariable("id") Integer userid) {
        return ResponseEntity.of(userRepository.findById(userid)); 
        //findById : Optional<User> : may content or not a user
        //of : 200 OK if it has a body, 404 else
    }

    @GetMapping(path="/users/{email}")
    public ResponseEntity <User> getUserFromEmail (@PathVariable("email") String email) {
        for (User user : userRepository.findAll()) {
            if (user.getEmail().equals(email)) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Ajouter un nouvel utilisateur dans la base de donnees.
     * Ne peut etre appelee que depuis un compte administrateur.
     * @param firstName : le prenom de l'utilisateur
     * @param lastName : le nom de famille de l'utilisateur
     * @param email : l'adresse mail (ne doit pas etre deja presente dans la base de donnees)
     * @return "Saved" si successful, error sinon
     */
    @PostMapping(path="/users")
    public @ResponseBody ResponseEntity<User> addNewUser (@RequestParam String firstName , @RequestParam String lastName, @RequestParam String email) {
        User newUser = new User();
        newUser.setEmail(email);
        userRepository.save(newUser);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(newUser.getId())
            .toUri();

        return ResponseEntity.created(location).body(newUser); //200 
    }  
    /**
     * Met a jour tous les champs de l'utilisateur à partir de son id.
     * Si l'utilisateur n'existe pas dans la base de donnees, on le crée
     * avec l'id correspondant à {id}
     * (Ne met pas à jour son id)
     */
    @PutMapping(path="/users/{id}")
    public ResponseEntity<User> updateUserFromId (@PathVariable("id") Integer userid, @RequestParam String firstName,
    @RequestParam String lastName, @RequestParam String email) {
        Optional<User> optUser = userRepository.findById(userid)
            .map(oldUser -> {
                oldUser.setEmail(email);
                return userRepository.save(oldUser);
            });
        return optUser.map(value -> ResponseEntity.ok().body(value))
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setId(userid);
                newUser.setEmail(email);
                URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(newUser.getId())
                    .toUri();
                return ResponseEntity.created(location).body(newUser);

            });
    }

    @DeleteMapping(path="/users/{id}")
    public ResponseEntity<User> deleteUserFromId (@PathVariable("id") Integer userid) {
        userRepository.deleteById(userid);
        return ResponseEntity.noContent().build();
    }
}
