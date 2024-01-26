import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
import { SanPhamService } from '../service/sanpham.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HinhAnh, SanPham } from '../../model/sanpham.model';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-danh-sach-san-pham',
  templateUrl: './danh-sach-san-pham.component.html',
  styles: ``
})
export class DanhSachSanPhamComponent implements OnInit {
  
  form!: FormGroup;
  isBtnEnable: boolean = false
  imgFile?: File
  formgr = new FormGroup({
    idanh: new FormControl(''),
    file: new FormControl(null)
  })
  formUpdate= new FormGroup({
    idanh: new FormControl(''),
    file: new FormControl(null)
  })
  guidsp: string = '';
  guidha: string = '';
  imgurl = this.master.imageBaseUrl
  sanpham: SanPham=new SanPham()
  hinhanh?:File
  imgSPmoi?: any
  constructor(public service: SanPhamService, public toastr: ToastrService, private fb: FormBuilder, public master: MasterService) {

  }
  

  generateGuid(){
    this.guidha = this.master.createGuid();
    this.guidsp =this.master.createGuid();
  }
  
  onSubmit(form: NgForm) {
    this.service.formData=this.sanpham
    this.service.formData.idsanPham = this.guidsp
    this.service.formData.idanh = this.guidha
    this.service.themSanpham().subscribe({
      next: res=>{
        console.log(res)
        this.service.danhsachSanpham()
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  onUpdateSubmit(form:NgForm)
  {
    console.log(this.sanpham.idsanPham)
    console.log(this.sanpham)
    this.service.formData = this.sanpham
    this.service.capnhatSanpham().subscribe({
      next: res=>{
        console.log(res)
        this.service.danhsachSanpham()
        this.service.danhsachHinhanh()
        this.toastr.success("Cập nhật sản phẩm thành công!", "")
      },
      error: err=>{
        console.log(err)
      }
    })
  }

  checkImg() {
    const frmData:HinhAnh= Object.assign(this.formgr.value);
      frmData.file=this.imgFile;
      console.log(this.imgFile)
      console.log(frmData)
    this.service.themHinhanh(frmData)
    .subscribe({
      next: res=>{
        
        this.toastr.success("Kiểm tra hình ảnh thành công!", "")
      },
      error: err=>{console.log(err)}
    })
  }
  UpdateImg(){
    const frmData:HinhAnh= Object.assign(this.formUpdate.value);
      frmData.file=this.imgFile;
      console.log(this.imgFile)
      console.log(frmData)
    this.service.capnhatHinhanh(frmData.idanh, frmData)
    .subscribe({
      next: res=>{
        
        this.toastr.success("Cập nhật hình ảnh thành công!", "")
      },
      error: err=>{console.log(err)}
    })
  }
  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      this.imgFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imgSPmoi = reader.result;
      };
      
    }
  }
  get f() {
    return this.form.controls;
  }

  IdSanPham: any
  Delete(id:any){
  this.openDel()
  this.IdSanPham = id
  }
  Del() {
    console.log(this.IdSanPham)
    this.service.xoaSanpham(this.IdSanPham)
      .subscribe({
        next: res => {
          this.toastr.success("Xóa thành công!")
          this.service.danhsachSanpham()
        },
        error: err => {
          console.log(err)
        }
      })
  }
 enableBtnSave()
 {
  this.isBtnEnable = true
 }
 UpdateModal(code: any)
 {
  this.openUpdate()
  this.service.timsanphamBangid(code)
  .subscribe({
    next: res=>{
      this.sanpham = res as SanPham
    },
    error: err=>{
      console.log(err)
    }
  })
 }

  ngOnInit(): void {
    this.form = this.fb.group({
      'idsanPham':[''],
      'idanh':[''],
      'tenSanPham':[''],
      'giaBan':[''],
      'giaVon':[''],
      'donVi':[''],
      'soLuongHienCo':[false],
      'ghiChu':['']
    })
    this.service.danhsachHinhanh()
    this.service.danhsachSanpham()
  }
  private modalService = inject(NgbModal);
  closeResult = '';
  @ViewChild('updatedata') updateView !: ElementRef
  openUpdate()
  {
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
    const modalservice = this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  closeModal()
  {
    
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
