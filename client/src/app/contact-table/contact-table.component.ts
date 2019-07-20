import { Component, OnInit } from '@angular/core';
import { Contact } from 'app/contact';
import { ContactService } from 'app/services/contact.service';

@Component({
  selector: 'cb-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {
  contacts: Contact[];
  contactId: number;

  constructor(private contactService: ContactService) { }
  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      }
    );
  }

  onDelete() {
  }
}
