package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Contact;
import com.example.service.ContactService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path="/contacts", produces="application/json")
@CrossOrigin(origins="http://localhost:4200")
@RequiredArgsConstructor
public class ContactController {
	private final ContactService contactService;

	@GetMapping
	public List<Contact> getAllContacts() {
		return contactService.findAllContacts();
	}
	
	@PostMapping(path="/saveContact", consumes="application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Contact saveContact(@RequestBody Contact contact) {
		return contactService.saveContact(contact);
	}
	
}
