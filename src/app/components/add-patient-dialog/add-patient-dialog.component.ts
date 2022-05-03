import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss']
})
export class AddPatientDialogComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AddPatientDialogComponent>) { }

  ngOnInit(): void {
  }
  cancel() {
    this.ref.close();
  }

  submit(name: string) {
    this.ref.close(name);
  }

}
