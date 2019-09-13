package com.example.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.entities.User;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private static final String DEFAULT_ROLE = "ROLE_USER";

	public User registerUser(User user) {
		setPasswordAndRole(user);
		return userRepository.save(user);
	}
	private void setPasswordAndRole(User user) {
		user.getUserCredentials().setPassword(passwordEncoder.encode(user.getUserCredentials().getPassword()));
		user.getUserCredentials().setRole(DEFAULT_ROLE);
	}
	public User getUserByUsername(String username) {
		return userRepository.findByUserCredentialsUsername(username).orElse(null);
	}
}
