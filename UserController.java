package com.example.spring_cap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final PackageRepository packageRepository;

    public UserController(UserRepository userRepository, FavoriteRepository favoriteRepository, PackageRepository packageRepository) {
        this.userRepository = userRepository;
        this.favoriteRepository = favoriteRepository;
        this.packageRepository = packageRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        UserType userType = userRepository.count() == 0 ? UserType.ADMIN : UserType.USER;
        user.setType(userType);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("id", existingUser.get().getId());
            response.put("name", existingUser.get().getName());
            response.put("email", existingUser.get().getEmail());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
    }

    @GetMapping("/isAdmin")
    public ResponseEntity<?> isAdmin(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getType() == UserType.ADMIN) {
            return ResponseEntity.ok(Map.of("isAdmin", true));
        }
        return ResponseEntity.ok(Map.of("isAdmin", false));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @PostMapping("/favorites")
    public ResponseEntity<?> addFavorite(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long packageId = request.get("packageId");

        Optional<User> user = userRepository.findById(userId);
        Optional<Package> pkg = packageRepository.findById(packageId);

        if (user.isEmpty() || pkg.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User or Package not found"));
        }

        if (favoriteRepository.existsByUserIdAndPackageObjId(userId, packageId)) {
            return ResponseEntity.ok(Map.of("message", "Package already in favorites"));
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user.get());
        favorite.setPackageObj(pkg.get());
        favoriteRepository.save(favorite);

        List<Package> favorites = favoriteRepository.findByUserId(userId)
                .stream()
                .map(Favorite::getPackageObj)
                .collect(Collectors.toList());

        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<Package>> getFavorites(@RequestParam Long userId) {
        List<Package> favorites = favoriteRepository.findByUserId(userId)
                .stream()
                .map(Favorite::getPackageObj)
                .collect(Collectors.toList());
        return ResponseEntity.ok(favorites);
    }
}