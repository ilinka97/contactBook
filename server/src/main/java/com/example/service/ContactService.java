package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entities.Contact;
import com.example.entities.User;
import com.example.repository.ContactRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactService {

	private final ContactRepository contactRepository;
	private final UserService userService;

	public List<Contact> findAllContactsByUser(String username) {
		User user = userService.getUserByUsername(username);
		return contactRepository.findByUser(user);
	}
	public Contact saveContact(Contact contact, String username) {
		if (contact.getPhotoFilename() == null) {
			contact.setPhotoFilename("defaultContact.png");
		}
		User user = userService.getUserByUsername(username);
		contact.setUser(user);
		return contactRepository.save(contact);
	}
	public List<Contact> findContactsByNameWhereUser(String username, String contactName) {
		User user = userService.getUserByUsername(username);
		return contactRepository.findByUserAndContactNameContaining(user, contactName);
	}
	public void deleteContact(Long id) {
		contactRepository.deleteById(id);
	}
	public Contact findContactById(Long contactId) {
		return contactRepository.findByContactId(contactId);
	}
}
