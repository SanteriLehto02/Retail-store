package com.kauppa.kaupparest.contoller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kauppa.kaupparest.data.Chat;
import com.kauppa.kaupparest.service.ChatService;



@RestController
@RequestMapping("/chat")

public class ChatController {
    ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

     @GetMapping("/")
    public String getTesti() {
        String testi = chatService.chattesti();
        return testi;
    }

    @GetMapping("/chatid/{idChat}")
    public  Optional<Chat> getChatbyIdCaht(@PathVariable int idChat){
        Optional<Chat> response = chatService.getChatByIdChat(idChat);
        return response;
    }

    @GetMapping("/{idlisting}")
    public List<Chat> getChatbyIdlisting(@PathVariable int idlisting){
        List<Chat> response = chatService.getChatByIdlisting(idlisting);
        return response;
    }
    @GetMapping("/idsender/{idsender}")
    public List<Chat> getChatByIdSender(@PathVariable int idsender){
        List<Chat> response = chatService.getChatByIdSender(idsender);
        return response;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/postchat", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        chatService.createChat(chat);;
        return new ResponseEntity<>(chat, HttpStatus.CREATED);
    }

    @GetMapping("/testifcontected/{idsender}/{idlisting}")
    public boolean getChatByIdSender(@PathVariable int idsender,@PathVariable int idlisting){
        boolean response = chatService.listtingContacted(idsender,idlisting);
        return response;
    }
}
