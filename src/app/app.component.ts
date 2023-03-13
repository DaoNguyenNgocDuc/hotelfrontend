import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { NhanVien } from './nhan-vien/nhan-vien';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotelmanagerapp';
  currentUser!: NhanVien;
  constructor(public authenticationService: AuthenticationService, 
    private router: Router) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
}
