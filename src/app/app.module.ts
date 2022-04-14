import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbButtonModule, NbCardModule, NbLayoutModule, NbIconModule, NbActionsModule, NbListModule, NbUserModule, NbAccordionModule, NbTableModule, NbTabsetModule, NbCalendarModule, NbChatModule, NbToggleModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedModule } from './shared/shared.module';
import { DetailsComponent } from './pages/details/details.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatShowcaseService } from './services/chat-showcase/chat-showcase.service';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { ChartjsLineComponent } from './components/chartjs-line/chartjs-line.component';

@NgModule({
  declarations: [
    CardComponent,
    AppComponent,
    DetailsComponent,
    Error404Component,
    HomeComponent,
    LoginComponent,
    VideoCallComponent,
    ChatComponent,
    StatusCardComponent,
    ChartjsLineComponent
  ],
  imports: [
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
    NbChatModule,
    NbToggleModule,

    SharedModule,
  ],
  providers: [ChatShowcaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
