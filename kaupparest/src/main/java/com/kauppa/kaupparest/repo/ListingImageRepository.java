package com.kauppa.kaupparest.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kauppa.kaupparest.data.ListingImage;

@Repository
public interface ListingImageRepository extends JpaRepository<ListingImage, Integer>{



    public List<ListingImage> findByIdlisting(int idlisting);

    

}
