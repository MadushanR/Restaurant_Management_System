package com.example.backend.controller;

import com.example.backend.model.UserOrder;
import com.example.backend.repository.UserOrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class UserOrderController {

    private final UserOrderRepository repository;

    public UserOrderController(UserOrderRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public UserOrder createOrder(@RequestBody UserOrder order) {
        return repository.save(order);
    }

    @GetMapping("/{userName}")
    public ResponseEntity<List<UserOrder>> getOrdersByUserId(@PathVariable String userName) {
        List<UserOrder> orders = repository.findByUserName(userName);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserOrder>> getAllOrders() {
        List<UserOrder> orders = repository.findAll();
        return ResponseEntity.ok(orders);
    }
}
