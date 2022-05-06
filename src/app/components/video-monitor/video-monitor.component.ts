import { Component, OnInit } from '@angular/core';
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

  private destroy$ = new Subject<void>();

  camera!: any;
  selectedCamera!: Camera;
  isSingleView = false;
  actionSize: NbComponentSize = 'medium';

  constructor(
  ) { }

  ngOnInit() {
    this.camera =
      {
        title: 'Camera #1',
        source: 'assets/images/camera1.jpg',
      }


  }

  ngOnDestroy() {

  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }
}
