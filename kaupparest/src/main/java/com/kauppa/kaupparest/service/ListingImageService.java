package com.kauppa.kaupparest.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.kauppa.kaupparest.data.ListingImage;
import com.kauppa.kaupparest.repo.ListingImageRepository;

/**
 *
 * @author sante
 */
@Service
public class ListingImageService {
    ListingImageRepository listingImageRepository;

    @Value("${image.upload.dir}")
    private String uploadDir;

    public ListingImageService(ListingImageRepository listingImageRepository){
        this.listingImageRepository = listingImageRepository;
    }

    public String ListingImageTesti(){
        return "listing testi(service)";
    }

    public String uploadImage(MultipartFile file,int idlisting) throws IOException{
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        try {
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + File.separator + fileName);
        Files.copy(file.getInputStream(), path);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(fileName)
                .toUriString();

        ListingImage listingImage = new ListingImage(idlisting, path.toString(), fileDownloadUri);
        listingImageRepository.save(listingImage);
        String response = fileDownloadUri;
        return response;
        } catch (Exception e) {
            System.out.println(e);
            return e.getMessage();
        }
        
    }

    public List<ListingImage> getImagesfromidlisting(int idlisting){
        //List<ListingImage> response = listingImageRepository.findByListingId(idlisting);

        return listingImageRepository.findByIdlisting(idlisting);
    }

    public String deleteImage(int id) {
        Optional<ListingImage> toDelete = listingImageRepository.findById(id);
    
        if (toDelete.isPresent()) {
            ListingImage listingImage = toDelete.get();
            // Delete the image file from the folder
            deleteImageFile(listingImage.path);
            
            // Delete the record from the database
            listingImageRepository.delete(listingImage);
            return "Onnistu";
        } else {
            System.out.println("Image with ID " + id + " not found.");
            return "Ei onnistunut";
        }
    }
    
    private void deleteImageFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            Files.deleteIfExists(path);
            System.out.println("File deleted successfully: " + filePath);
        } catch (IOException e) {
            System.out.println("Failed to delete the file: " + filePath);
            e.printStackTrace();
        }
    }
    
    
}
