import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'app/contact';

@Component({
  selector: 'cb-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  groups: string[] = ['FAMILY', 'FRIENDS', 'WORK'];
  private contactId: string;
  private contact: Contact;
  private isNew: boolean = true;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService,
    private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.contactId = params['id'];
          this.contactService.getContactById(this.contactId).subscribe(
            (data: Contact) => {
              this.contact = data;
              this.initForm();
            }
          );
        } else {
          this.isNew = true;
          this.contact = null;
          this.initForm();
        }
      }
    );
  }

  private initForm() {
    let contactName: string;
    let phoneNumber: string;
    let email: string;
    let groupType: string;
    let address: string;
    let photoUrl: string;

    if (!this.isNew) {
      contactName = this.contact.contactName;
      phoneNumber = this.contact.phoneNumber;
      email = this.contact.email;
      groupType = this.contact.groupType;
      address = this.contact.address;
      photoUrl = this.contact.photoFilename;
    }
    this.contactForm = this.formBuilder.group({
      contactName: [contactName, Validators.required],
      phoneNumber: [phoneNumber, Validators.required],
      email: [email],
      groupType: [groupType],
      address: [address],
      photoUrl: [photoUrl]
    });
  }
  onSubmit() {
    let newContact = this.contactForm.value;
    this.contactService.addContact(newContact).subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
