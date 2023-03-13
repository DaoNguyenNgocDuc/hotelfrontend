import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { HoaDon } from './hoa-don';
import { LoaiThanhToan } from '../loai-thanh-toan/loai-thanh-toan';
import { NhanVien } from '../nhan-vien/nhan-vien';
import { HoaDonService } from './hoa-don.service';
import { NhanVienService } from '../nhan-vien/nhan-vien.service';
import { LoaiThanhToanService } from '../loai-thanh-toan/loai-thanh-toan.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-hoa-don',
  templateUrl: './hoa-don.component.html',
  styleUrls: ['./hoa-don.component.scss']
})
export class HoaDonComponent implements OnInit {
  public hoaDons!: HoaDon[];
  public editHoaDon!: HoaDon;
  public detailHoaDon!: HoaDon;
  public loaitts!: LoaiThanhToan[];
  public nhanViens!: NhanVien[];
  public deleteHoaDon!: HoaDon;

  constructor(
    private hoaDonService: HoaDonService, 
    private nhanVienService: NhanVienService, 
    private loaiTTService: LoaiThanhToanService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getHoaDons();
    this.getLoaiTTs();
    this.getNhanViens();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getHoaDons(): void {
    this.hoaDonService.getHoaDons().subscribe(
      (response: HoaDon[]) => {
        this.hoaDons = response;
        console.log(this.hoaDons);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách hóa đơn thất bại!');
      }
    );
  }

  public getLoaiTTs(): void {
    this.loaiTTService.getLoaiThanhToans().subscribe(
      (response: LoaiThanhToan[]) => {
        this.loaitts = response;
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách loại thanh toán thất bại!');
      }
    );
  }

  public getNhanViens(): void {
    this.nhanVienService.getNhanViens().subscribe(
      (response: NhanVien[]) => {
        this.nhanViens = response;
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách nhân viên thất bại!');
      }
    );
  }

  public onUpdateHoaDon(hoaDon: HoaDon): void {
    this.hoaDonService.updateHoaDon(hoaDon).subscribe(
      (response: HoaDon) => {
        console.log(response);
        this.getHoaDons();
        this.showNotification('success','Sửa hóa đơn thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa hóa đơn thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddHoaDon(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.hoaDonService.addHoaDon(addForm.value).subscribe(
      (response: HoaDon) => {
        console.log(response);
        this.getHoaDons();
        addForm.reset();
        this.showNotification('success','Thêm hóa đơn thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm hóa đơn thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteHoaDon(hoaDonId: number): void {
    document.getElementById('delete-close')?.click();
    this.hoaDonService.deleteHoaDon(hoaDonId).subscribe(
      (response: void) => {
        console.log(response);
        this.getHoaDons();
        this.showNotification('success','Xóa hóa đơn thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa hóa đơn thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(hoaDon: HoaDon, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailHoaDon = hoaDon;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editHoaDon = hoaDon;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deleteHoaDon = hoaDon;
      button.setAttribute('data-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

  printReport(): void {
    let dataType = 'application/vnd.ms/excel.sheet.macroEnable.12';
    let tableSelect = document.getElementById('datatable');
    let tableHtml = tableSelect?.outerHTML.replace(/ /g, '%20');
    let downloadLink =document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType  + ',' + tableHtml;
    downloadLink.download = 'hoadon-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
