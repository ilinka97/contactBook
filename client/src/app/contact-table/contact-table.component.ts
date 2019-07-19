import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'app/contact';
import { ContactService } from 'app/services/contact.service';

@Component({
  selector: 'cb-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {
  contacts: Contact[];
  @Input() contactId: number;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    this.contactService.contactChanged.subscribe(
      (contacts: Contact[]) => this.contacts = contacts
    );
  }

  onDelete(){
  }
}
