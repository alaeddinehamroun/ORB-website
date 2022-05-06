import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { VideoMonitorComponent } from 'src/app/components/video-monitor/video-monitor.component';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  date = new Date();
  messages!: any[];
  patient!: Patient;
  loading: boolean = true;

  constructor(private route: ActivatedRoute,
    private patientService: PatientService,
    private windowService: NbWindowService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((v) => {
      this.patientService.getPatientById(v['id']).subscribe((p: any) => {
        if (p !=undefined) {
          console.log(v)
          this.patient = p;
          console.log(this.patient)
          this.loading = false;
        }


      }
      );
    });

  }

  onChange($event: boolean, device: string) {
    console.log(this.patient)
    this.patientService.toggleDeviceStatus(this.patient.id, $event, device)
  }
  openWindow() {
    this.windowService.open(
      VideoMonitorComponent, {title: "Video monitor"}
    );
  }
}
