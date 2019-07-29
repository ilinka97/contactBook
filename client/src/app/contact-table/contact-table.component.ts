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

  constructor(private contactService: ContactService) { }
  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      }
    );
  }

  onDelete(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }
  onOpenInMaps(address: string){
    window.open('https://maps.google.com/maps?q='+address);	
  }
}
