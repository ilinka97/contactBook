import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cb-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let contactName: string;
    let phoneNumber: string;
    let email: string;
    let groupType: string;
    let address: string;
    let photoUrl: string;


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
    this.contactService.addContact(newContact).subscribe();
    this.router.navigate(['/home']);
  }
}
