import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PhieuDenBu } from './phieu-den-bu';
import { NhanVien } from '../nhan-vien/nhan-vien';
import { PhieuKiemTra } from '../phieu-kiem-tra/phieu-kiem-tra';
import { PhieuKiemTraService } from '../phieu-kiem-tra/phieu-kiem-tra.service';
import { NhanVienService } from '../nhan-vien/nhan-vien.service';
import { PhieuDenBuService } from './phieu-den-bu.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-phieu-den-bu',
  templateUrl: './phieu-den-bu.component.html',
  styleUrls: ['./phieu-den-bu.component.scss']
})
export class PhieuDenBuComponent implements OnInit {
  public phieuDBs!: PhieuDenBu[];
  public detailPhieuDB!: PhieuDenBu;
  public editPhieuDB!: PhieuDenBu;
  public nhanViens!: NhanVien[];
  public phieuKTs!: PhieuKiemTra[];
  public phieuDat: any;
  public phieuDatId: any;
  public deletePhieuDB!: PhieuDenBu;


  constructor(private phieuDBService: PhieuDenBuService, 
    private phieuKTService: PhieuKiemTraService, 
    private nhanVienService: NhanVienService,
    private notifier: NotifierService) { 

  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  ngOnInit(): void {
    this.getPhieuKTs();
    this.getNhanViens();
    this.getPhieuDBs();
    
  }

  public getPhieuDBs(): void {
    this.phieuDBService.getPhieuDenBus().subscribe(
      (response: PhieuDenBu[]) => {
        this.phieuDBs = response;
        console.log(this.phieuDBs);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phiếu đền bù thất bại!');
      }
    );
  }

  public getPhieuKTs(): void {
    this.phieuKTService.getPhieuKiemTras().subscribe(
      (response: PhieuKiemTra[]) => {
        this.phieuKTs = response;
        console.log(this.phieuKTs);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phiếu thất bại!');
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

  public onUpdatePhieuDB(phieuDB: PhieuDenBu): void {
    this.phieuDBService.updatePhieuDenBu(phieuDB).subscribe(
      (response: PhieuDenBu) => {
        console.log(response);
        this.getPhieuDBs();
        this.showNotification('success','Sửa phiếu đền bù thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa phiếu đền bù thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddPhieuDB(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.phieuDBService.addPhieuDenBu(addForm.value).subscribe(
      (response: PhieuDenBu) => {
        console.log(response);
        this.getPhieuDBs();
        addForm.reset();
        this.showNotification('success','Thêm phiếu đền bù thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm phiếu đền bù thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeletePhieuDB(phieuDBId: number): void {
    document.getElementById('delete-close')?.click();
    this.phieuDBService.deletePhieuDenBu(phieuDBId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPhieuDBs();
        this.showNotification('success','Xóa phiếu đền bù thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa phiếu đền bù thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(phieuDB: PhieuDenBu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailPhieuDB = phieuDB;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editPhieuDB = phieuDB;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deletePhieuDB = phieuDB;
      button.setAttribute('data-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public changePhieuDat(phieuKTId: any): void {
    this.phieuDat = this.phieuKTs.filter((phieuKT) => phieuKT.id == phieuKTId);
    this.phieuDatId = this.phieuDat[0].id_pdp;
  }

  printReport(): void {
    let dataType = 'application/vnd.ms/excel.sheet.macroEnable.12';
    let tableSelect = document.getElementById('datatable');
    let tableHtml = tableSelect?.outerHTML.replace(/ /g, '%20');
    let downloadLink =document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType  + ',' + tableHtml;
    downloadLink.download = 'phieudenbu-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
