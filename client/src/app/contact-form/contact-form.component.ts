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
  submitted: boolean;
  fileToUpload: File = null;

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
    let contactName: string = '';
    let phoneNumber: string = '';
    let email: string = '';
    let groupType: string = '';
    let address: string = '';
    let photoFile: File = null;
    if (!this.isNew) {
      contactName = this.contact.contactName;
      phoneNumber = this.contact.phoneNumber;
      email = this.contact.email;
      groupType = this.contact.groupType;
      address = this.contact.address;
      photoFile = this.contact.photoFile;
    }
    this.contactForm = this.formBuilder.group({
      contactName: [contactName, Validators.required],
      phoneNumber: [phoneNumber, [Validators.required,
      Validators.pattern("\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})")]],
      email: [email, Validators.email],
      groupType: [groupType],
      address: [address],
      photoFile: [photoFile]
    });
  }
  get contactName() { return this.contactForm.get('contactName'); }
  get phoneNumber() { return this.contactForm.get('phoneNumber'); }
  get email() { return this.contactForm.get('email'); }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    let formValue = this.contactForm.value;
    formValue.photoFile = this.fileToUpload;
    if (this.isNew) {
      this.contactService.addContact(formValue).subscribe(
        () => {
          this.router.navigate(['/home']);
        }
      );
    } else {
      formValue.contactId = this.contactId;
      this.contactService.updateContact(formValue).subscribe(
        () => {
          this.router.navigate(['/home']);
        }
      )
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
