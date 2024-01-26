import { KhachHangService } from '../service/khachhang.service'; 
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import {  FormGroup, NgForm } from "@angular/forms";
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';
import { KhachHang } from '../../model/khachhang.model';

@Component({
  selector: 'app-quan-ly-chi-tieu',
  templateUrl: './quan-ly-chi-tieu.component.html',
  styles: ``
})
export class QuanLyChiTieuComponent implements OnInit {




  closeResult = '';
  selectedValue:string=" "
  guidId: string=" "
  GenderSelected: boolean= true
  minDate: Date= new Date (1960, 1,1)
  maxDate: Date= new Date(2000,1,1)
  NgaySinh: Date= new Date(1960,1,1)
  id: any
  gioitinhNu:string="Nữ"
  gioitinhNam:string="Nam"
  khachhang: KhachHang = new KhachHang()
  private modalService = inject(NgbModal);
  constructor(public service: KhachHangService, private toastr: ToastrService, public master: MasterService)
  {
    this.selectedValue = '';
    this.maxDate = new Date()
  }

generateGuid() {
  this.guidId = this.master.createGuid();
}

  formLT!: FormGroup;

  ngOnInit(): void {
    
    this.service.danhsachKhachHang()
    this.service.danhsachLoaiThe()
  }
  onSubmit(form: NgForm) {
    this.service.dataKhachHang.idtheThanhVien = this.guidId
    this.service.dataKhachHang.idloaiThe = this.selectedValue
    this.service.dataKhachHang.gioiTinh = this.GenderSelected
    console.log(this.NgaySinh.toLocaleString())
    this.service.dataKhachHang.ngaySinh = this.NgaySinh.toLocaleString()
    console.log(this.service.dataKhachHang)
    this.service.themKhachHang().subscribe({
        next: res=>{
          console.log(this.selectedValue)
          this.service.danhsachKhachHang()
        },
        error: err=>{
          console.log(err)
        }
      })
    
  }
  enableBtnSave() {
    throw new Error('Method not implemented.');
  }

  checkImg() {
    throw new Error('Method not implemented.');
  }
  Delete(id:any) {
    this.openDel()
    this.id = id
  }
  Del() {
    console.log(this.id)
    this.service.xoaThongTinKhachHang(this.id)
      .subscribe({
        next: res => {
          this.toastr.success("Xóa thành công!")
          this.service.danhsachKhachHang()
        },
        error: err => {
          console.log(err)
        }
      })
    }
    onUpdate(form:NgForm)
    {
      console.log(this.khachhang.idtheThanhVien)
      console.log(this.khachhang)
      this.khachhang.ngaySinh = this.NgaySinh.toLocaleString()
      this.service.dataKhachHang.gioiTinh = this.GenderSelected
      this.service.dataKhachHang = this.khachhang
      console.log(this.service.dataKhachHang)
      this.service.capnhatKhachHang().subscribe({
        next: res=>{
          console.log(res)
          this.service.danhsachKhachHang()
          this.toastr.success("Cập nhật thông tin khách hàng thành công!", "")
        },
        error: err=>{
          console.log(err)
        }
      })
    }
    UpdateModal(code: any)
    {
      this.openUpdate()
      this.service.timkhachhangBangid(code)
      .subscribe({
        next: res=>{
          this.khachhang = res as KhachHang
          this.NgaySinh = new Date(this.khachhang.ngaySinh)
          console.log(this.NgaySinhFormat)
        },
        error: err=>{
          console.log(err)
        }
      })
    }
    get NgaySinhFormat(): string {
      // Chuyển đổi NgaySinh thành chuỗi định dạng 'yyyy-MM-dd'
      return format(this.NgaySinh, 'yyyy-MM-dd');
    }
  
    set NgaySinhFormat(value: string) {
      // Chuyển đổi chuỗi thành đối tượng Date
      this.NgaySinh = new Date(value);
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
