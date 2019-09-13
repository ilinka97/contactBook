package com.example.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	Optional<User> findByUserCredentialsUsername(String username);
}
