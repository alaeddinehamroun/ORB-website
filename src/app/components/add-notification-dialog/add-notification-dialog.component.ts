import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-add-notification-dialog',
  templateUrl: './add-notification-dialog.component.html',
  styleUrls: ['./add-notification-dialog.component.scss']
})
export class AddNotificationDialogComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AddNotificationDialogComponent>) { }

  ngOnInit(): void {
  }
  cancel() {
    this.ref.close();
  }

  submit(type: string, notificationText: string) {
    this.ref.close({type, notificationText});
  }

}
