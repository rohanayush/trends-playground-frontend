import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {

  now: any;
  constructor() {
    setInterval(() => {
      this.now = Date.now();
    }, 1);

  }

  ngOnInit(): void {
  }

}
