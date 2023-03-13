import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoaiThanhToan } from './loai-thanh-toan';
import { LoaiThanhToanService } from './loai-thanh-toan.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-loai-thanh-toan',
  templateUrl: './loai-thanh-toan.component.html',
  styleUrls: ['./loai-thanh-toan.component.scss']
})
export class LoaiThanhToanComponent implements OnInit {
  public loaiThanhToans!: LoaiThanhToan[];
  public detailLoaiThanhToan!: LoaiThanhToan;
  public editLoaiThanhToan!: LoaiThanhToan;
  public deleteLoaiThanhToan!: LoaiThanhToan;

  constructor(
    private loaiThanhToanSerice: LoaiThanhToanService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getLoaiThanhToans();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getLoaiThanhToans(): void {
    this.loaiThanhToanSerice.getLoaiThanhToans().subscribe(
      (response: LoaiThanhToan[]) => {
        this.loaiThanhToans = response;
        console.log(this.loaiThanhToans);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách loại thanh toán thất bại!');
      }
    );
  }

  public onUpdateLoaiThanhToan(loaiThanhToan: LoaiThanhToan): void {
    this.loaiThanhToanSerice.updateLoaiThanhToan(loaiThanhToan).subscribe(
      (response: LoaiThanhToan) => {
        console.log(response);
        this.getLoaiThanhToans();
        this.showNotification('success','Sửa loại thanh toán thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa loại thanh toán thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddLoaiThanhToan(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.loaiThanhToanSerice.addLoaiThanhToan(addForm.value).subscribe(
      (response: LoaiThanhToan) => {
        console.log(response);
        this.getLoaiThanhToans();
        addForm.reset();
        this.showNotification('success','Thêm loại thanh toán thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm loại thanh toán thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteLoaiThanhToan(loaiThanhToanId: number): void {
    document.getElementById('delete-close')?.click();
    this.loaiThanhToanSerice.deleteLoaiThanhToan(loaiThanhToanId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLoaiThanhToans();
        this.showNotification('success','Xóa loại thanh toán thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa loại thanh toán thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(loaiThanhToan: LoaiThanhToan, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailLoaiThanhToan = loaiThanhToan;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editLoaiThanhToan = loaiThanhToan;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deleteLoaiThanhToan = loaiThanhToan;
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
    downloadLink.download = 'loaithanhtoan-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
