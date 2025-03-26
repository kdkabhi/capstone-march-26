package com.example.spring_cap;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PackageService {
    private final PackageRepository packageRepository;
    private final String uploadDir = "uploads/";

    public PackageService(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
        createUploadDir();
    }

    private void createUploadDir() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (Exception e) {
            throw new RuntimeException("Could not create upload directory!");
        }
    }

    public Package savePackage(String name, String description, double price, int days, String date, String itinerary, List<MultipartFile> images) {
        Package packageObj = new Package();
        packageObj.setName(name);
        packageObj.setDescription(description);
        packageObj.setPrice(price);
        packageObj.setDays(days);
        packageObj.setDate(date);
        packageObj.setItinerary(itinerary);

        List<String> imageUrls = images.stream().map(this::saveImage).collect(Collectors.toList());
        packageObj.setImageUrls(imageUrls);

        return packageRepository.save(packageObj);
    }

    public Package updatePackage(Long id, String name, String description, double price, int days, String date, String itinerary, List<MultipartFile> images) {
        Package packageObj = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        packageObj.setName(name);
        packageObj.setDescription(description);
        packageObj.setPrice(price);
        packageObj.setDays(days);
        packageObj.setDate(date);
        packageObj.setItinerary(itinerary);

        if (images != null && !images.isEmpty()) {
            List<String> imageUrls = images.stream().map(this::saveImage).collect(Collectors.toList());
            packageObj.setImageUrls(imageUrls);
        }

        return packageRepository.save(packageObj);
    }

    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    public Package getPackageById(Long id) {
        return packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

    public void deletePackage(Long id) {
        packageRepository.deleteById(id);
    }

    private String saveImage(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (Exception e) {
            throw new RuntimeException("Could not store file " + file.getOriginalFilename(), e);
        }
    }
}