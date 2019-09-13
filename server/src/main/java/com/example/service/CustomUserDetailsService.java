package com.example.service;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.entities.User;
import com.example.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		 return userRepository.findByUserCredentialsUsername(username)
	                .map(this::getUserDetails)
	                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username: %s not found", username)));
	}
	private org.springframework.security.core.userdetails.User getUserDetails(User user) {
        return new org.springframework.security.core.userdetails.User(
                user.getUserCredentials().getUsername(),
                user.getUserCredentials().getPassword(),
        		getGrantedAuthorities(user));       
    }
	private List<GrantedAuthority> getGrantedAuthorities(User user) {
        return AuthorityUtils.commaSeparatedStringToAuthorityList(user.getUserCredentials().getRole());
    }
}
