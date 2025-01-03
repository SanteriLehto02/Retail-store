package com.kauppa.kaupparest.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="chats")
public class Chat {


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "idchat")
    public Integer id;

    @Column(name = "idowner")
    public Integer idowner;

    @Column(name = "idsender")
    public Integer idsender;

    @Column(name = "idlisting")
    public Integer idlisting;

    public Chat() {

    }

    public Chat( Integer idowner, Integer idsender, Integer idlisting) {
        this.idowner = idowner;
        this.idsender = idsender;
        this.idlisting = idlisting;
    }


}

