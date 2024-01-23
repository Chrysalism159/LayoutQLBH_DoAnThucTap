import { ModalDismissReasons, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";

import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';
import { KhachHang } from '../../model/khachhang.model';
import { NhanVienService } from '../service/nhanvien.service';
import { NhanVien } from '../../model/nhanvien.model';

@Component({
  selector: 'app-danh-sach-nhan-vien',
  templateUrl: './danh-sach-nhan-vien.component.html',
  styles: ``
})
export class DanhSachNhanVienComponent implements OnInit {
  closeResult = '';
  chiNhanhValue:string=" "
  TaiKhoanValue:string=" "
  guidId: string=" "
  GenderSelected: boolean= true
  minDate: Date= new Date (1960, 1,1)
  maxDate: Date= new Date(2000,1,1)
  NgaySinh: Date= new Date(1960,1,1)
  NgayBatDaulamViec: Date= new Date(1960,1,1)
  id: any
  gioitinhNu:string="Nữ"
  gioitinhNam:string="Nam"
  nhanvien: NhanVien = new NhanVien()
  private modalService = inject(NgbModal);
  constructor(public service: NhanVienService, private toastr: ToastrService, public master: MasterService)
  {
    this.chiNhanhValue = '';
    this.TaiKhoanValue = ' '
    this.maxDate = new Date()
  }

generateGuid() {
  this.guidId = this.master.createGuid();
}

  formLT!: FormGroup;

  ngOnInit(): void {
    
    this.service.danhsachNhanVien()
    this.service.danhsachChiNhanh()
    this.service.danhsachTaikhoan()
  }
  onSubmit(form: NgForm) {
    this.service.dataNhanVien.idnhanVien = this.guidId
    this.service.dataNhanVien.idchiNhanh = this.chiNhanhValue
    this.service.dataNhanVien.idtaiKhoan = this.TaiKhoanValue
    this.service.dataNhanVien.ngayBatDauLamViec = this.NgayBatDaulamViec.toLocaleString()
    this.service.dataNhanVien.gioiTinh = this.GenderSelected
    this.service.dataNhanVien.ngaySinh = this.NgaySinh.toLocaleString()
    console.log(this.service.dataNhanVien)
    this.service.themNhanvien().subscribe({
        next: res=>{
          console.log(this.chiNhanhValue)
          this.service.danhsachNhanVien()
        },
        error: err=>{
          console.log(err)
        }
      })
    
  }
  enableBtnSave() {
    
  }

  checkImg() {
    
  }
  Delete(id:any) {
    this.openDel()
    this.id = id
  }
  Del() {
    console.log(this.id)
    this.service.xoaThongTinNhanvien(this.id)
      .subscribe({
        next: res => {
          this.toastr.success("Xóa thành công!")
          this.service.danhsachNhanVien()
        },
        error: err => {
          console.log(err)
        }
      })
    }
    onUpdate(form:NgForm)
    {
      console.log(this.nhanvien.idnhanVien)
      console.log(this.nhanvien)
      this.nhanvien.ngaySinh = this.NgaySinh.toLocaleString()
      this.nhanvien.ngayBatDauLamViec = this.NgayBatDaulamViec.toLocaleString()
      this.service.dataNhanVien.gioiTinh = this.GenderSelected
      this.service.dataNhanVien.idchiNhanh = this.chiNhanhValue
      this.service.dataNhanVien.idtaiKhoan = this.TaiKhoanValue
      this.service.dataNhanVien.ngayBatDauLamViec = this.NgayBatDaulamViec.toLocaleString()
      this.service.dataNhanVien.gioiTinh = this.GenderSelected
      this.service.dataNhanVien.ngaySinh = this.NgaySinh.toLocaleString()
      this.service.dataNhanVien = this.nhanvien
      console.log(this.service.dataNhanVien)
      this.service.capnhatNhanvien().subscribe({
        next: res=>{
          console.log(res)
          this.service.danhsachNhanVien()
          this.toastr.success("Cập nhật thông tin nhân viên thành công!", "")
        },
        error: err=>{
          console.log(err)
        }
      })
    }
    UpdateModal(code: any)
    {
      this.openUpdate()
      this.service.timNhanvienBangid(code)
      .subscribe({
        next: res=>{
          this.nhanvien = res as NhanVien
        },
        error: err=>{
          console.log(err)
        }
      })
    }
    @ViewChild('updatemodal') updateView !: ElementRef
  openUpdate() {
    this.modalService.open(this.updateView, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  open(content: TemplateRef<any>) {
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
