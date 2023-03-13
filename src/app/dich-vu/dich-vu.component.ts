import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DichVu } from './dich-vu';
import { DichVuService } from './dich-vu.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dich-vu',
  templateUrl: './dich-vu.component.html',
  styleUrls: ['./dich-vu.component.scss']
})
export class DichVuComponent implements OnInit {
  public dichVus!: DichVu[];
  public editDichVu!: DichVu;
  public detailDichVu!: DichVu;
  public deleteDichVu!: DichVu;

  constructor(
    private dichVuService: DichVuService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getDichvus();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getDichvus(): void {
    this.dichVuService.getDichVus().subscribe(
      (response: DichVu[]) => {
        this.dichVus = response;
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách dịch vụ thất bại!');
      }
    );
  }

  public onUpdateDichVu(dichVu: DichVu): void {
    this.dichVuService.updateDichVu(dichVu).subscribe(
      (response: DichVu) => {
        console.log(response);
        this.getDichvus();
        this.showNotification('success','Sửa dịch vụ thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa dịch vụ thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddDichVu(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.dichVuService.addDichVu(addForm.value).subscribe(
      (response: DichVu) => {
        console.log(response);
        this.getDichvus();
        addForm.reset();
        this.showNotification('success','Thêm dịch vụ thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm dịch vụ thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteDichVu(phongId: number): void {
    document.getElementById('delete-close')?.click();
    this.dichVuService.deleteDichVu(phongId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDichvus();
        this.showNotification('success','Xóa dịch vụ thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa dịch vụ thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(dichVu: DichVu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailDichVu = dichVu;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editDichVu = dichVu;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deleteDichVu = dichVu;
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
    downloadLink.download = 'dichvu-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }

}
