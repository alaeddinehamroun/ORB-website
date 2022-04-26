import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthResult, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user = {};

  constructor(private authService: NbAuthService) {
    // this.authService.onTokenChange()
    //   .subscribe((token: any) => {

    //     if (token.isValid()) {
    //       this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
    //       console.log(this.user)
    //     }

    //   });
  }
  logout() {
    this.authService.logout('email').subscribe((v: NbAuthResult) => {
      window.location.reload();
    })
  }

  ngOnInit(): void {
  }

}
