import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Contact } from 'app/contact';
import 'rxjs/Rx';


@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  contactChanged = new EventEmitter<Contact[]>();

  constructor(private http: Http) { }

  getContacts(){
     return this.http.get('https://localhost:8080/contacts')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Contact[]) => {
          this.contacts = data;
          this.contactChanged.emit(this.contacts);
        }
      );
  }
}
