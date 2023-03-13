import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { KhachHang } from './khach-hang';
import { KhachHangService } from './khach-hang.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-khach-hang',
  templateUrl: './khach-hang.component.html',
  styleUrls: ['./khach-hang.component.scss']
})
export class KhachHangComponent implements OnInit {
  public khachHangs!: KhachHang[];
  public detailKhachHang!: KhachHang;
  public editKhachHang!: KhachHang;
  public deleteKhachHang!: KhachHang;
  constructor(
    private khachHangService: KhachHangService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getKhachHangs();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getKhachHangs(): void {
    this.khachHangService.getKhachHangs().subscribe(
      (response: KhachHang[]) => {
        this.khachHangs = response;
        console.log(this.khachHangs);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách khách hàng thất bại!');
      }
    );
  }

  public onUpdateKhachHang(khachHang: KhachHang): void {
    this.khachHangService.updateKhachHang(khachHang).subscribe(
      (response: KhachHang) => {
        console.log(response);
        this.getKhachHangs();
        this.showNotification('success','Sửa khách hàng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa khách hàng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddKhachHang(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.khachHangService.addKhachHang(addForm.value).subscribe(
      (response: KhachHang) => {
        console.log(response);
        this.getKhachHangs();
        addForm.reset();
        this.showNotification('success','Thêm khách hàng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm khách hàng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteKhachHang(phongId: number): void {
    document.getElementById('delete-close')?.click();
    this.khachHangService.deleteKhachHang(phongId).subscribe(
      (response: void) => {
        console.log(response);
        this.getKhachHangs();
        this.showNotification('success','Xóa khách hàng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa khách hàng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(khachHang: KhachHang, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailKhachHang = khachHang;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editKhachHang = khachHang;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deleteKhachHang = khachHang;
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
    downloadLink.download = 'khachhang-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
