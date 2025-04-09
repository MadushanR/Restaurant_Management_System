package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    private final UserRepository repository;

    public ManagerController(UserRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginManager(@RequestBody User loginData) {
        Optional<User> manager = repository.findAll().stream()
                .filter(u ->
                        u.getUserName().equals(loginData.getUserName()) &&
                                u.getPassword().equals(loginData.getPassword())&&
                                "manager".equalsIgnoreCase(u.getRole())
                )
                .findFirst();

        if (manager.isPresent()) {
            return new ResponseEntity<>(manager.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid manager credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateManagerProfile(@PathVariable Long id, @RequestBody User updateData) {
        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isPresent()) {
            User manager = userOptional.get();
            // Make sure the user is a manager; adjust as needed (e.g., check role field)
            if ("manager".equalsIgnoreCase(manager.getRole())) {
                manager.setUserName(updateData.getUserName());
                manager.setPassword(updateData.getPassword());
                repository.save(manager);
                return new ResponseEntity<>(manager, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User is not authorized as manager", HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>("Manager not found", HttpStatus.NOT_FOUND);
        }
    }
}
