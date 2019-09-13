import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'app/models/contact';
import { ContactService } from 'app/services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cb-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private subscription: Subscription;
  private readonly imageType: string = 'data:image/PNG;base64,';

  constructor(private contactService: ContactService, private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam['contactName']) {
          let contactName: string = queryParam['contactName'];
          this.contactService.searchContacts(contactName).subscribe(
            (data: Contact[]) => {
              this.setImage(data);
              this.contacts = data;
            })
        } else {
          this.contactService.getContacts().subscribe(
            (data: Contact[]) => {
              this.setImage(data);
              this.contacts = data;
            });
        }
      });
  }

  setImage(contacts: Contact[]) {
    contacts.forEach(
      (contact: any) => {
        this.contactService.getImage(contact.photoFilename).subscribe(
          (data: any) => {
            contact.photoFilename = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);
          });
      });
  }
  onDelete(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe(
      () => {
        this.ngOnInit();
      });
  }
  onOpenInMaps(address: string) {
    window.open('https://maps.google.com/maps?q=' + address);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
