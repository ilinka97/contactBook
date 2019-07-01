import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cb-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isHome: boolean = true;
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSearch: boolean = false;
}
