import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { map } from 'rxjs';
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

  date = new Date();
  patient!: Patient;
  loading: boolean = true;
  incomingCall: boolean = false
  constructor(private route: ActivatedRoute,
    private patientService: PatientService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService) {

  }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        return param.get("id");
      })
    ).subscribe((userId: any) => {
      this.patientService.getPatientById(userId).subscribe((p: any) => {
        this.patient = p;
        this.loading = false;
      });
    })


  }

  onChange($event: boolean, device: string) {
    this.patientService.toggleDeviceStatus(this.patient.id, $event, device);
  }

  openWindow() {
    this.windowService.open(
      VideoMonitorComponent, { title: "Video monitor" }
    );
  }

}
