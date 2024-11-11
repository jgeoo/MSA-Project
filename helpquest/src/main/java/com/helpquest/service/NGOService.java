package com.helpquest.service;

import com.helpquest.entity.NGO;
import com.helpquest.repository.NGORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NGOService {

    @Autowired
    private NGORepository ngoRepository;

    // Retrieve all NGOs
    public List<NGO> getAllNGOs() {
        return ngoRepository.findAll();
    }

    // Retrieve an NGO by ID
    public Optional<NGO> getNGOById(Long id) {
        return ngoRepository.findById(id);
    }

    // Add a new NGO
    public NGO createNGO(NGO ngo) {
        return ngoRepository.save(ngo);
    }

    // Update an existing NGO
    public Optional<NGO> updateNGO(Long id, NGO updatedNGO) {
        return ngoRepository.findById(id).map(ngo -> {
            ngo.setName(updatedNGO.getName());
            ngo.setDescription(updatedNGO.getDescription());
            ngo.setContactEmail(updatedNGO.getContactEmail());
            return ngoRepository.save(ngo);
        });
    }

    // Delete an NGO by ID
    public void deleteNGO(Long id) {
        ngoRepository.deleteById(id);
    }
}
