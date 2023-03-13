import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PhieuKiemTra } from './phieu-kiem-tra';
import { NhanVien } from '../nhan-vien/nhan-vien';
import { PhieuDatPhong } from '../phieu-dat-phong/phieu-dat-phong';
import { PhieuKiemTraService } from './phieu-kiem-tra.service';
import { NhanVienService } from '../nhan-vien/nhan-vien.service';
import { PhieuDatPhongService } from '../phieu-dat-phong/phieu-dat-phong.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-phieu-kiem-tra',
  templateUrl: './phieu-kiem-tra.component.html',
  styleUrls: ['./phieu-kiem-tra.component.scss']
})
export class PhieuKiemTraComponent implements OnInit {
  public phieuKTs!: PhieuKiemTra[];
  public detailPhieuKT!: PhieuKiemTra;
  public editPhieuKT!: PhieuKiemTra;
  public nhanViens!: NhanVien[];
  public phieuDats!: PhieuDatPhong[];
  public deletePhieuKT!: PhieuKiemTra;
  constructor(
    private phieuKTService: PhieuKiemTraService, 
    private nhanVienService: NhanVienService, 
    private phieuDatService: PhieuDatPhongService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getPhieuDats();
    this.getPhieuKTs();
    this.getNhanViens();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getPhieuKTs(): void {
    this.phieuKTService.getPhieuKiemTras().subscribe(
      (response: PhieuKiemTra[]) => {
        this.phieuKTs = response;
        console.log(this.phieuKTs);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phiếu kiểm tra thất bại!');
      }
    );
  }

  public getPhieuDats(): void {
    this.phieuDatService.getPhieuDatPhongs().subscribe(
      (response: PhieuDatPhong[]) => {
        this.phieuDats = response;
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

  public onUpdatePhieuKT(phieuKT: PhieuKiemTra): void {
    this.phieuKTService.updatePhieuKiemTra(phieuKT).subscribe(
      (response: PhieuKiemTra) => {
        console.log(response);
        this.getPhieuKTs();
        this.showNotification('success','Sửa phiếu kiểm tra thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa phiếu kiểm tra thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddPhieuKT(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.phieuKTService.addPhieuKiemTra(addForm.value).subscribe(
      (response: PhieuKiemTra) => {
        console.log(response);
        this.getPhieuKTs();
        addForm.reset();
        this.showNotification('success','Thêm phiếu kiểm tra thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm phiếu kiểm tra thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeletePhieuKT(phieuKTId: number): void {
    document.getElementById('delete-close')?.click();
    this.phieuKTService.deletePhieuKiemTra(phieuKTId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPhieuKTs();
        this.showNotification('success','Xóa phiếu kiểm tra thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa phiếu kiểm tra thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(phieuKT: PhieuKiemTra, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailPhieuKT = phieuKT;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editPhieuKT = phieuKT;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deletePhieuKT = phieuKT;
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
    downloadLink.download = 'phieukt-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
