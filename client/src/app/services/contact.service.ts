import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "app/models/contact";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactsUrl = "http://localhost:8080/api/contacts";
  private username: string = sessionStorage.getItem("username");
  private params = new HttpParams().set("username", this.username);

  constructor(private httpClient: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.contactsUrl, { params: this.params });
  }
  getImage(photoFilename: string): Observable<String> {
    return this.httpClient.get<String>(this.contactsUrl + `/photos/${photoFilename}`);
  }
  addContact(contact: Contact): Observable<Contact> {
    let formData: FormData = this.toFormData(contact);
    return this.httpClient.post<Contact>(this.contactsUrl + "/saveContact", formData, { params: this.params });
  }
  getContactById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(this.contactsUrl + `/getContact/${id}`);
  }
  updateContact(contact: Contact): Observable<Contact> {
    let formData: FormData = this.toFormData(contact);
    formData.append("contactId", contact.contactId);
    return this.httpClient.put<Contact>(this.contactsUrl + "/updateContact", formData, { params: this.params });
  }
  deleteContact(id: string): Observable<{}> {
    return this.httpClient.delete(this.contactsUrl + `/deleteContact/${id}`);
  }
  searchContacts(contactName: string): Observable<Contact[]> {
    contactName = contactName.trim();
    return this.httpClient.get<Contact[]>(
      this.contactsUrl + `/searchContacts/?contactName=${contactName}`,
      { params: this.params }
    );
  }
  toFormData(contact: Contact): FormData {
    let formData: FormData = new FormData();
    formData.append("contactName", contact.contactName);
    formData.append("phoneNumber", contact.phoneNumber);
    formData.append("email", contact.email);
    formData.append("groupType", contact.groupType);
    formData.append("address", contact.address);
    formData.append("photoFile", contact.photoFile);
    return formData;
  }
}
