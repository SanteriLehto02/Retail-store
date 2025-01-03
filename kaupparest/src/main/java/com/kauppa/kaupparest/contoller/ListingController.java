package com.kauppa.kaupparest.contoller;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kauppa.kaupparest.data.Listing;
import com.kauppa.kaupparest.service.ListingService;



/**
 *
 * @author sante
 */
@RestController
@RequestMapping("/listing")
public class ListingController {

    private ListingService listingService;

    public ListingController(ListingService listingService){
        this.listingService = listingService;
    }

    @GetMapping("/testi")
    public String getMethodName() {
        return "listing testi";
    }

    @GetMapping("/")
    public String getTesti() {
        String testi = listingService.listingtesti();
        return testi;
    }

    
    @GetMapping("/byid/{id}")
    public Listing getMethodName(@PathVariable int id ) {
       Listing response = listingService.getListingById(id);
       return response;
    } 

    @GetMapping("/getall")
    public List<Listing> getAllListings() {
        List<Listing> response = listingService.getAllListings();
        return response;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/postlisting", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Listing> createListing(@RequestBody Listing listing) {
        listingService.createListing(listing);
        return new ResponseEntity<>(listing, HttpStatus.CREATED);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/10newest")
    public List<Listing> get10Newest() {
        return listingService.get10Newest();
    }
 
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/bycategory/{category}")
    public List<Listing> getListingsByCategory(@PathVariable String category){
        List<Listing> response = listingService.getListingsByCategory(category);
        return response;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/byiduser/{iduser}")
    public List<Listing> getListingsByiduser(@PathVariable int iduser){
        List<Listing> response = listingService.getListingByUserId(iduser);
        return response;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{idlisting}")
    public String deleteListing(@PathVariable int idlisting){
        System.out.println("DELETE!!! DELETE!!!! .L.....");
        try {
            listingService.deleteListing(idlisting);
            return "listing deleted";
        } catch (Exception e) {
            return "listing not deleter";
        }
    
    }

    
}
