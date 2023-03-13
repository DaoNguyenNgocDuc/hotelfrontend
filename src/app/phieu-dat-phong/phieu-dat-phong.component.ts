import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PhieuDatPhong } from './phieu-dat-phong';
import { NhanVien } from '../nhan-vien/nhan-vien';
import { KhachHang } from '../khach-hang/khach-hang';
import { PhieuDatPhongService } from './phieu-dat-phong.service';
import { NhanVienService } from '../nhan-vien/nhan-vien.service';
import { KhachHangService } from '../khach-hang/khach-hang.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-phieu-dat-phong',
  templateUrl: './phieu-dat-phong.component.html',
  styleUrls: ['./phieu-dat-phong.component.scss']
})
export class PhieuDatPhongComponent implements OnInit {
  public phieuDats!: PhieuDatPhong[];
  public editPhieuDat!: PhieuDatPhong;
  public detailPhieuDat!: PhieuDatPhong;
  public nhanViens!: NhanVien[];
  public khachHangs!: KhachHang[];
  public deletePhieuDat!: PhieuDatPhong;

  constructor(
    private phieuDatService: PhieuDatPhongService, 
    private nhanVienService: NhanVienService, 
    private khachHangService: KhachHangService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getPhieuDats();
    this.getNhanViens();
    this.getKhachHangs();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}
  
  public getPhieuDats(): void {
    this.phieuDatService.getPhieuDatPhongs().subscribe(
      (response: PhieuDatPhong[]) => {
        this.phieuDats = response;
        console.log(this.phieuDats);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phiếu đặt thất bại!');
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

  public getKhachHangs(): void {
    this.khachHangService.getKhachHangs().subscribe(
      (response: KhachHang[]) => {
        this.khachHangs = response;
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách khách hàng thất bại!');
      }
    );
  }

  public onUpdatePhieuDat(phieuDat: PhieuDatPhong): void {
    this.phieuDatService.updatePhieuDatPhong(phieuDat).subscribe(
      (response: PhieuDatPhong) => {
        console.log(response);
        this.getPhieuDats();
        this.showNotification('success','Sửa phiếu đặt thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa phiếu đặt thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddPhieuDat(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.phieuDatService.addPhieuDatPhong(addForm.value).subscribe(
      (response: PhieuDatPhong) => {
        console.log(response);
        this.getPhieuDats();
        addForm.reset();
        this.showNotification('success','Thêm phiếu đặt thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm phiếu đặt thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeletePhieuDat(phieuDatId: number): void {
    document.getElementById('delete-close')?.click();
    this.phieuDatService.deletePhieuDatPhong(phieuDatId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPhieuDats();
        this.showNotification('success','Xóa phiếu đặt thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa phiếu đặt thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(phieuDat: PhieuDatPhong, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailPhieuDat = phieuDat;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editPhieuDat = phieuDat;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deletePhieuDat = phieuDat;
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
    downloadLink.download = 'phieudatphong-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }

}
