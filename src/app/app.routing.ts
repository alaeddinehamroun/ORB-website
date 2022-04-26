
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./pages/details/details.component";
import { Error404Component } from "./pages/error404/error404.component";
import { HomeComponent } from "./pages/home/home.component";

import { VideoCallComponent } from "./pages/video-call/video-call.component";

import { NbAuthComponent, NbLoginComponent, NbLogoutComponent, NbRegisterComponent, NbRequestPasswordComponent, NbResetPasswordComponent } from "@nebular/auth";
import { AuthGuard } from "./guards/auth-guard.service";

// const routerOptions: ExtraOptions = {
//   scrollPositionRestoration: 'enabled',
//   anchorScrolling: 'enabled',
//   scrollOffset: [0, 64]
// }

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
  },
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  {
    path: 'details/:username', component: DetailsComponent, canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
  },
  {
    path: 'video-call/:username', component: VideoCallComponent, canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
  },
  { path: '**', component: Error404Component },


]
@NgModule({
  imports: [
    //CommonModule,
    //BrowserModule,
    //RouterModule.forRoot(routes, routerOptions)
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

