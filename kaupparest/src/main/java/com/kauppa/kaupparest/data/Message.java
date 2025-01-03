package com.kauppa.kaupparest.data;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="messages")
public class Message {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "idmessages")
    public Integer id;

    @Column(name = "idsender")
    public Integer idsender;

    @Column(name = "idreceiver")
    public Integer idreceiver;

    @Column(name = "message_time")
    public Date messageTime = new Date();

    @Column(name = "idlisting")
    public Integer idlisting;

    @Column(name = "message_text")
    public String messageText;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private MessageState state;

    @Column(name = "idchat")
    public Integer idchat;

    public Message() {
        
    }

    public Message( Integer idsender, Date messageTime, Integer idlisting, String messageText,Integer idreceiver, MessageState state, Integer idchat) {
        this.idsender = idsender;
        this.messageTime = messageTime;
        this.idlisting = idlisting;
        this.messageText = messageText;
        this.idreceiver = idreceiver;
        this.state = state;
        this.idchat = idchat;
    }

    public MessageState getState() {
        return state;
    }

    public void setState(MessageState state) {
        this.state = state;
    }

    public Integer getIdreceiver() {
        return this.idreceiver;
    }
}
