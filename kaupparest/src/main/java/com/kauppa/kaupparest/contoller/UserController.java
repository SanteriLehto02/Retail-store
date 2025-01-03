package com.kauppa.kaupparest.contoller;



import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kauppa.kaupparest.data.User;
import com.kauppa.kaupparest.service.MySecurityService;
import com.kauppa.kaupparest.service.UserService;





@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private final MySecurityService mySecurityService;


    public UserController(UserService userService,MySecurityService mySecurityService){
        this.userService = userService;
        this.mySecurityService = mySecurityService;
    }

    @GetMapping("/testi")
    public String getMethodName() {
        return "user testi";
    }
    @GetMapping("/")
    public String getTesti() {
        String testi = userService.servicetesti();
        return testi;
    }

    @GetMapping("/byid/{id}")
    public User getMethodName(@PathVariable int id ) {
       User response =  userService.getUserById(id);
       return response;
    } 

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public User register(@RequestParam String username, @RequestParam String password) {
        return mySecurityService.register(username, password);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        String token = mySecurityService.login(username, password);
        if (token == null) {
            return "Login failed";
        }
        return token;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/validate") 
    public String validateJwt(@RequestParam String token) {
        String username = mySecurityService.validateJwt(token);
        if (username == null) {
            return "Invalid token";
        }
        return "Token is valid for user: " + username;
    }

    @GetMapping("/{username}")
    public User getMethodName(@PathVariable String username) {
        User response = userService.getUserbyUsername(username);
        return response;
    }

    @DeleteMapping("/delete/{iduser}")
    public String deleteUser(@PathVariable int iduser){
        System.out.println("delete user call");
        try {
            userService.deleteUser(iduser);
            return "user deleterd";
        } catch (Exception e) {
            
            return "user not deleterd";
        }
    }
}