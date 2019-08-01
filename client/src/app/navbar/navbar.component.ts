import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
  }

  onSubmit(searchForm: any) {
    let searchContact = searchForm.searchTerm;
    this.router.navigate(['/searchContacts'], { queryParams: { contactName: searchContact } });
  }
}
