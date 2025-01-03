package com.kauppa.kaupparest.data;

import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;



@Data
@Builder
@Entity
@Table(name = "listings")
public class Listing {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "idlisting")
    public Integer id;

    @Column(name = "iduser")
    public Integer iduser;

    @Column(name = "item_name")
    public String itemName;

    @Column(name = "category")
    public String category;
    
    @Column(name = "price")
    public Float price;

    @Column(name = "description")
    public String description;

    @Column(name = "location")
    public String location;

    @Column(name = "listed_at")
    public Date listedAt = new Date();

    public Listing() {
        
    }


    public Listing(Integer iduser, String itemName, String category, Float price, String description, String location, Date listedAt) {
        this.iduser = iduser;
        this.itemName = itemName;
        this.category = category;
        this.price = price;
        this.description = description;
        this.location = location;
        this.listedAt = listedAt;
    }
    
    public Listing(Integer id, Integer iduser, String itemName, String category, Float price, String description, String location, Date listedAt) {
        this.id = id;
        this.iduser = iduser;
        this.itemName = itemName;
        this.category = category;
        this.price = price;
        this.description = description;
        this.location = location;
        this.listedAt = listedAt;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIduser() {
        return this.iduser;
    }

    public void setIduser(Integer iduser) {
        this.iduser = iduser;
    }

    public String getItemName() {
        return this.itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Float getPrice() {
        return this.price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getListedAt() {
        return this.listedAt;
    }

    public void setListedAt(Date listedAt) {
        this.listedAt = listedAt;
    }

    public Listing id(Integer id) {
        setId(id);
        return this;
    }

    public Listing iduser(Integer iduser) {
        setIduser(iduser);
        return this;
    }

    public Listing itemName(String itemName) {
        setItemName(itemName);
        return this;
    }

    public Listing category(String category) {
        setCategory(category);
        return this;
    }

    public Listing price(Float price) {
        setPrice(price);
        return this;
    }

    public Listing description(String description) {
        setDescription(description);
        return this;
    }

    public Listing location(String location) {
        setLocation(location);
        return this;
    }

    public Listing listedAt(Date listedAt) {
        setListedAt(listedAt);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Listing)) {
            return false;
        }
        Listing listing = (Listing) o;
        return Objects.equals(id, listing.id) && Objects.equals(iduser, listing.iduser) && Objects.equals(itemName, listing.itemName) && Objects.equals(category, listing.category) && Objects.equals(price, listing.price) && Objects.equals(description, listing.description) && Objects.equals(location, listing.location) && Objects.equals(listedAt, listing.listedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, iduser, itemName, category, price, description, location, listedAt);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", iduser='" + getIduser() + "'" +
            ", itemName='" + getItemName() + "'" +
            ", category='" + getCategory() + "'" +
            ", price='" + getPrice() + "'" +
            ", description='" + getDescription() + "'" +
            ", location='" + getLocation() + "'" +
            ", listedAt='" + getListedAt() + "'" +
            "}";
    }
    
}
