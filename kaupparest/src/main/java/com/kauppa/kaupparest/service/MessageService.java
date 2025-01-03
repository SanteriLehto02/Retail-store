package com.kauppa.kaupparest.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kauppa.kaupparest.data.Message;
import com.kauppa.kaupparest.repo.MessageRepository;

@Service
public class MessageService {
    MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    public String messagetesti(){
        return "message testi";
    }

    public List<Message> getMessagesByListing(int idlisting){
        List<Message> response = messageRepository.findAllMessagesById(idlisting);
        return response;
    }

    public void createMessage(Message message) {
        messageRepository.save(message);
    }

    public List<Message> getLatestMessage(int idchat){
        List<Message> response = messageRepository.findNewestMessageById(idchat);
        return response;
    }

    public List<Message> getAllMessagesByChatId(int idchat){
        List<Message> response = messageRepository.getAllMessagesByChatId(idchat);
        return response;
    }
}
