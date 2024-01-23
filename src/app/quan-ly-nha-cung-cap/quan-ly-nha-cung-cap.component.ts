import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';

import { NhaCungCapService } from '../service/nhacungcap.service';
import { NhaCungCap } from '../../model/nhacungcap.model';

@Component({
  selector: 'app-quan-ly-nha-cung-cap',
  templateUrl: './quan-ly-nha-cung-cap.component.html',
  styles: ``
})
export class QuanLyNhaCungCapComponent implements OnInit {

  guidId: any;
  nhacungcap: NhaCungCap = new NhaCungCap
  private modalService = inject(NgbModal);
  closeResult!: any
  modal:NgbModal = new NgbModal
  constructor(public service: NhaCungCapService, private toastr: ToastrService, private master: MasterService){}

  ngOnInit(): void {
    this.service.danhsachNhaCungCap()
  }

  UpdateModal(code: any) {
    this.openUpdate()
    this.service.timThongtinbangID(code)
    .subscribe({
      next: res=>{
        
        this.nhacungcap= res as NhaCungCap
        console.log(code)
        console.log("NCC: ",this.nhacungcap)
      }
    })
    }
  onUpdate(_t97: NgForm) {
  this.service.data = this.nhacungcap
  this.service.suathongtinNhaCungCap(this.nhacungcap.idnhaCungCap)
  .subscribe({
    next: res=>{
      console.log(res)
      this.toastr.success("Cập nhật thông tin thành công!")
      this.service.danhsachNhaCungCap()
      this.modal.dismissAll

    }
  })
  }
  onSubmit(_t31: NgForm) {
    this.service.data.idnhaCungCap = this.guidId
    this.service.themthongtinNhaCungCap()
    .subscribe({
      next: res=>{
        this.toastr.success("Thêm thông tin thành công!")
        this.service.danhsachNhaCungCap()
        this.modal.dismissAll
      }
    })
  }
  Delete(code: any) {
    this.openDel()
    this.guidId = code
  }
  Del(form: NgForm) {
  this.service.xoaThongtinNhaCungCap(this.guidId)
  .subscribe({
    next: res=>{
      this.toastr.success("Xóa thông tin thành công!")
      this.service.danhsachNhaCungCap()
      this.modal.dismissAll
      console.log(res)
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
