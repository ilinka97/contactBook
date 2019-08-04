package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.entities.Contact;
import com.example.service.ContactPhotoService;
import com.example.service.ContactService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path="/contacts", produces="application/json")
@CrossOrigin(origins="http://localhost:4200")
@RequiredArgsConstructor
public class ContactController {
	private final ContactService contactService;
	private final ContactPhotoService photoService;

	@GetMapping
	public List<Contact> getAllContacts() {
		return contactService.findAllContacts();
	}

	@PostMapping("/saveContact")
	@ResponseStatus(HttpStatus.CREATED)
	public Contact saveContact(@ModelAttribute Contact contact, @RequestParam(value="photoFile",  required=false)  MultipartFile file) {
		if (file != null) {
			contact.setPhotoFilename(photoService.savePhoto(file));
		}
		return contactService.saveContact(contact);
	}

	@GetMapping("/getContact/{id}")
	public Contact getContactById(@PathVariable Long id) {
		return contactService.findContactById(id);
	}

	@PutMapping("/updateContact")
	public Contact updateContact(@ModelAttribute Contact contact, @RequestParam(value="photoFile",  required=false)  MultipartFile file) {
		if (file != null) {
			contact.setPhotoFilename(photoService.savePhoto(file));
		}
		return contactService.saveContact(contact);
	}

	@DeleteMapping("/deleteContact/{id}")
	@ResponseStatus(code=HttpStatus.NO_CONTENT)
	public void deleteContact(@PathVariable Long id) {
		contactService.deleteContact(id);
	}
	
	@GetMapping("/searchContacts")
	public List<Contact> searchContacts(@RequestParam String contactName) {
		return contactService.findContactsByName(contactName);
	}
}
