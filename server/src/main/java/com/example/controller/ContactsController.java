package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Contact;
import com.example.service.ContactService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(produces="application/json")
@CrossOrigin(origins="http://localhost:4200")
@RequiredArgsConstructor
public class ContactsController {
	private final ContactService contactService;

	@GetMapping("contacts")
	public List<Contact> getAllContacts() {
		return contactService.findAllContacts();
	}
}
