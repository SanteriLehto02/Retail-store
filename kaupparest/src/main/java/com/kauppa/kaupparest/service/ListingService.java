package com.kauppa.kaupparest.service;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kauppa.kaupparest.data.Listing;
import com.kauppa.kaupparest.data.ListingImage;
import com.kauppa.kaupparest.repo.ListingImageRepository;
import com.kauppa.kaupparest.repo.ListingRepository;

@Service
public class ListingService {
    ListingRepository listingRepository;
    ListingImageRepository listingImageRepository;

    public ListingService(ListingRepository listingRepository, ListingImageRepository listingImageRepository) {
        this.listingRepository = listingRepository;
        this.listingImageRepository = listingImageRepository;
    }

    public String listingtesti(){
        return "listing testi";
    }

    public Listing getListingById(int id){
        try {
            Listing listing = listingRepository.findById(id).orElse(null);
            return listing;
        } catch (Exception e) {
            
            throw e;
        }
        
    }

    public List<Listing> getAllListings(){
        try {
            List<Listing> response = listingRepository.findAll();
         return  response;
        } catch (Exception e) {
            throw e;
        }
        
    }

    public void createListing(Listing listing) {
        try {
            listingRepository.save(listing);
        } catch (Exception e) {
            throw e;
        }
        
    }

    public List<Listing> get10Newest(){
        try {
            List<Listing> response = listingRepository.findTop10ByOrderByIdDesc();

        return response;
        } catch (Exception e) {
            throw e;
        }
        
    }
    
    public List<Listing> getListingsByCategory(String category){
        try {
        List<Listing> response = listingRepository.findByCategory(category);
        return response;
        } catch (Exception e) {
            throw e;
        }
        
    }
    public List<Listing> getListingByUserId(int iduser){
        try {
            List<Listing> response = listingRepository.findByUserId(iduser);
            return response;
        } catch (Exception e) {
            throw e;
        }
        
    }

    public void deleteListing(int idlisting){
        try {
        System.out.println("service side test");
        

        System.out.println("testi");
        
            System.out.println("testi1");
            List<ListingImage> listingImages = listingImageRepository.findByIdlisting(idlisting);
            System.out.println("testi2");
            System.out.println("testi2");
            if (listingImages == null) {
                System.out.println("listingImages is null");
            } else if (listingImages.isEmpty()) {
                System.out.println("No images found for idlisting: " + idlisting);
            } else {
                System.out.println("Found images: " + listingImages);
            }
            
            System.out.println("deleteListing method called with idlisting: " + idlisting);
            System.out.println("listingImages " +listingImages);
            for (ListingImage img : listingImages) {
                System.out.println(" img.path "+  img.path);
                String imagePath = img.path;
                System.out.println(imagePath);
                File imageFile = new File(imagePath);
                if (imageFile.exists()) {
                    if (imageFile.delete()) {
                        System.out.println("Deleted image file: " + imagePath);
                    } else {
                        System.out.println("Failed to delete image file: " + imagePath);
                    }
                } else {
                    System.out.println("Image file not found: " + imagePath);
                }
            }

            Optional<Listing> listing = listingRepository.findById(idlisting);
            System.out.println("listing "+listing);
            if (listing.isPresent()) {
                listingRepository.deleteById(idlisting);
            }else{
                System.out.println("listing not found");
            }
            
        } catch (Exception e) {
            // TODO: handle exception
            throw e;
        }
    }
    
}
