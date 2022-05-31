import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NbComponentSize, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { VideoMonitorService } from './video-monitor.service';
export interface Camera {
  title: string;
  source: string;
}


@Component({
  selector: 'app-video-monitor',
  templateUrl: './video-monitor.component.html',
  styleUrls: ['./video-monitor.component.scss']
})
export class VideoMonitorComponent implements OnInit {

  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  peerConnection!: RTCPeerConnection;
  private remoteStream!: MediaStream;
  callId!: string;
  user: any
  patientId!: string;
  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    const roomRef = this.firestore.collection('rooms').doc("dLKr1teQlsmBOMwQB5tD");

    roomRef.get().subscribe(async (roomSnapshot: any) => {
      console.log('room existence:' + roomSnapshot.exists);
      if (roomSnapshot.exists) {
        //console.log('Create PeerConnection with configuration: ', this.servers);
        this.peerConnection = new RTCPeerConnection(this.servers);

        this.registerPeerConnectionListeners();


        // Code for collecting ICE candidates below
        const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
        this.peerConnection.onicecandidate = (event) => {
          if (!event.candidate) {
            console.log('Got final candidate!');
            return;
          }
          console.log('Got candidate: ', event.candidate.toJSON());
          calleeCandidatesCollection.add(event.candidate.toJSON());
        };
        // Code for collecting ICE candidates above
        console.log("remote");
        this.peerConnection.ontrack = (event) => {
          console.log(event)
          console.log('Got remote track:', event.streams[0]);
          event.streams[0].getTracks().forEach(track => {
            console.log('Add a track to the remoteStream:', track);
            this.remoteStream.addTrack(track);
            console.log('remote stream' + this.remoteStream)
          });


        }

        // Code for creating SDP answer below
        const offer = roomSnapshot.data();
        console.log('Got offer:', offer);
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        console.log('Created answer:', answer);
        this.peerConnection.setLocalDescription(answer);

        const roomWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        await roomRef.update(roomWithAnswer);
        // Code for creating SDP answer above

        // Listening for remote ICE candidates below
        roomRef.collection('callerCandidates').snapshotChanges().subscribe((snapshot: any) => {
          snapshot.forEach(async (change: any) => {
            console.log(change.payload.doc.data())
            if (change.type === 'added') {
              let data = change.payload.doc.data();
              console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
        // Listening for remote ICE candidates above
      }

    });
  }

  public registerPeerConnectionListeners() {
    this.peerConnection.addEventListener('icegatheringstatechange', () => {
      console.log(
        `ICE gathering state changed: ${this.peerConnection.iceGatheringState}`);
    });

    this.peerConnection.addEventListener('connectionstatechange', () => {
      console.log(`Connection state change: ${this.peerConnection.connectionState}`);
    });

    this.peerConnection.addEventListener('signalingstatechange', () => {
      console.log(`Signaling state change: ${this.peerConnection.signalingState}`);
    });

    this.peerConnection.addEventListener('iceconnectionstatechange ', () => {
      console.log(
        `ICE connection state change: ${this.peerConnection.iceConnectionState}`);
    });
  }

  ngOnDestroy() {

  }

}
