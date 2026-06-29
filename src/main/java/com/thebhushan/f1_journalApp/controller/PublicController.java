package com.thebhushan.f1_journalApp.controller;

import com.thebhushan.f1_journalApp.dto.UserDTO;
import com.thebhushan.f1_journalApp.entity.User;
import com.thebhushan.f1_journalApp.service.UserDetailsServiceImpl;
import com.thebhushan.f1_journalApp.service.UserService;
import com.thebhushan.f1_journalApp.utilis.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/public")
public class PublicController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public PublicController(AuthenticationManager authenticationManager,
                            UserDetailsServiceImpl userDetailsService,
                            UserService userService,
                            JwtUtil jwtUtil) {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDTO userDTO) {

        try {
            User newUser = new User();

            newUser.setEmail(userDTO.getEmail());
            newUser.setUserName(userDTO.getUserName());
            newUser.setPassword(userDTO.getPassword());
            newUser.setSentimentAnalysis(
                    userDTO.isSentimentAnalysis());

            userService.saveNewUser(newUser);

            return new ResponseEntity<>(
                    "User Registered Successfully",
                    HttpStatus.CREATED);

        } catch (Exception e) {

            log.error("Exception occurred while signup", e);

            return new ResponseEntity<>(
                    "Unable to register user",
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(
                            user.getUserName());

            String jwt =
                    jwtUtil.generateToken(
                            userDetails.getUsername());

            return ResponseEntity.ok(Map.of(
                            "token", jwt,
                            "username", userDetails.getUsername(),
                            "message", "Login Successful"
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Incorrect username or password"));
        }
    }
}