import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class VideoCallService {
  servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'], // free stun server
      },
    ],
    iceCandidatePoolSize: 10,
  };
  pc = new RTCPeerConnection(this.servers);
  localStream!: MediaStream;
  remoteStream!: MediaStream;
  constructor(private firestore: AngularFirestore) { }

  public async localVideoStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    // Push tracks from local stream to peer connection
    this.localStream.getTracks().forEach((track) => {
      this.pc.addTrack(track, this.localStream);
    });
  }
  public async remoteVideoStream() {
    // Pull tracks from remote stream, add to video stream
    this.pc.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        this.remoteStream.addTrack(track);
      });
    };
  }
  public async call() {
    // Reference Firestore collections for signaling
    const callDoc = this.firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    // Get candidates for caller, save to db
    this.pc.onicecandidate = event => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await this.pc.createOffer();
    await this.pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.snapshotChanges().subscribe((snapshot: any) => {
      console.log(snapshot);
      const data = snapshot.data();
      if (!this.pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        this.pc.setRemoteDescription(answerDescription);
      }
    });

    // Listen for remote ICE candidates
    answerCandidates.snapshotChanges().subscribe((snapshot:any) => {
      console.log(snapshot);
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          this.pc.addIceCandidate(candidate);
        }
      });
    });
  }
  public async answer() {
    
  }


}
