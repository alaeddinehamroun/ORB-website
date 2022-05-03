import { Component, Input, OnInit } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() patient! : Patient;
  @Input() size! : NbComponentSize;

  constructor() {
   }

  ngOnInit(): void {

  }

}
