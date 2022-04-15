import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

@Injectable()
export class VideoMonitorService {

  private cameras: any[] = [
    {
      title: 'Camera #1',
      source: 'assets/images/camera1.jpg',
    },
    {
      title: 'Camera #2',
      source: 'assets/images/camera2.jpg',
    },
    {
      title: 'Camera #3',
      source: 'assets/images/camera3.jpg',
    },
    {
      title: 'Camera #4',
      source: 'assets/images/camera4.jpg',
    },
  ];

  getCamerasData(): Observable<any[]> {
    return observableOf(this.cameras);
  }
}
