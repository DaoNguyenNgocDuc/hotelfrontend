import { Component, OnInit } from '@angular/core';
import { ChucVu } from './chuc-vu';
import { ChucVuService } from './chuc-vu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './chuc-vu.component.html',
  styleUrls: ['./chuc-vu.component.scss']
})
export class ChucVuComponent implements OnInit {
  public chucVus: ChucVu[] | null = [];
  public editChucVu!: ChucVu;
  public detailChucVu!: ChucVu;
  public deleteChucVu!: ChucVu;

  constructor(private chucVuService: ChucVuService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getChucVus();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getChucVus(): void {
    this.chucVuService.getChucVus().subscribe(
      (response: ChucVu[]) => {
        this.chucVus = response;
        console.log(this.chucVus);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách chức vụ thất bại!');
      }
    );
  }

  public onUpdateChucVu(chucVu: ChucVu): void {
    this.chucVuService.updateChucVu(chucVu).subscribe(
      (response: ChucVu) => {
        console.log(response);
        this.getChucVus();
        this.showNotification('success','Sửa chức vụ thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa chức vụ thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddChucVu(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.chucVuService.addChucVu(addForm.value).subscribe(
      (response: ChucVu) => {
        console.log(response);
        this.getChucVus();
        addForm.reset();
        this.showNotification('success','Thêm chức vụ thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm chức vụ thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteChucVu(chucVuId: number): void {
    document.getElementById('delete-close')?.click();
    this.chucVuService.deleteChucVu(chucVuId).subscribe(
      (response: void) => {
        console.log(response);
        this.getChucVus();
        this.showNotification('success','Xóa chức vụ thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa chức vụ thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(chucVu: ChucVu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailChucVu = chucVu;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editChucVu = chucVu;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deleteChucVu = chucVu;
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
    downloadLink.download = 'chucvu-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
