import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ChiTietHoaDon, GioHang, HoaDon } from '../../../model/hoadon.model';
import { KhachHang } from '../../../model/khachhang.model';
import { ChiNhanh } from '../../../model/chinhanh.model';
import { HoaDonService } from '../../service/hoadon.service';
import { NhanVien } from '../../../model/nhanvien.model';
import { MasterService } from '../../service/master.service';
import { SanPham } from '../../../model/sanpham.model';
import { SanPhamService } from '../../service/sanpham.service';
import { NhanVienService } from '../../service/nhanvien.service';
import { ToastrService } from 'ngx-toastr';
import { PhieuNhapHangService } from '../../service/phieunhaphang.service';

@Component({
  selector: 'app-chi-tiet-hoa-don',
  templateUrl: './chi-tiet-hoa-don.component.html',
  styleUrls: ['./chi-tiet-hoa-don.component.css']
})
export class ChiTietHoaDonComponent implements OnInit {


  constructor(public service: HoaDonService, protected master: MasterService, public sp: SanPhamService, public cn: NhanVienService,
    private toastr: ToastrService, public pnh: PhieuNhapHangService) {

  }
  soluong: number = 1;
  number: number = 0;
  tongtien: number = 0
  hoadon: HoaDon = new HoaDon()
  chitiethoadon: ChiTietHoaDon = new ChiTietHoaDon()
  khachhang: KhachHang = new KhachHang()
  nhanvien: NhanVien = new NhanVien()
  chinhanh: ChiNhanh = new ChiNhanh()
  sanpham: SanPham = new SanPham()
  dssp: SanPham[] = []
  dshd: ChiTietHoaDon[] = []
  dsgiohang: GioHang[] = []
  ngaylaphoadon: Date = new Date(1960, 1, 1)
  makh: string = ""
  manv: string = ""
  masp: string = ""
  mahd: string = ""
  mapnh: string = ""
  closeResult: string = " "
  isEnable: boolean = true
  isCTHDEnable: boolean = false

  private modalService = inject(NgbModal);

  open(content: TemplateRef<any>) {
    this.mahd = this.master.createGuid()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  ngOnInit(): void {
    this.master.dshd$.subscribe((data) => this.dsgiohang = data)
    if (this.dsgiohang.length == 0) this.isEnable = false
    for (let i = 0; i < this.dsgiohang.length; i++) {
      this.tongtien += this.dsgiohang[i].thanhTien
    }
    this.cn.danhsachChiNhanh()
    this.cn.danhsachNhanVien()
    this.pnh.danhsachPhieunhapHang()
    console.log("danh sach gio hang",this.dsgiohang)
    console.log("danh sach phieu nhap hang",this.pnh.dsPhieu)
  }
  tinhtien(count: number) {
    for (let i = 0; i < this.dshd.length; i++) {
      this.sp.timsanphamBangid(this.dshd[i].idsanPham)
        .subscribe({
          next: res => {
            this.sanpham = res as SanPham
            this.dshd[i].thanhTien = count * this.sanpham.giaBan
          }
        })
    }
  }
  themsanpham(id: any) {
    this.tongtien = 0
    for (let i = 0; i < this.dsgiohang.length; i++) {
      if (this.dsgiohang[i].idsanPham == id) {
        this.dsgiohang[i].soLuong++
        this.dsgiohang[i].thanhTien = this.dsgiohang[i].giaBan * this.dsgiohang[i].soLuong
      }
      this.tongtien += this.dsgiohang[i].thanhTien
    }
  }
  bosanpham(id: any) {
    this.tongtien = 0
    for (let i = 0; i < this.dsgiohang.length; i++) {

      if (this.dsgiohang[i].idsanPham == id) {
        this.dsgiohang[i].soLuong--
        this.dsgiohang[i].thanhTien = this.dsgiohang[i].giaBan * this.dsgiohang[i].soLuong
      }
      this.tongtien += this.dsgiohang[i].thanhTien
    }
  }
  Remove(code: any) {
    const index = this.dsgiohang.findIndex(item => item.idsanPham === code);
    if (index !== -1) {
      this.dsgiohang.splice(index, 1);

      this.number = this.dsgiohang.length
      this.master.setData(this.number)
    }

  }
  LayMaKH() {
    this.service.makhachhang(this.khachhang.tenKhachHang, this.khachhang.sdt)
      .subscribe({
        next: res => {
          this.khachhang = res as KhachHang
          this.makh = this.khachhang.idtheThanhVien
          console.log("Ma khach hang",this.makh)
        }, error: err => {
          console.log(err)
        }
      })
  }
  laymanv() {
    this.service.manhanvien(this.nhanvien.email)
      .subscribe({
        next: res => {
          this.nhanvien = res as NhanVien
          this.manv = this.nhanvien.idnhanVien
          console.log("Ma nhan vien",this.manv)
        }
      })
  }
  MaPNHang(){
    console.log(this.mapnh)
  }
  CapNhatChiTietHoaDon()
  {
    // debugger
    for (let i = 0; i < this.dsgiohang.length; i++) {
      // this.chitiethoadon = new ChiTietHoaDon()
      console.log(this.mapnh)
      this.chitiethoadon.idchiTietHoaDon = this.master.createGuid()
      this.chitiethoadon.idhoaDon = this.mahd
      this.chitiethoadon.idsanPham = this.dsgiohang[i].idsanPham
      this.chitiethoadon.soLuong = this.dsgiohang[i].soLuong
      this.chitiethoadon.dongia = this.dsgiohang[i].giaBan
      this.chitiethoadon.thanhTien = this.dsgiohang[i].thanhTien
      console.log(this.chitiethoadon)
      this.service.cthd = this.chitiethoadon
      this.service.themChitietHD()
      .subscribe({
        next: res=>{
          this.toastr.success("Tạo hóa đơn thành công!")
        }
      })
    }
  }
  InHoaDon(){
    if(this.isCTHDEnable == false)
    {
      this.toastr.show("Bạn chưa cập nhật thông tin hóa đơn!")
    }
    else{
      this.inhoadon()
    }
  }
  @ViewChild('inhoadon') child !: ElementRef
  inhoadon() {
    this.mahd = this.master.createGuid()
    this.modalService.open(this.child, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  TaoHoaDon() {
    this.LayMaKH()
    this.hoadon.idhoaDon = this.mahd
    this.hoadon.idtheThanhVien = this.makh
    this.hoadon.ngayLapHoaDon = this.ngaylaphoadon.toLocaleString()
    if (this.hoadon.soTienKhachTra < this.tongtien) {
      this.toastr.error("Số tiền khách trả không đủ!")
    }
    else {
      this.service.data = this.hoadon
      this.service.themHoaDon()
        .subscribe({
          next: res => {
            this.toastr.success("Tạo hóa đơn thành công!")
            this.isCTHDEnable = true
          }
        })
    }
    console.log(this.hoadon)


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
