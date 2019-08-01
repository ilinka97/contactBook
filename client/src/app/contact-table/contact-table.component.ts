import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'app/contact';
import { ContactService } from 'app/services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cb-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private subscription: Subscription;

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam['contactName']) {
          let contactName: string = queryParam['contactName'];
          this.contactService.searchContacts(contactName).subscribe(
            (data: Contact[]) => {
              this.contacts = data;
            }
          )
        } else {
          this.contactService.getContacts().subscribe(
            (data: Contact[]) => {
              this.contacts = data;
            }
          );
        }
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
  onOpenInMaps(address: string) {
    window.open('https://maps.google.com/maps?q=' + address);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
