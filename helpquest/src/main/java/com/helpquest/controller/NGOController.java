package com.helpquest.controller;

import com.helpquest.entity.NGO;
import com.helpquest.service.NGOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ngos")
public class NGOController {

    private final NGOService ngoService;

    public NGOController(NGOService ngoService) {
        this.ngoService = ngoService;
    }

    // GET all NGOs
    @GetMapping
    public List<NGO> getAllNGOs() {
        return ngoService.getAllNGOs();
    }

    // GET an NGO by ID
    @GetMapping("/{id}")
    public ResponseEntity<NGO> getNGOById(@PathVariable Long id) {
        Optional<NGO> ngo = ngoService.getNGOById(id);
        return ngo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST a new NGO
    @PostMapping
    public ResponseEntity<NGO> createNGO(@RequestBody NGO ngo) {
        NGO createdNGO = ngoService.createNGO(ngo);
        return new ResponseEntity<>(createdNGO, HttpStatus.CREATED);
    }

    // PUT (update) an NGO by ID
    @PutMapping("/{id}")
    public ResponseEntity<NGO> updateNGO(@PathVariable Long id, @RequestBody NGO ngo) {
        Optional<NGO> updatedNGO = ngoService.updateNGO(id, ngo);
        return updatedNGO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE an NGO by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNGO(@PathVariable Long id) {
        ngoService.deleteNGO(id);
        return ResponseEntity.noContent().build();
    }
}
