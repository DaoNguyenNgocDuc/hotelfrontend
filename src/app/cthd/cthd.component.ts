import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CTHD } from './cthd';
import { PhieuDatPhong } from '../phieu-dat-phong/phieu-dat-phong';
import { CthdService } from './cthd.service';
import { PhieuDatPhongService } from '../phieu-dat-phong/phieu-dat-phong.service';
import { HoaDon } from '../hoa-don/hoa-don';
import { HoaDonService } from '../hoa-don/hoa-don.service';
import { CTPDP } from '../ctpdp/ctpdp';
import { CtpdpService } from '../ctpdp/ctpdp.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-cthd',
  templateUrl: './cthd.component.html',
  styleUrls: ['./cthd.component.scss']
})
export class CthdComponent implements OnInit {
  public cthds!: CTHD[];
  public editCthd!: CTHD;
  public detailCthd!: CTHD;
  public phieuDPs!: PhieuDatPhong[];
  public hoaDons!: HoaDon[];
  public ctpdps!: CTPDP[];
  public phongs: Array<any> = [];
  public deleteCthd!: CTHD;

  constructor(private cthdService: CthdService, 
    private phieuDPService: PhieuDatPhongService, 
    private hoaDonService: HoaDonService,
    private ctpdpService: CtpdpService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getCthds();
    this.getPhieuDats();
    this.getHoaDons();
    this.getCtpdps();
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public getCthds(): void {
    this.cthdService.getCthds().subscribe(
      (response: CTHD[]) => {
        this.cthds = response;
        console.log(this.cthds);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách chi tiết thất bại!');
      }
    );
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

  public getPhieuDats(): void {
    this.phieuDPService.getPhieuDatPhongs().subscribe(
      (response: PhieuDatPhong[]) => {
        this.phieuDPs = response;
        console.log(this.phieuDPs);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phiếu đặt thất bại!');
      }
    );
  }

  public getHoaDons(): void {
    this.hoaDonService.getHoaDons().subscribe(
      (response: HoaDon[]) => {
        this.hoaDons = response;
        console.log(this.hoaDons);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách hóa đơn thất bại!');
      }
    );
  }

  // public onUpdateCthd(cthd: CTHD): void {
  //   this.cthdService.updateCthd(cthd).subscribe(
  //     (response: CTHD) => {
  //       console.log(response);
  //       this.getCthds();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public onAddCthd(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.cthdService.addCthd(addForm.value).subscribe(
      (response: CTHD) => {
        console.log(response);
        this.getCthds();
        addForm.reset();
        this.showNotification('success','Thêm chi tiết thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm chi tiết thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteCthd(id_hd: number, id_pdp: number, id_p: number): void {
    document.getElementById('delete-close')?.click();
    this.cthdService.deleteCthd(id_hd,id_pdp,id_p).subscribe(
      (response: void) => {
        console.log(response);
        this.getCthds();
        this.showNotification('success','Xóa chi tiết thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa chi tiết thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(cthd: CTHD, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailCthd = cthd;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'delete') {
      this.deleteCthd = cthd;
      button.setAttribute('data-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public changePhong(phieuDPId: any): void {
    this.phongs = this.ctpdps.filter((ctpdp) => ctpdp.id_pdp == phieuDPId);
  }
}
