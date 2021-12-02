package com.appbank.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity // This tells Hibernate to make a table out of this class
//@IdClass (UserId.class) // When an entity has multiple primary key fields (requiered!)
@Table (name="user", uniqueConstraints = {@UniqueConstraint(columnNames={"email"})})
public class User {
    /**
     * id : primary key genere automatiquement
     */
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id; 
    /**
     * email : unique
     */
    @Column(name="email", unique=true)
    private String email; 

    @Column(name = "firstName")
    private String firstName;
    
    @Column(name = "lastName")
    private String lastName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName (String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
}


