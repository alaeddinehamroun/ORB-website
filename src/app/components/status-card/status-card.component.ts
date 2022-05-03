import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {
  @Input() tool! : string;
  toggleTool = true;
  constructor() {

  }

  ngOnInit(): void {
  }
  toolChanged(){
    console.log(this.toggleTool)
  }

}
