package com.thebhushan.f1_journalApp.service;

import com.thebhushan.f1_journalApp.entity.User; // correct import
import com.thebhushan.f1_journalApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUserName(username);

        if (user != null) {
            UserDetails userDetails= org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUserName())
                    .password(user.getPassword())
                    .roles(user.getRoles().toArray(new String[0])) //  array use
                    .build();
            return userDetails;
        }
        throw new UsernameNotFoundException("User not found");

    }
}