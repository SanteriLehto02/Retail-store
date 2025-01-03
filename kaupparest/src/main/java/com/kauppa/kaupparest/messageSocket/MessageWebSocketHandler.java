package com.kauppa.kaupparest.messageSocket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kauppa.kaupparest.data.Message;
import com.kauppa.kaupparest.service.MessageService;

@Component
public class MessageWebSocketHandler extends TextWebSocketHandler {

    private MessageService messageService;
    
    public MessageWebSocketHandler(MessageService messageService){
        this.messageService = messageService;
    }

    private final ObjectMapper objectMapper = new ObjectMapper();
    
    
    private Map<Integer, WebSocketSession> activeSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Extract user ID (for example, through session query params or headers)
        Integer userId = extractUserIdFromSession(session);
        if (userId != null) {
            activeSessions.put(userId, session);
            System.out.println("User " + userId + " connected.");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Remove user session from map when connection is closed
        Integer userId = extractUserIdFromSession(session);
        if (userId != null) {
            activeSessions.remove(userId);
            System.out.println("User " + userId + " disconnected.");
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Receive and process incoming message from client
        String payload = message.getPayload();
        System.out.println("payload: " + payload);
        Message messageEntity = objectMapper.readValue(payload, Message.class);
        messageService.createMessage(messageEntity);

        // Forward the message to the intended receiver
        Integer receiverId = messageEntity.getIdreceiver();
        WebSocketSession receiverSession = activeSessions.get(receiverId);

        if (receiverSession != null && receiverSession.isOpen()) {
            // Convert the message back to JSON to send it
            String jsonResponse = objectMapper.writeValueAsString(messageEntity);
            receiverSession.sendMessage(new TextMessage(jsonResponse));
        } else {
            System.out.println("Receiver is not connected.");
        }
    }

    // Helper method to extract user ID from WebSocket session
    private Integer extractUserIdFromSession(WebSocketSession session) {
        // In a real app, this could come from session headers or query parameters
        // For example, extract userId from URL query: ws://localhost:8080/ws?userId=123
        String userIdParam = session.getUri().getQuery().split("=")[1];
        return Integer.parseInt(userIdParam);
    }
}
