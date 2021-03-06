import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbThemeModule, NbButtonModule, NbCardModule, NbLayoutModule, NbIconModule, NbActionsModule, NbListModule, NbUserModule, NbAccordionModule, NbTableModule, NbTabsetModule, NbCalendarModule, NbChatModule, NbToggleModule, NbDialogModule, NbInputModule, NbWindowModule, NbStepperModule, NbSpinnerModule, NbBadgeModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { SharedModule } from './shared/shared.module';

import { DetailsComponent } from './pages/details/details.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { VideoCallComponent } from './pages/video-call/video-call.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatShowcaseService } from './services/chat-showcase/chat-showcase.service';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { ChartjsLineComponent } from './components/chartjs-line/chartjs-line.component';
import { ChartModule } from 'angular2-chartjs';
import { ChartjsPieComponent } from './components/chartjs-pie/chartjs-pie.component';
import { VideoMonitorComponent } from './components/video-monitor/video-monitor.component';
import { CallingDialogComponent } from './components/calling-dialog/calling-dialog.component';
import { NbAuthModule } from '@nebular/auth';
import { NbFirebaseAuthModule, NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { AuthGuard } from './guards/auth-guard.service';
import { AddPatientDialogComponent } from './components/add-patient-dialog/add-patient-dialog.component';
import { AddNotificationDialogComponent } from './components/add-notification-dialog/add-notification-dialog.component';
import { PersonalInfoCardComponent } from './components/personal-info-card/personal-info-card.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    PersonalInfoCardComponent,
    AppComponent,
    DetailsComponent,
    Error404Component,
    HomeComponent,
    VideoCallComponent,
    ChatComponent,
    StatusCardComponent,
    ChartjsLineComponent,
    ChartjsPieComponent,
    VideoMonitorComponent,
    CallingDialogComponent,
    AddPatientDialogComponent,
    AddNotificationDialogComponent,
    NotificationsComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbIconModule,
    NbActionsModule,
    NbListModule,
    NbUserModule,
    NbAccordionModule,
    NbTabsetModule,
    NbCalendarModule,
    NbFirebaseAuthModule,
    NbInputModule,
    NbChatModule,
    NbWindowModule.forRoot(),
    NbStepperModule,
    NbSpinnerModule,
    NbToastrModule.forRoot(),


    NbAuthModule.forRoot({
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'email',

        }),
      ],
      forms: {},
    }),

    NbToggleModule,
    NbDialogModule.forRoot(),
    ChartModule,

    SharedModule
  ],

  providers: [ChatShowcaseService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
