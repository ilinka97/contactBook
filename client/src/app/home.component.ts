import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cb-home',
  template: `
    <cb-navbar></cb-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
