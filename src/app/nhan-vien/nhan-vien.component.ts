import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NhanVien } from './nhan-vien';
import { NhanVienService } from './nhan-vien.service';
import { ChucVuService } from '../chuc-vu/chuc-vu.service';
import { ChucVu } from '../chuc-vu/chuc-vu';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-nhan-vien',
  templateUrl: './nhan-vien.component.html',
  styleUrls: ['./nhan-vien.component.scss']
})
export class NhanVienComponent implements OnInit {
  public nhanViens!: NhanVien[];
  public chucVus!: ChucVu[];
  public detailNhanVien!: NhanVien;
  public editNhanVien!: NhanVien;
  public deleteNhanVien!: NhanVien;

  constructor(
    private nhanVienService: NhanVienService, 
    private chucVuService: ChucVuService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getNhanViens();
    this.getChucVus();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getNhanViens(): void {
    this.nhanVienService.getNhanViens().subscribe(
      (response: NhanVien[]) => {
        this.nhanViens = response;
        console.log(this.nhanViens);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách nhân viên thất bại!');
      }
    );
  }

  public getChucVus(): void {
    this.chucVuService.getChucVus().subscribe(
      (response: ChucVu[]) => {
        this.chucVus = response;
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách chức vụ thất bại!');
      }
    );
  }

  public onUpdateNhanVien(nhanVien: NhanVien): void {
    this.nhanVienService.updateNhanVien(nhanVien).subscribe(
      (response: NhanVien) => {
        console.log(response);
        this.getNhanViens();
        this.showNotification('success','Sửa nhân viên thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa nhân viên thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddNhanVien(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.nhanVienService.addNhanVien(addForm.value).subscribe(
      (response: NhanVien) => {
        console.log(response);
        this.getNhanViens();
        addForm.reset();
        this.showNotification('success','Thêm nhân viên thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm nhân viên thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteNhanVien(nhanVienId: number): void {
    document.getElementById('delete-close')?.click();
    this.nhanVienService.deleteNhanVien(nhanVienId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNhanViens();
        this.showNotification('success','Xóa nhân viên thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa phòng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(nhanVien: NhanVien, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailNhanVien = nhanVien;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editNhanVien = nhanVien;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deleteNhanVien = nhanVien;
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
    downloadLink.download = 'nhanvien-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
