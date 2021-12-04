package com.appbank.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;

// A faire plus tard... D'abord le login administrator / user +
// lien avec le react.

@Entity // This tells Hibernate to make a table out of this class
@IdClass (AccountId.class) // When an entity has multiple primary key fields (requiered!)
public class Account {
    /** 
     * id : primary key, numero de compte
    */
    @Id
    private Integer proprietaireID;

    @Id    
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private Integer solde;

    // public Account(Integer proprietaireID, Integer solde) {
    //     this.proprietaireID = proprietaireID;
    //     this.solde = solde;
    // }
    // public Account(Integer proprietaireID) {
    //     this(proprietaireID, 0);
    // }

    public Integer getProprietaireID() {
        return proprietaireID;
    }
    
    public Integer getId() {
        return id;
    }

    public Integer getSolde() {
        return solde;
    }

    public void setProprietaireID(Integer id) {
        this.proprietaireID = id;
    }

    public void setId(Integer id) {
        this.id=id;
    }

    public void setSolde(Integer solde) {
        this.solde=solde;
    }
}

class AccountId implements Serializable{
    Integer proprietaireID;
    Integer id;
}
