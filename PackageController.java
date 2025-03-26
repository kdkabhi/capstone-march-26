package com.example.spring_cap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {
    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @PostMapping("/create")
    public ResponseEntity<Package> createPackage(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam int days,
            @RequestParam String date,
            @RequestParam String itinerary,
            @RequestParam("images") List<MultipartFile> images) {
        return ResponseEntity.ok(packageService.savePackage(name, description, price, days, date, itinerary, images));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Package> updatePackage(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam int days,
            @RequestParam String date,
            @RequestParam String itinerary,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        return ResponseEntity.ok(packageService.updatePackage(id, name, description, price, days, date, itinerary, images));
    }

    @GetMapping
    public ResponseEntity<List<Package>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackage(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}