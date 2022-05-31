import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { AddPatientDialogComponent } from 'src/app/components/add-patient-dialog/add-patient-dialog.component';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  patients!: Observable<Patient[]>;
  loading: boolean = true;

  constructor(private patientService: PatientService,
    private dialogService: NbDialogService) {
    this.patients = this.patientService.getPatients();
    this.patientService.getPatients().subscribe(v => {
      this.loading = false;
    });
  }

  ngOnInit(): void {

  }

  addPatient(name: string) {
    this.patientService.addPatient(name);
  }
  open() {
    this.dialogService.open(AddPatientDialogComponent)
      .onClose.subscribe(name =>
        this.addPatient(name)
      );
  }

}
