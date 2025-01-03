package com.kauppa.kaupparest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kauppa.kaupparest.data.Chat;
import com.kauppa.kaupparest.repo.ChatRepository;

@Service
public class ChatService {
    ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public String chattesti(){
        return "chat testi";
    }
    public void createChat(Chat chat){
        try {
            chatRepository.save(chat);
        } catch (Exception e) {
            throw e;
        }
    }
    public List<Chat> getChatByIdlisting(int idlisting){
        List<Chat> response = chatRepository.findNewestMessageByIdlisting(idlisting);
        return response;
    }

    public List<Chat> getChatByIdSender(int idsender){
        List<Chat> response = chatRepository.FindListingByIdsender(idsender);
        return response;
    }
    public boolean listtingContacted(int idsender,int idlisting){
        List<Chat> response = chatRepository.findIfListingContacted( idsender, idlisting);
        return !response.isEmpty();
    }
    public Optional<Chat> getChatByIdChat(int idChat) {
        Optional<Chat> response = chatRepository.findById(idChat);
        return response;
    }
}