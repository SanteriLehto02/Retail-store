package com.kauppa.kaupparest.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "iduser")
    public Integer id;

    @Column(name = "username")
    public String username;

    @Column(name = "password") 
    public String password;

    public User() {
    }
    
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
