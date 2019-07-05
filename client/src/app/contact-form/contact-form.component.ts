import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'cb-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    let contactName: string;
    let phoneNumber: string;
    let email: string;
    let groupType: string;
    let address: string;
    let photoUrl: string;


    this.contactForm=this.formBuilder.group({
      contactName: [contactName, Validators.required],
      phoneNumber: [phoneNumber, Validators.required],
      email: [email],
      groupType: [groupType],
      address: [address],
      photoUrl: [photoUrl]
    });
  }
  onSubmit(){
    
  }
}
