package com.example.entities;

import lombok.Data;

@Data
public class Contact {

	private Long contactId;
	private String contactName;
	private String phoneNumber;
	private String email;
	private ContactGroup groupType; 
	private String address;
	private String photoFilename;
}
