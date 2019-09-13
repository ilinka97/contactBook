package com.example.entities;

import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class UserCredentials {
	
	private String username;
    private String password;
    private String role;
}
