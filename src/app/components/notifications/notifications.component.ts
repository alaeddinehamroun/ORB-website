import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { AddNotificationDialogComponent } from '../add-notification-dialog/add-notification-dialog.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  patient!: Patient;
  notifications!: Observable<Notification[]>
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((v) => {
      this.patientService.getPatientById(v['id']).subscribe((p: any) => {
        if (p != undefined) {
          this.patient = p;
          this.notifications = this.patientService.getNotifications(this.patient.id)
        }
      });
    });
  }

  open() {
    this.dialogService.open(AddNotificationDialogComponent)
      .onClose.subscribe((value) => {


        this.addNotification(value.type, value.notificationText)

      }
      );
  }
  addNotification(type: string, notificationText: string) {
    this.patientService.sendNotification(this.patient.id, type, notificationText);
  }
}
