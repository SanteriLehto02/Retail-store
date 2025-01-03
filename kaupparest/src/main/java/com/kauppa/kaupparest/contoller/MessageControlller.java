package com.kauppa.kaupparest.contoller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kauppa.kaupparest.data.Message;
import com.kauppa.kaupparest.service.MessageService;




@RestController
@RequestMapping("/message")


public class MessageControlller {
    private MessageService messageService;

    public MessageControlller(MessageService messageService){
        this.messageService = messageService;
    }

    @GetMapping("/")
    public String getTesti() {
        String testi = messageService.messagetesti();
        return testi;
    }

    @GetMapping("/{idlisting}")
    public List<Message> getMessagesByListing(@PathVariable int idlisting) {
        return messageService.getMessagesByListing(idlisting);
    }

    
    @PostMapping(value = "/post", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Message> createListing(@RequestBody Message message) {
        messageService.createMessage(message);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @GetMapping("/chat/{idchat}")
    public List<Message> getLatestMessageByChat(@PathVariable int idchat) {
        List<Message> response = messageService.getLatestMessage(idchat);
        return response;
    }


    @GetMapping("/chat/allmessages/{idchat}")
    public List<Message> getAllMessagesByChatId(@PathVariable int idchat) {
        List<Message> response = messageService.getAllMessagesByChatId(idchat);
        return response;
    }

    @GetMapping("/chat")
    public String messageChatTesti() {
        
        return "message chatti";

    }
    
}
