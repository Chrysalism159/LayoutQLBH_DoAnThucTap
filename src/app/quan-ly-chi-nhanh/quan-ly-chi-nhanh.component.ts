import { ChiNhanhService } from '../service/chinhanh.service';
import { NgForm } from '@angular/forms';
import { ChiNhanh } from '../../model/chinhanh.model';
import { ModalDismissReasons, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-quan-ly-chi-nhanh',
  templateUrl: './quan-ly-chi-nhanh.component.html',
  styles: ``
})
export class QuanLyChiNhanhComponent implements OnInit {

  guidId: any;
  chinhanh: ChiNhanh = new ChiNhanh
  private modalService = inject(NgbModal);
  closeResult!: any
  modal:NgbModal = new NgbModal
  constructor(public service: ChiNhanhService, private toastr: ToastrService, private master: MasterService){}

  ngOnInit(): void {
    this.service.danhsachChiNhanh()
  }

  UpdateModal(code: any) {
    this.openUpdate()
    this.service.timthongtinchinhanhbangId(code)
    .subscribe({
      next: res=>{
        
        this.chinhanh= res as ChiNhanh
        console.log(code)
        console.log(this.chinhanh)
      }
    })
    }
  onUpdate(_t97: NgForm) {
  this.service.data = this.chinhanh
  this.service.suathongtinChiNhanh(this.chinhanh.idchiNhanh)
  .subscribe({
    next: res=>{
      console.log(res)
      this.toastr.success("Cập nhật thông tin thành công!")
      this.service.danhsachChiNhanh()
      this.modal.dismissAll

    }
  })
  }
  onSubmit(_t31: NgForm) {
    this.service.data.idchiNhanh = this.guidId
    this.service.themthongtinChiNhanh()
    .subscribe({
      next: res=>{
        this.toastr.success("Thêm thông tin thành công!")
        this.service.danhsachChiNhanh()
        this.modal.dismissAll
      }
    })
  }
  Delete(code: any) {
    this.openDel()
    this.guidId = code
  }
  Del() {
  this.service.xoaThongtinChiNhanh(this.guidId)
  .subscribe({
    next: res=>{
      this.toastr.success("Xóa thông tin thành công!")
      this.service.danhsachChiNhanh()
      this.modal.dismissAll
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
