
import { Component, OnInit, ViewChild } from '@angular/core';
import { Phong } from './phong';
import { PhongService } from './phong.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoaiPhongService } from '../loai-phong/loai-phong.service';
import { LoaiPhong } from '../loai-phong/loai-phong';
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-phong',
  templateUrl: './phong.component.html',
  styleUrls: ['./phong.component.scss']
})
export class PhongComponent implements OnInit {
  public phongs!: Phong[];
  public editPhong!: Phong;
  public detailPhong!: Phong;
  public loaiPhongs!: LoaiPhong[];
  public deletePhong!: Phong;
  constructor(
    private phongService: PhongService, 
    private loaiPhongService: LoaiPhongService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getPhongs();
    this.getLoaiPhongs();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getPhongs(): void {
    this.phongService.getPhongs().subscribe(
      (response: Phong[]) => {
        this.phongs = response;
        console.log(this.phongs);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phòng thất bại!');
      }
    );
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

  public onUpdatePhong(phong: Phong): void {
    this.phongService.updatePhong(phong).subscribe(
      (response: Phong) => {
        console.log(response);
        this.getPhongs();
        this.showNotification('success','Sửa phòng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa phòng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddPhong(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.phongService.addPhong(addForm.value).subscribe(
      (response: Phong) => {
        console.log(response);
        this.getPhongs();
        addForm.reset();
        this.showNotification('success','Thêm phòng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm phòng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeletePhong(phongId: number): void {
    document.getElementById('delete-close')?.click();
    this.phongService.deletePhong(phongId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPhongs();
        this.showNotification('success','Xóa phòng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa phòng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(phong: Phong, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailPhong = phong;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editPhong = phong;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deletePhong = phong;
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
    downloadLink.download = 'phong-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
