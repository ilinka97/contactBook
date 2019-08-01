import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'cb-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  isHome: boolean;
  isAdd: boolean;
  isEdit: boolean;
  isSearch: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let href = event.urlAfterRedirects;

        if (href === '/home') {
          this.isHome = true;
          this.isAdd = false;
          this.isEdit = false;
          this.isSearch = false;
        }
        if (href === '/addContact') {
          this.isAdd = true;
          this.isHome = false;
          this.isEdit = false;
          this.isSearch = false;
        }
        if (href.includes('/editContact')) {
          this.isEdit = true;
          this.isHome = false;
          this.isSearch = false;
          this.isAdd = false;
        }
        if (href.includes('/searchContacts')) {
          this.isSearch = true;
          this.isHome = false;
          this.isEdit = false;
          this.isAdd = false;
        }
      }
    });
  }

  ngOnInit() {
  }
}


