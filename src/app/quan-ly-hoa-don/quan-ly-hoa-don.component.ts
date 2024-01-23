
import { NgForm } from '@angular/forms';
import { ChiNhanh } from '../../model/chinhanh.model';
import { ModalDismissReasons, NgbModal , NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';
import { HoaDonService } from '../service/hoadon.service';
import { ChiNhanhService } from '../service/chinhanh.service';
import { KhachHangService } from '../service/khachhang.service';
import { NhanVienService } from '../service/nhanvien.service';
import { ChiTietHoaDon, HoaDon } from '../../model/hoadon.model';
import { SanPhamService } from '../service/sanpham.service';

@Component({
  selector: 'app-quan-ly-hoa-don',
  templateUrl: './quan-ly-hoa-don.component.html',
  styles: ``
})
export class QuanLyHoaDonComponent implements OnInit {

  guidId: any;
  chinhanh: ChiNhanh = new ChiNhanh
  private modalService = inject(NgbModal);
  closeResult!: any
  modal:NgbModal = new NgbModal
  danhsach: HoaDon[]=[]
  CTHD: ChiTietHoaDon[] = []
  constructor(public service: HoaDonService, public cn: ChiNhanhService, public kh: KhachHangService, 
    public nv: NhanVienService, private toastr: ToastrService, private master: MasterService,
    public sp: SanPhamService
  ){}

  ngOnInit(): void {
    this.service.danhsachHoadon()
    this.sp.danhsachSanpham()
    this.cn.danhsachChiNhanh()
    this.kh.danhsachKhachHang()
    this.nv.danhsachNhanVien()
  }

  UpdateModal(code: any) {
    this.openUpdate()
    this.service.timDSCTHDtheoHD(code)
    .subscribe({
      next: res=>{
        this.CTHD = res as ChiTietHoaDon[]
      }
    })
    }
  onUpdate(_t97: NgForm) {
  // this.service.data = this.chinhanh
  // this.service.suathongtinChiNhanh(this.chinhanh.idchiNhanh)
  // .subscribe({
  //   next: res=>{
  //     console.log(res)
  //     this.toastr.success("Cập nhật thông tin thành công!")
  //     this.service.danhsachChiNhanh()
  //     this.modal.dismissAll

  //   }
  // })
  }
  onSubmit(_t31: NgForm) {
    // this.service.data.idchiNhanh = this.guidId
    // this.service.themthongtinChiNhanh()
    // .subscribe({
    //   next: res=>{
    //     this.toastr.success("Thêm thông tin thành công!")
    //     this.service.danhsachChiNhanh()
    //     this.modal.dismissAll
    //   }
    // })
  }
  Delete(code: any) {
    this.openDel()
    this.guidId = code
  }
  Del() {
  this.service.xoahoaDon(this.guidId)
  .subscribe({
    next: res=>{
      this.toastr.success("Xóa thông tin thành công!")
      this.service.danhsachHoadon()
      this.modal.dismissAll
      console.log(res)
    }
  })
  }


  
  
@ViewChild('updatemodal') updateView !: ElementRef
openUpdate() {
  const modalRef = this.modalService.open(this.updateView, { ariaLabelledBy: 'modal-basic-title'}).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }
  );
}
open(content: TemplateRef<any>) {
  this.guidId = this.master.createGuid()
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}
@ViewChild('del_content') addview !: ElementRef
openDel() {
  this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}
private getDismissReason(reason: any): string {
  switch (reason) {
    case ModalDismissReasons.ESC:
      return 'by pressing ESC';
    case ModalDismissReasons.BACKDROP_CLICK:
      return 'by clicking on a backdrop';
    default:
      return `with: ${reason}`;
  }
}
}
