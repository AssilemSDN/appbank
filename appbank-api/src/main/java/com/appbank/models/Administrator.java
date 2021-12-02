package com.appbank.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// A faire : faire en sorte qu'il ne puisse y en avoir qu'un seul.

@Entity // This tells Hibernate to make a table out of this class
public class Administrator {
    /**
     * id : primary key genere automatiquement
     */
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id; 
    private String firstName, lastName;

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
}
