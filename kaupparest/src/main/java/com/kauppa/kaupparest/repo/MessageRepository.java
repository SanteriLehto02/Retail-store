package com.kauppa.kaupparest.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kauppa.kaupparest.data.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message,Integer>{

    /* 
    @Query(value = "SELECT * FROM messages m Where m.idlisting = :idlisting",nativeQuery = true)
    public List<Message> findAllMessagesById(@Param("idlisting") int idlisting);
    */

    @Query(value = "SELECT * FROM messages m WHERE m.idlisting = :idlisting", nativeQuery = true)
    List<Message> findAllMessagesById(@Param("idlisting") int idlisting);

    @Query(value = "SELECT * FROM messages m WHERE idchat = :idchat ORDER BY message_time DESC LIMIT 1", nativeQuery = true)
    List<Message> findNewestMessageById(@Param("idchat") Integer idchat);

    @Query(value = "SELECT * FROM messages m WHERE idchat = :idchat ORDER BY message_time", nativeQuery = true)
    public List<Message> getAllMessagesByChatId(int idchat);

    
}
