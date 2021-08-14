import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css']
})
export class View2Component implements OnInit {

  din: any;
  day: any;
  mon: any;
  yr: any;
  hr: any;
  min: any;
  weekdays: string[];
  month: string[];
  nation: any;
  now: any;
  constructor() {
    this.din = new Date();
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.month = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    this.day = this.din.getDay();
    this.mon = this.din.getMonth();
    this.yr = this.din.getFullYear();
    this.hr = this.din.getHours();
    this.min = this.din.getMinutes();

    setInterval(() => {
      this.now = Date.now();
    }, 1);
  }

  ngOnInit(): void {
  }

}
