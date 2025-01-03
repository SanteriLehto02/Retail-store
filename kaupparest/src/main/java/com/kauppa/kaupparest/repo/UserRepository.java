package com.kauppa.kaupparest.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kauppa.kaupparest.data.User;


@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findByUsername(@Param("username") String username);

}
