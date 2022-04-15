import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./pages/details/details.component";
import { Error404Component } from "./pages/error404/error404.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { VideoCallComponent } from "./pages/video-call/video-call.component";

// const routerOptions: ExtraOptions = {
//   scrollPositionRestoration: 'enabled',
//   anchorScrolling: 'enabled',
//   scrollOffset: [0, 64]
// }

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'details/:username', component: DetailsComponent },
  { path: 'video-call/:username', component: VideoCallComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: Error404Component }
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
