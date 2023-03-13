import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { NhanVien } from './nhan-vien/nhan-vien';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiServerUrl = environment.apiBaseUrl;
  private currentUserSubject: BehaviorSubject<NhanVien>;
  public currentUser: Observable<NhanVien>;
  constructor(private router: Router, 
    private http: HttpClient) { 
      this.currentUserSubject = new BehaviorSubject<NhanVien>(JSON.parse(localStorage.getItem('currentUser')!));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): NhanVien {
    return this.currentUserSubject.value;
}

  public loginUser(nhanVien: NhanVien): Observable<NhanVien> {
    return this.http.post<NhanVien>(`${this.apiServerUrl}/nhanvien/login`, nhanVien)
              .pipe(map(user => {
                if (user) {
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;

              }));
  }
  
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
}
