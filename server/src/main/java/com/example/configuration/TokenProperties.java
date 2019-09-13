package com.example.configuration;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter @Setter
public class TokenProperties {
	
	private String loginPath = "/api/login";
	private String header = "Authorization";
	private String prefix = "Bearer ";
	private int expiration = 86400;
	private String secret = "JwtSecretKey";
}
