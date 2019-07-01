import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  userName: String = 'Name';

  onLogout() {

  }
}
