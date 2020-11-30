import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  accepted:Boolean =  false;


  constructor() {}

  ngOnInit(): void {

  }

  notActive( ): boolean {
    if( this.accepted === false) {
      return this.accepted = true
    } else if( this.accepted === true){
      return this.accepted = false
    }
  }

}
