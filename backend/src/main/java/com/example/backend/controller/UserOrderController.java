package com.example.backend.controller;

import com.example.backend.model.UserOrder;
import com.example.backend.repository.UserOrderRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class UserOrderController {
    private final UserOrderRepository repository;

    public UserOrderController(UserOrderRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public UserOrder createOrder(@RequestBody UserOrder order) {
        return repository.save(order);
    }

    @GetMapping("/{username}")
    public List<UserOrder> getOrdersByUsername(@PathVariable String username) {
        return repository.findByUserName(username);
    }
}
