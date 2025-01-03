package com.kauppa.kaupparest.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "listing_images")
public class ListingImage {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "idlisting_image")
    public Integer id;

    @Column(name = "idlisting")
    public Integer idlisting;

    @Column(name = "path")
    public String path;

    @Column(name = "url")
    public String url;



    public ListingImage() {
    }

    public ListingImage(Integer idlisting, String path, String url) {
        this.idlisting = idlisting;
        this.path = path;
        this.url = url;
    }

    
}
