import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  date = new Date();
  messages!: any[];
  patient!: any;
  constructor(private route: ActivatedRoute,
    private patientService: PatientService,) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((v) =>
    {
      this.patientService.getPatientByName(v['username']).subscribe((v) =>{
        console.log(v[0])
        this.patient = v[0]
      }

      );
      console.log(this.patient)
    });

  }


}
