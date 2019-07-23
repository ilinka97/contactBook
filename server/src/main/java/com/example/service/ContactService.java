package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entities.Contact;
import com.example.repository.ContactRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactService {

	private final ContactRepository contactRepository;

	public List<Contact> findAllContacts() {
		return contactRepository.findAll();
	}
	public Contact saveContact(Contact contact) {
		return contactRepository.save(contact);
	}
	public List<Contact> findContactsByName(String contactName) {
		return contactRepository.findByContactNameContaining(contactName);
	}
	public void deleteContact(Long id) {
		contactRepository.deleteById(id);
	}
	public Contact findContactById(Long contactId) {
		return contactRepository.findByContactId(contactId);
	}
}
