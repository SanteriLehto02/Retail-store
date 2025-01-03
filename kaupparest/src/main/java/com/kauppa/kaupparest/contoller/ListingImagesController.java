package com.kauppa.kaupparest.contoller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kauppa.kaupparest.data.ListingImage;
import com.kauppa.kaupparest.service.ListingImageService;




@RestController
@RequestMapping("/images")
public class ListingImagesController {

    private ListingImageService listingImageService;

    public ListingImagesController(ListingImageService listingImageService){
        this.listingImageService = listingImageService;
    }

    @GetMapping("/testi")
    public String getMethodName() {
        String response = listingImageService.ListingImageTesti();
        return response;
    }
    @PostMapping("/upload/{idlisting}")
    public String uploadimage(@RequestParam MultipartFile file,@PathVariable int idlisting) throws IOException{

        String response = listingImageService.uploadImage(file, idlisting);

        return response;
    }
    //http://127.0.0.1:5500
    //@CrossOrigin(origins = "http://localhost:5500")
    @GetMapping("/download/{idlisting}")
    public ResponseEntity<List<ListingImage>> getListingImages(@PathVariable int idlisting) {
        List<ListingImage> response = listingImageService.getImagesfromidlisting(idlisting);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/delete/{id}")
    public String deleteImage(@PathVariable int id) {
        String response = listingImageService.deleteImage(id);
        return response;
    }
    
}
