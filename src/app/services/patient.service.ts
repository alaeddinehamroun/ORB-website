import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { NbAuthService, NbAuthToken } from "@nebular/auth";
import { Observable } from "rxjs";
import { Notification } from "../models/notification.model";
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
    return patientRef.valueChanges({ idField: 'id' });

  }
  getPatientById(id: string): Observable<any> {
    const patientRef = this.firestore.collection<Patient>('patients').doc(id);
    return patientRef.valueChanges({ idField: 'id' });

  }

  toggleDeviceStatus(id: string, deviceStatus: boolean, device: string) {
    console.log(id)
    const patientRef = this.firestore.collection('patients').doc(id);
    if (device == "lights")
      patientRef.update({
        'devices.lights': deviceStatus
      })
    if (device == "ac")
      patientRef.update({
        'devices.ac': deviceStatus

      })
    if (device == "tv")
      patientRef.update({
        'devices.tv': deviceStatus

      })

  }
  openVideoMonitor() {

  }
  sendNotification(patientId: string, type: string, notificationText: string) {
    console.log(new Date().getTime())
    const patientRef = this.firestore.collection('patients').doc(patientId).collection('notifications');
    patientRef.doc().set({
      type: type,
      text: notificationText,
      date: new Date().getTime(),
      from: "nurse"
    });
  }

  getNotifications(patientId: string) {
    const patientRef = this.firestore.collection('patients').doc(patientId).collection<Notification>('notifications',  ref => ref.orderBy('date'));
    return patientRef.valueChanges({ idField: 'id' });
  }
}
