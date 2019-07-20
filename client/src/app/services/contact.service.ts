import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'app/contact';

@Injectable()
export class ContactService {
  contactsUrl = 'http://localhost:8080/contacts';

  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.contactsUrl);
  }
}
