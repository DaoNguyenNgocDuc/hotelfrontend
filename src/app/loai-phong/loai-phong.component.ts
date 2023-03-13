import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoaiPhong } from './loai-phong';
import { LoaiPhongService } from './loai-phong.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-loai-phong',
  templateUrl: './loai-phong.component.html',
  styleUrls: ['./loai-phong.component.scss']
})
export class LoaiPhongComponent implements OnInit {
  public loaiPhongs!: LoaiPhong[];
  public detailLoaiPhong!: LoaiPhong;
  public editLoaiPhong!: LoaiPhong;
  public deleteLoaiPhong!: LoaiPhong;

  constructor(
    private loaiPhongService: LoaiPhongService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getLoaiPhongs();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getLoaiPhongs(): void {
    this.loaiPhongService.getLoaiPhongs().subscribe(
      (response: LoaiPhong[]) => {
        this.loaiPhongs = response;
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách loại phòng thất bại!');
      }
    );
  }

  public onUpdateLoaiPhong(loaiPhong: LoaiPhong): void {
    this.loaiPhongService.updateLoaiPhong(loaiPhong).subscribe(
      (response: LoaiPhong) => {
        console.log(response);
        this.getLoaiPhongs();
        this.showNotification('success','Sửa loại phòng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa loại phòng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddLoaiPhong(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.loaiPhongService.addLoaiPhong(addForm.value).subscribe(
      (response: LoaiPhong) => {
        console.log(response);
        this.getLoaiPhongs();
        addForm.reset();
        this.showNotification('success','Thêm loại phòng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm loại phòng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeletePhong(phongId: number): void {
    document.getElementById('delete-close')?.click();
    this.loaiPhongService.deleteLoaiPhong(phongId).subscribe(
      (response: void) => {
        console.log(response);
        this.getLoaiPhongs();
        this.showNotification('success','Xóa loại phòng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa loại phòng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(loaiPhong: LoaiPhong, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailLoaiPhong = loaiPhong;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editLoaiPhong = loaiPhong;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deleteLoaiPhong = loaiPhong;
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
    downloadLink.download = 'loaiphong-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
