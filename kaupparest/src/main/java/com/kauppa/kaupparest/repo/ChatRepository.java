package com.kauppa.kaupparest.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kauppa.kaupparest.data.Chat;


public interface ChatRepository extends JpaRepository<Chat,Integer> {

    @Query(value = "SELECT * FROM chats WHERE idlisting = :idlisting ORDER BY idchat", nativeQuery = true)
    List<Chat> findNewestMessageByIdlisting(@Param("idlisting") Integer idlisting);

    @Query(value = "SELECT * FROM chats WHERE idsender = :idsender ORDER BY idchat", nativeQuery = true)
    public List<Chat> FindListingByIdsender(int idsender);

    @Query(value = "SELECT * FROM chats WHERE idlisting = :idlisting AND idsender = :idsender ORDER BY idchat", nativeQuery = true)
    public List<Chat> findIfListingContacted(@Param("idsender") int idsender, @Param("idlisting") int idlisting);


    
}
