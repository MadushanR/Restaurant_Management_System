package com.example.backend.controller;
import com.example.backend.model.InventoryItem;
import com.example.backend.repository.InventoryItemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {
    private final InventoryItemRepository repository;
    public InventoryController(InventoryItemRepository repository) {
        this.repository = repository;
    }
    @GetMapping
    public List<InventoryItem> getAllItems() {
        return repository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<InventoryItem> getItemById(@PathVariable Long id) {
        Optional<InventoryItem> item = repository.findById(id);
        return item.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PostMapping
    public InventoryItem createItem(@RequestBody InventoryItem item) {
        return repository.save(item);
    }
    @PutMapping("/{id}")
    public ResponseEntity<InventoryItem> updateItem(@PathVariable Long id, @RequestBody InventoryItem itemDetails) {
        Optional<InventoryItem> itemData = repository.findById(id);
        if (itemData.isPresent()) {
            InventoryItem item = itemData.get();
            item.setName(itemDetails.getName());
            item.setQuantity(itemDetails.getQuantity());
            item.setDescription(itemDetails.getDescription());
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
