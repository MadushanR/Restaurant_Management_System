package com.example.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class UserOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String deliveryAddress;
    private boolean pickup;
    private double totalAmount;
    private double taxAmount;
    private double finalTotal;

    @ElementCollection
    private List<String> items;

    // Constructors
    public UserOrder() {}

    public UserOrder(String userName, String deliveryAddress, boolean pickup,
                     double totalAmount, double taxAmount, double finalTotal,
                     List<String> items) {
        this.userName = userName;
        this.deliveryAddress = deliveryAddress;
        this.pickup = pickup;
        this.totalAmount = totalAmount;
        this.taxAmount = taxAmount;
        this.finalTotal = finalTotal;
        this.items = items;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public boolean isPickup() {
        return pickup;
    }

    public void setPickup(boolean pickup) {
        this.pickup = pickup;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public double getFinalTotal() {
        return finalTotal;
    }

    public void setFinalTotal(double finalTotal) {
        this.finalTotal = finalTotal;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }
}
