package com.helpquest.service;

import com.helpquest.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.helpquest.entity.Company;
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    // Retrieve all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Retrieve a company by ID
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    // Add a new company
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }

    // Update an existing company
    public Optional<Company> updateCompany(Long id, Company updatedCompany) {
        return companyRepository.findById(id).map(company -> {
            company.setName(updatedCompany.getName());
            company.setDescription(updatedCompany.getDescription());
            company.setTotalPoints(updatedCompany.getTotalPoints());
            return companyRepository.save(company);
        });
    }

    // Delete a company by ID
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
}
