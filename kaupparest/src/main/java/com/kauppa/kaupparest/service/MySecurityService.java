package com.kauppa.kaupparest.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kauppa.kaupparest.data.User;
import com.kauppa.kaupparest.repo.UserRepository;

@Service
public class MySecurityService {

    @Value("${jwt.secret}")
    private String jwtkey;

    UserRepository userRepository;
    

    public MySecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String username,String password){
        User user = new User(username,BCrypt.hashpw(password, BCrypt.gensalt(10)));
        userRepository.save(user);
        return user;
    }

    public String login(String username, String password){
        User user = userRepository.findByUsername(username);

        if (user == null || !BCrypt.checkpw(password,user.getPassword())) {
            return null;
        }

        Algorithm alg = Algorithm.HMAC256(jwtkey);
        return JWT.create().withSubject(user.getUsername()).sign(alg);
    }

    public String validateJwt(String jwtToken){

        Algorithm alg = Algorithm.HMAC256(jwtkey);
        JWTVerifier verifier = JWT.require(alg).build();

        try {
            DecodedJWT jwt = verifier.verify(jwtToken);
            return jwt.getSubject();
        } catch (JWTVerificationException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }
}
