import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { HomeComponent } from './home/home.component';
import { PhongComponent } from './phong/phong.component';
import { PhongService } from './phong/phong.service';
import { HttpClientModule } from '@angular/common/http';
import { DichVuComponent } from './dich-vu/dich-vu.component';
import { LoaiPhongComponent } from './loai-phong/loai-phong.component';
import { ChucVuComponent } from './chuc-vu/chuc-vu.component';
import { CthdComponent } from './cthd/cthd.component';
import { CtpdpComponent } from './ctpdp/ctpdp.component';
import { HoaDonComponent } from './hoa-don/hoa-don.component';
import { KhachHangComponent } from './khach-hang/khach-hang.component';
import { LoaiThanhToanComponent } from './loai-thanh-toan/loai-thanh-toan.component';
import { NhanVienComponent } from './nhan-vien/nhan-vien.component';
import { PhieuDatPhongComponent } from './phieu-dat-phong/phieu-dat-phong.component';
import { PhieuDenBuComponent } from './phieu-den-bu/phieu-den-bu.component';
import { PhieuKiemTraComponent } from './phieu-kiem-tra/phieu-kiem-tra.component';
import { PhieuSuDungComponent } from './phieu-su-dung/phieu-su-dung.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 150
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    MainFooterComponent,
    HomeComponent,
    PhongComponent,
    DichVuComponent,
    LoaiPhongComponent,
    ChucVuComponent,
    CthdComponent,
    CtpdpComponent,
    HoaDonComponent,
    KhachHangComponent,
    LoaiThanhToanComponent,
    NhanVienComponent,
    PhieuDatPhongComponent,
    PhieuDenBuComponent,
    PhieuKiemTraComponent,
    PhieuSuDungComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [PhongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
