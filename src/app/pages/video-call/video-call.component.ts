import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

interface Data { sdp: string; type: string }

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})

export class VideoCallComponent implements OnInit, OnDestroy {

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('dialog') dialog: any;
  audioStatus: boolean = true;
  videoStatus: boolean = true;
  remoteAudioStatus: boolean = false;
  remoteVideoStatus: boolean = false;
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
  private localStream!: MediaStream;
  private remoteStream!: MediaStream;
  callId!: string;
  user: any
  constructor(private firestore: AngularFirestore, private authService: NbAuthService, private router: Router) {
    this.authService.onTokenChange()
      .subscribe((token: any) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
          this.callId = this.user.user_id;
        }

      });
  }

  async ngOnInit(): Promise<void> {

    await this.openUserMedia();
    await this.answer();
  }

  public toggleAudio() {
    this.localStream.getTracks()[0].enabled = !this.localStream.getTracks()[0].enabled;
    this.audioStatus = this.localStream.getTracks()[0].enabled;
  }
  public toggleVideo() {
    this.localStream.getTracks()[1].enabled = !this.localStream.getTracks()[1].enabled;
    this.videoStatus = this.localStream.getTracks()[1].enabled;
  }
  public async openUserMedia() {
    const stream = await navigator.mediaDevices.getUserMedia(
      { video: true, audio: true });
    this.localStream = stream;
    this.localVideo.nativeElement.srcObject = this.localStream;

    this.remoteStream = new MediaStream();

    this.remoteVideo.nativeElement.srcObject = this.remoteStream;
  }
  public async call() {

    const roomRef = this.firestore.collection('rooms').doc(this.callId);

    console.log('Create PeerConnection with configuration: ', this.servers);
    this.peerConnection = new RTCPeerConnection(this.servers);

    this.registerPeerConnectionListeners();

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates');
    this.peerConnection.onicecandidate = event => {
      event.candidate && callerCandidatesCollection.add(event.candidate.toJSON());
    };
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    console.log('Created offer:', offer);

    const roomWithOffer = {
      'offer': {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    await roomRef.set(roomWithOffer,)

    // Code for creating a room above

    this.peerConnection.ontrack = event => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        console.log('Add a track to the remoteStream:', track);
        this.remoteStream.addTrack(track);
      });
      console.log('remote stream' + this.remoteStream)


    }

    // Listening for remote session description below
    roomRef.valueChanges().subscribe(async (value: any) => {
      const data = value;
      if (!this.peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await this.peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above
    // Listen for remote ICE candidates below
    roomRef.collection('calleeCandidates').snapshotChanges().subscribe(snapshot => {
      snapshot.forEach(async (change: any) => {
        console.log(change.payload.doc.data())
        if (change.type === 'added') {
          let data = change.payload.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above

  }

  public async answer() {

    const roomRef = this.firestore.collection('rooms').doc("bRfTIinFWbPsnQ54pQon");

    roomRef.get().subscribe(async (roomSnapshot: any) => {
      console.log(roomSnapshot.exists);
      if (roomSnapshot.exists) {
        //console.log('Create PeerConnection with configuration: ', this.servers);
        this.peerConnection = new RTCPeerConnection(this.servers);
        //this.registerPeerConnectionListeners();
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track, this.localStream);
        });
        // Code for collecting ICE candidates below
        const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
        this.peerConnection.onicecandidate = event => {
          event.candidate && calleeCandidatesCollection.add(event.candidate.toJSON());
        };
        // Code for collecting ICE candidates above
        this.peerConnection.ontrack = event => {
          console.log(event)
          console.log('Got remote track:', event.streams[0]);
          event.streams[0].getTracks().forEach(track => {
            console.log('Add a track to the remoteStream:', track);
            this.remoteStream.addTrack(track);
            console.log('remote stream' + this.remoteStream)
          });
          this.remoteAudioStatus = this.remoteStream.getTracks()[0].enabled;
          this.remoteVideoStatus = this.remoteStream.getTracks()[1].enabled;

        }
        // Code for creating SDP answer below
        const offer = roomSnapshot.data().offer;
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
  public async hangup() {


    this.router.navigate(['/details/Mailchimp']);

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
  ngOnDestroy(): void {
    const roomRef = this.firestore.collection('rooms').doc(this.callId);
    this.localStream.getTracks().forEach(track => {
      track.stop();
    });

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(track => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }

    // Delete room on hangup
    roomRef.delete();

  }

}
