import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cb-wrapper',
  template: `
    <cb-navbar></cb-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class WrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
