import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {
  @Input() tool! : string;
  @Input() toggleTool!: boolean;
  @Output() deviceStatusChanged = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit(): void {

  }
  toolChanged(){
    this.deviceStatusChanged.emit(!this.toggleTool)
  }

}
