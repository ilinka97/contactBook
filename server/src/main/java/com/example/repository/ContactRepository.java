package com.example.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.entities.Contact;
import com.example.entities.User;

@Repository
public interface ContactRepository extends CrudRepository<Contact, Long> {
	Contact findByContactId(Long contactId);
	List<Contact> findByUser(User user);
	List<Contact> findByUserAndContactNameContaining(User user, String contactName);
}
