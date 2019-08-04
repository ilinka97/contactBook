import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'app/contact';

@Injectable()
export class ContactService {
  contactsUrl = 'http://localhost:8080/contacts';

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.contactsUrl);
  }
  addContact(contact: Contact): Observable<Contact> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    let formData: FormData = new FormData();
    formData.append('contactName', contact.contactName);
    formData.append('phoneNumber', contact.phoneNumber);
    formData.append('email', contact.email);
    formData.append('groupType', contact.groupType);
    formData.append('address', contact.address);
    formData.append('photoFile', contact.photoFile);
    return this.httpClient.post<Contact>(this.contactsUrl + '/saveContact', formData, httpHeaders);
  }
  getContactById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(this.contactsUrl + `/getContact/${id}`);
  }
  updateContact(contact: Contact): Observable<Contact> {
    let formData: FormData = new FormData();
    formData.append('contactId', contact.contactId);
    formData.append('contactName', contact.contactName);
    formData.append('phoneNumber', contact.phoneNumber);
    formData.append('email', contact.email);
    formData.append('groupType', contact.groupType);
    formData.append('address', contact.address);
    formData.append('photoFile', contact.photoFile);
    return this.httpClient.put<Contact>(this.contactsUrl + '/updateContact', formData);
  }
  deleteContact(id: string): Observable<{}> {
    return this.httpClient.delete(this.contactsUrl + `/deleteContact/${id}`);
  }
  searchContacts(contactName: string): Observable<Contact[]> {
    contactName = contactName.trim();
    return this.httpClient.get<Contact[]>(this.contactsUrl + `/searchContacts/?contactName=${contactName}`);
  }
}
