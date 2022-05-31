import { Component, Input, OnInit } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-personal-info-card',
  templateUrl: './personal-info-card.component.html',
  styleUrls: ['./personal-info-card.component.scss']
})
export class PersonalInfoCardComponent implements OnInit {
  @Input() patient! : Patient;
  @Input() size! : NbComponentSize;

  constructor() {
   }

  ngOnInit(): void {

  }

}
