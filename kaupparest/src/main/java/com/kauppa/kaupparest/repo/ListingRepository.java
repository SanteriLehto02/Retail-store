package com.kauppa.kaupparest.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kauppa.kaupparest.data.Listing;

@Repository
public interface ListingRepository extends JpaRepository<Listing,Integer> {


    @Query(value = "SELECT * FROM listings l ORDER BY idlisting DESC LIMIT 30", nativeQuery = true)
    List<Listing> findTop10ByOrderByIdDesc();
    
    /* 
    @Query("SELECT l FROM listings l WHERE l.category = :category")
    public List<Listing> findByCategory(@Param("category") String category);
    */
    @Query("SELECT l FROM Listing l WHERE l.category = :category")
    public List<Listing> findByCategory(@Param("category") String category);


    @Query("SELECT l FROM Listing l WHERE l.iduser = :iduser")
    public List<Listing> findByUserId(int iduser);

}
