import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit ,ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { SanPhamService } from '../service/sanpham.service';
import { SanPham } from '../../model/sanpham.model';
import { MasterService } from '../service/master.service';
import { ChiTietHoaDon, GioHang } from '../../model/hoadon.model';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styles: ``
})
export class TrangchuComponent implements OnInit{
  constructor(public service:SanPhamService, private modalService: NgbModal, public master: MasterService)
  {

  }
  // @Output() dataEvent = new EventEmitter<any>();
  images = [
    'assets/bannerImg/2.jpg',
    'assets/bannerImg/3.jpg',
    'assets/bannerImg/4.jpg'
  ]
  linkanh: string =" "
  closeResult= " "
  sanpham: SanPham = new SanPham()
  sptrongHD: ChiTietHoaDon= new ChiTietHoaDon()
  dshd: ChiTietHoaDon[] =[]
  giohang: GioHang[] = []
  sanphamtrongGioHang: GioHang = new GioHang
  dssp: SanPham[] =[]
  
  imgurl = this.master.imageBaseUrl
  number: number=0
	modal:NgbModal = new NgbModal
  
  ngOnInit(): void {
    this.service.danhsachSanpham()
    this.service.danhsachHinhanh()
  }
  themvaogiohang(id:any)
  {
    this.sanpham = new SanPham()
    this.sanphamtrongGioHang = new GioHang
    this.service.timsanphamBangid(id)
    .subscribe({
      next: res=>{
        this.sanpham = res as SanPham
        this.dssp.push(this.sanpham)
        this.sanphamtrongGioHang.idsanPham = this.sanpham.idsanPham
        this.sanphamtrongGioHang.tenSanPham = this.sanpham.tenSanPham
        this.sanphamtrongGioHang.thanhTien = this.sanpham.giaBan
        this.sanphamtrongGioHang.idanh = this.sanpham.idanh
        this.sanphamtrongGioHang.giaBan = this.sanpham.giaBan
        this.sanphamtrongGioHang.soLuong = 1
        this.giohang.push(this.sanphamtrongGioHang)
        this.number = this.giohang.length
        this.master.setData(this.number)
        this.master.updateDshd(this.giohang)
      }
    })
    this.modal.dismissAll()
    console.log(this.giohang)
    console.log(this.dssp)
    
  }
  chitiethinhanh(code:any)
  {
    this.open()
    this.service.timsanphamBangid(code)
    .subscribe({
      next: res=>
      {
        console.log(res)
        this.sanpham = res as SanPham;
      }
    })
  }
  
  @ViewChild('content') addview !: ElementRef
  open() {
    this.modalService.open(this.addview, { centered:true}).result.then(
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



