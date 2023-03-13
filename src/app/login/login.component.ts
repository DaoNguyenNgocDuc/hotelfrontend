import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { NhanVien } from '../nhan-vien/nhan-vien';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user!:NhanVien;
  public error = '';
  constructor(private authenticationService: AuthenticationService, 
    private router: Router) { }
  
  ngOnInit(): void {
  }

  onLogin(logForm: NgForm) {
    this.user = logForm.value;
    this.authenticationService.loginUser(this.user).subscribe(
      (response) => {
        this.router.navigate(['home']);
      },
      (error: HttpErrorResponse) => {
        if(error.error === 'User not found')
          this.error = 'Sai tài khoản hoặc mật khẩu';
        else
          this.error = 'Đang có lỗi vui lòng thử lại sau'
      }
    );
  }

}
