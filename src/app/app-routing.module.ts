import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { ChucVuComponent } from './chuc-vu/chuc-vu.component';
import { CthdComponent } from './cthd/cthd.component';
import { CtpdpComponent } from './ctpdp/ctpdp.component';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { HoaDonComponent } from './hoa-don/hoa-don.component';
import { HomeComponent } from './home/home.component';
import { KhachHangComponent } from './khach-hang/khach-hang.component';
import { LoaiPhongComponent } from './loai-phong/loai-phong.component';
import { LoaiThanhToanComponent } from './loai-thanh-toan/loai-thanh-toan.component';
import { LoginComponent } from './login/login.component';
import { NhanVienComponent } from './nhan-vien/nhan-vien.component';
import { PhieuDatPhongComponent } from './phieu-dat-phong/phieu-dat-phong.component';
import { PhieuDenBuComponent } from './phieu-den-bu/phieu-den-bu.component';
import { PhieuKiemTraComponent } from './phieu-kiem-tra/phieu-kiem-tra.component';
import { PhieuSuDungComponent } from './phieu-su-dung/phieu-su-dung.component';
import { PhongComponent } from './phong/phong.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'phong', component: PhongComponent, canActivate: [AuthGuard]},
  {path: 'loaiphong', component: LoaiPhongComponent, canActivate: [AuthGuard]},
  {path: 'dichvu', component: DichVuComponent, canActivate: [AuthGuard]},
  {path: 'chucvu', component: ChucVuComponent, canActivate: [AuthGuard]},
  {path: 'khachhang', component: KhachHangComponent, canActivate: [AuthGuard]},
  {path: 'nhanvien', component: NhanVienComponent, canActivate: [AuthGuard]},
  {path: 'phieudat', component: PhieuDatPhongComponent, canActivate: [AuthGuard]},
  {path: 'ctpdp', component: CtpdpComponent, canActivate: [AuthGuard]},
  {path: 'phieusudung', component: PhieuSuDungComponent, canActivate: [AuthGuard]},
  {path: 'loaithanhtoan', component: LoaiThanhToanComponent, canActivate: [AuthGuard]},
  {path: 'hoadon', component: HoaDonComponent, canActivate: [AuthGuard]},
  {path: 'cthd', component: CthdComponent, canActivate: [AuthGuard]},
  {path: 'phieukt', component: PhieuKiemTraComponent, canActivate: [AuthGuard]},
  {path: 'phieudb', component: PhieuDenBuComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
