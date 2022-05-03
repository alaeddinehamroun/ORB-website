import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { NbAuthService, NbAuthToken } from "@nebular/auth";
import { Patient } from "../models/patient.model";

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  user: any;
  constructor(
    public firestore: AngularFirestore,
    public authService: NbAuthService
  ) {
    //Getting logged in user infos
    this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {
        if (token.isValid()) {
          console.log(token.getPayload())
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
          //console.log(this.user)
        }

      });
  }
  async addPatient(name: string) {
    const patientDocs = this.firestore.collection('patients').doc(name)
    await patientDocs.update({ supervisorEmail: this.user.email });
  }

  getPatients() {
    const patientRef = this.firestore.collection<Patient>('patients', ref => ref.where('supervisorEmail', '==', this.user.email))
    return patientRef.valueChanges();

  }
  getPatientByName(name: string){
    const patientRef = this.firestore.collection<Patient>('patients', ref => ref.where('displayName', '==', name))
    return patientRef.valueChanges();

  }
}