import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CTPDP } from './ctpdp';
import { CtpdpService } from './ctpdp.service';
import { Phong } from '../phong/phong';
import { PhieuDatPhong } from '../phieu-dat-phong/phieu-dat-phong';
import { PhongService } from '../phong/phong.service';
import { PhieuDatPhongService } from '../phieu-dat-phong/phieu-dat-phong.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-ctpdp',
  templateUrl: './ctpdp.component.html',
  styleUrls: ['./ctpdp.component.scss']
})
export class CtpdpComponent implements OnInit {
  public ctpdps!: CTPDP[];
  public detailCtpdp!: CTPDP;
  public deleteCtpdp!: CTPDP;
  public phongs!: Phong[];
  public phieuDats!: PhieuDatPhong[];
  constructor(
    private ctpdpService: CtpdpService, 
    private phongService: PhongService, 
    private phieuDatService: PhieuDatPhongService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getCtpdps();
    this.getPhongs();
    this.getPhieuDats();
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

  public getPhieuDats(): void {
    this.phieuDatService.getPhieuDatPhongs().subscribe(
      (response: PhieuDatPhong[]) => {
        this.phieuDats = response;
        console.log(this.phieuDats);
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Lấy danh sách phiếu đặt thất bại!');
      }
    );
  }

  // public onUpdateCtpdp(ctpdp: CTPDP): void {
  //   this.ctpdpService.updateCtpdp(ctpdp).subscribe(
  //     (response: CTPDP) => {
  //       console.log(response);
  //       this.getCtpdps();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public onAddCtpdp(addForm: NgForm): void {
    document.getElementById('add-close')?.click();
    this.ctpdpService.addCtpdp(addForm.value).subscribe(
      (response: CTPDP) => {
        console.log(response);
        this.getCtpdps();
        addForm.reset();
        this.showNotification('success','Thêm chi tiết thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Thêm chi tiết thất bại!');
        console.log(error.message);
      }
    );
  }

  public onDeleteCtpdp(id_pdp: number, id_p: number): void {
    document.getElementById('delete-close')?.click();
    this.ctpdpService.deleteCtpdp(id_pdp,id_p).subscribe(
      (response: void) => {
        console.log(response);
        this.getCtpdps();
        this.showNotification('success','Xóa chi tiết thành công!');
      },
      (error: HttpErrorResponse) => {
        this.showNotification('error','Xóa chi tiết thất bại!');
        console.log(error.message);
      }
    );
  }

  public onOpenModal(ctpdp: CTPDP, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode == 'detail') {
      this.detailCtpdp = ctpdp;
      button.setAttribute('data-target', '#detailModal');
    }
    if(mode == 'delete') {
      this.deleteCtpdp = ctpdp;
      button.setAttribute('data-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
