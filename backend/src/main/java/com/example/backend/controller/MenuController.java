package com.example.backend.controller;

import com.example.backend.model.MenuItem;
import com.example.backend.repository.MenuItemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    private final MenuItemRepository repository;

    public MenuController(MenuItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MenuItem> getAllItems() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getItemById(@PathVariable Long id) {
        Optional<MenuItem> item = repository.findById(id);
        return item.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public MenuItem createItem(@RequestBody MenuItem item) {
        return repository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateItem(@PathVariable Long id, @RequestBody MenuItem itemDetails) {
        Optional<MenuItem> itemData = repository.findById(id);
        if (itemData.isPresent()) {
            MenuItem item = itemData.get();
            item.setName(itemDetails.getName());
            item.setPrice(itemDetails.getPrice());
            item.setDescription(itemDetails.getDescription());
            item.setCategory(itemDetails.getCategory());  // Set the new field
            return new ResponseEntity<>(repository.save(item), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteItem(@PathVariable Long id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
