import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {
  toggleLight = true;
  constructor() {

  }

  ngOnInit(): void {
  }
  lightChanged(){
    console.log(this.toggleLight)
  }

}
