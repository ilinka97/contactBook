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
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<Contact>(this.contactsUrl + '/saveContact', contact, httpHeaders);
  }
  getContactById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(this.contactsUrl + `/getContact/${id}`);
  }
  updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(this.contactsUrl + '/updateContact', contact);
  }
  deleteContact(id: string): Observable<{}> {
    return this.httpClient.delete(this.contactsUrl + `/deleteContact/${id}`);
  }
  searchContacts(contactName: string): Observable<Contact[]> {
    contactName = contactName.trim();
    return this.httpClient.get<Contact[]>(this.contactsUrl + `/searchContacts/?contactName=${contactName}`);
  }
}
