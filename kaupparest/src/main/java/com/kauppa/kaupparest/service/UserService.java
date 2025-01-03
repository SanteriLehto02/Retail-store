package com.kauppa.kaupparest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kauppa.kaupparest.data.Listing;
import com.kauppa.kaupparest.data.User;
import com.kauppa.kaupparest.repo.UserRepository;

@Service
public class UserService {

    UserRepository userRepository;
    ListingService listingService;
    
    public UserService(UserRepository userRepository,ListingService listingService){
        this.userRepository = userRepository;
        this.listingService = listingService;
    }

    public String servicetesti(){
        return "serice testi";
    }

    public User getUserById(int id){
        User u  =  userRepository.findById(id).orElse(null);
        return u;
    }
    public User getUserbyUsername(String username){
        User u = userRepository.findByUsername(username);
        return u;
    }

    public void deleteUser(int iduser){
        Optional<User> user = userRepository.findById(iduser);

        if (user.isPresent()) {
            try {
                userRepository.deleteById(iduser);
                List<Listing> lists = listingService.getListingByUserId(iduser);

                for( Listing l : lists) {
                    listingService.deleteListing(l.id);
                }
                listingService.deleteListing(iduser);
            } catch (Exception e) {
                // TODO: handle exception
            }
            
        }else{
            System.out.println("user not found");
        }
    }
}
