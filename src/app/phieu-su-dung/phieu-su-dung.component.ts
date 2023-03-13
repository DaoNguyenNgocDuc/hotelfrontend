import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PhieuSuDung } from './phieu-su-dung';
import { NhanVien } from '../nhan-vien/nhan-vien';
import { DichVu } from '../dich-vu/dich-vu';
import { PhieuSuDungService } from './phieu-su-dung.service';
import { NhanVienService } from '../nhan-vien/nhan-vien.service';
import { DichVuService } from '../dich-vu/dich-vu.service';
import { PhieuDatPhongService } from '../phieu-dat-phong/phieu-dat-phong.service';
import { PhieuDatPhong } from '../phieu-dat-phong/phieu-dat-phong';
import { CtpdpService } from '../ctpdp/ctpdp.service';
import { CTPDP } from '../ctpdp/ctpdp';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-phieu-su-dung',
  templateUrl: './phieu-su-dung.component.html',
  styleUrls: ['./phieu-su-dung.component.scss']
})
export class PhieuSuDungComponent implements OnInit {
  public phieuSuDungs!: PhieuSuDung[];
  public editPhieuSuDung!: PhieuSuDung;
  public detailPhieuSuDung!: PhieuSuDung;
  public nhanViens!: NhanVien[];
  public phieuDPs!: PhieuDatPhong[];
  public ctpdps!: CTPDP[];
  public phongs: Array<any> = [];
  public dichVus!: DichVu[];
  public deletePhieuSuDung!: PhieuSuDung;


  constructor(
    private phieuSDService: PhieuSuDungService, 
    private phieuDPService: PhieuDatPhongService, 
    private nhanVienService: NhanVienService, 
    private dichVuService: DichVuService,
    private ctpdpService: CtpdpService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getPhieuSuDungs();
    this.getPhieuDPs();
    this.getNhanViens();
    this.getDichvus();
    this.getCtpdps();
  }

  public getPhieuSuDungs(): void {
    this.phieuSDService.getPhieuSuDungs().subscribe(
      (response: PhieuSuDung[]) => {
        this.phieuSuDungs = response;
        console.log(this.phieuSuDungs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}


  public getCtpdps(): void {
    this.ctpdpService.getCtpdps().subscribe(
      (response: CTPDP[]) => {
        this.ctpdps = response;
        console.log(this.ctpdps);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách chi tiết thất bại!');
      }
    );
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

  public getPhieuDPs(): void {
    this.phieuDPService.getPhieuDatPhongs().subscribe(
      (response: PhieuDatPhong[]) => {
        this.phieuDPs = response;
        console.log(this.phieuDPs);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phiếu đặt phòng thất bại!');
      }
    );
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

  public onUpdatePhieuSuDung(phieuSuDung: PhieuSuDung): void {
    this.phieuSDService.updatePhieuSuDung(phieuSuDung).subscribe(
      (response: PhieuSuDung) => {
        console.log(response);
        this.getPhieuSuDungs();
        this.showNotification('success','Sửa phiếu sử dụng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Sửa phiếu sử dụng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onAddPhieuSuDung(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.phieuSDService.addPhieuSuDung(addForm.value).subscribe(
      (response: PhieuSuDung) => {
        console.log(response);
        this.getPhieuSuDungs();
        addForm.reset();
        this.showNotification('success','Thêm phiếu sử dụng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm phiếu sử dụng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeletePhieuSuDung(phieuSuDungId: number): void {
    document.getElementById('delete-close')?.click();
    this.phieuSDService.deletePhieuSuDung(phieuSuDungId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPhieuSuDungs();
        this.showNotification('success','Xóa phiếu sử dụng thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa phiếu sử dụng thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(phieuSuDung: PhieuSuDung, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailPhieuSuDung = phieuSuDung;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'edit') {
      this.editPhieuSuDung = phieuSuDung;
      button.setAttribute('data-target', '#editModal');
    }
    if(mode == 'delete') {
      this.deletePhieuSuDung = phieuSuDung;
      button.setAttribute('data-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public changePhong(phieuDPId: any): void {
    this.phongs = this.ctpdps.filter((ctpdp) => ctpdp.id_pdp == phieuDPId);
  }

  printReport(): void {
    let dataType = 'application/vnd.ms/excel.sheet.macroEnable.12';
    let tableSelect = document.getElementById('datatable');
    let tableHtml = tableSelect?.outerHTML.replace(/ /g, '%20');
    let downloadLink =document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType  + ',' + tableHtml;
    downloadLink.download = 'phieusd-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  print(): void {
    window.print();
  }
}
