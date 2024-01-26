import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject, TemplateRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
import * as pdfMake from 'pdfmake/build/pdfMake'
import { PhieuNhapHangService } from '../../service/phieunhaphang.service';
import { KhachHangService } from '../../service/khachhang.service';
import { format } from 'date-fns';
import { NgxPrintService, PrintOptions } from 'ngx-print';


// (pdfMake as any).vfs = pdfFont.pdfMake.vfs
@Component({
  selector: 'app-chi-tiet-hoa-don',
  templateUrl: './chi-tiet-hoa-don.component.html',
  styleUrls: ['./chi-tiet-hoa-don.component.css']
})
export class ChiTietHoaDonComponent implements OnInit {


  constructor(public service: HoaDonService, protected master: MasterService, public sp: SanPhamService,
     public cn: NhanVienService,public kh:KhachHangService,
    private toastr: ToastrService, public pnh: PhieuNhapHangService,
    private printService: NgxPrintService, private renderer: Renderer2) {

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
  ngaylaphoadon: Date = new Date()
  ngaysinh: Date = new Date(1960,1,1)
  makh: string = ""
  manv: string = ""
  masp: string = ""
  mahd: string = ""
  mapnh: string = ""
  closeResult: string = " "
  isEnable: boolean = true
  isCTHDEnable: boolean = false
  @ViewChild('invoiceContent') invoiceContent!: ElementRef;
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
  tinhTongtienhoadon(id:any)
  {
    this.tongtien = 0
    this.number =0 
    for (let i = 0; i < this.dsgiohang.length; i++) {
      if (this.dsgiohang[i].idsanPham == id) {
        this.dsgiohang[i].thanhTien = this.dsgiohang[i].giaBan * this.dsgiohang[i].soLuong
      }
      this.tongtien += this.dsgiohang[i].thanhTien
      this.number += this.dsgiohang[i].soLuong 
    }
    this.master.setData(this.number)
  }
  themsanpham(id: any) {
   
    for (let i = 0; i < this.dsgiohang.length; i++) {
      if (this.dsgiohang[i].idsanPham == id) {
        this.dsgiohang[i].soLuong++
      }
    }
    this.tinhTongtienhoadon(id)
  }
  bosanpham(id: any) {
    for (let i = 0; i < this.dsgiohang.length; i++) {
      if (this.dsgiohang[i].idsanPham == id) 
        this.dsgiohang[i].soLuong--     
    }
    this.tinhTongtienhoadon(id)
  }
  Remove(code: any) {
    this.number =0 
    const index = this.dsgiohang.findIndex(item => item.idsanPham === code);
    if (index !== -1) {
      this.dsgiohang.splice(index, 1);
      this.tinhTongtienhoadon(code)
    }

  }
  LayMaKH() {
    this.service.makhachhang(this.khachhang.tenKhachHang, this.khachhang.sdt)
      .subscribe({
        next: res => {
          this.khachhang = res as KhachHang
          this.makh = this.khachhang.idtheThanhVien
          this.kh.timtheKHbangID(this.khachhang.idloaiThe)
          this.chitiethoadon.chietKhau = this.kh.chietkhau
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
  CapNhatChiTietHoaDon()
  {
    // debugger
    for (let i = 0; i < this.dsgiohang.length; i++) {
      this.chitiethoadon.idchiTietHoaDon = this.master.createGuid()
      this.chitiethoadon.idhoaDon = this.mahd
      this.chitiethoadon.idsanPham = this.dsgiohang[i].idsanPham
      this.chitiethoadon.soLuong = this.dsgiohang[i].soLuong
      this.chitiethoadon.dongia = this.dsgiohang[i].giaBan
      this.chitiethoadon.thanhTien = this.dsgiohang[i].thanhTien
      this.service.cthd = this.chitiethoadon
      this.service.themChitietHD()
      .subscribe({
        next: res=>{
          this.toastr.success("Tạo hóa đơn thành công!")
        }
      })
      this.sp.timsanphamBangid(this.dsgiohang[i].idsanPham)
      .subscribe((res:any)=>
      {
        this.sp.formData = res
        this.sp.formData.soLuongHienCo -= this.dsgiohang[i].soLuong
        this.sp.capnhatSanpham()
        .subscribe((tt:any)=>{
          console.log("CapNhatLaiSoLuongSanPham: ", tt.thongbao)
        })
      })
    }
  }
  
  InHoaDon(){
    this.HienThihoadon()
  }
  @ViewChild('inhoadon') inhoadon !: ElementRef
  HienThihoadon() {
    this.modalService.open(this.inhoadon, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  @ViewChild('hiddenDiv') hiddenDiv!: ElementRef;
  printHiddenDiv() {
    // Hiển thị temporaryDiv
    this.hiddenDiv.nativeElement.style.display = 'block';

    // In nội dung của temporaryDiv
    this.printService.print({
      data: this.hiddenDiv.nativeElement,
      style: `
        /* Thêm các kiểu tùy chỉnh cho việc in ấn ở đây */
        body { font-size: 12px; }
        /* ... các kiểu khác */
      `,
    } as unknown as PrintOptions);

    // Ẩn lại temporaryDiv sau khi in
    this.hiddenDiv.nativeElement.style.display = 'none';
  }
  CapNhatDiemTichLuyKhachHang()
  {
    this.kh.timkhachhangBangid(this.makh)
    .subscribe((res:any)=>{
      this.khachhang = res 
      this.kh.ttdiem.soDiemTichLuy = this.hoadon.soTienKhachTra/1000
      this.kh.ttdiem.soDiemTichLuy = this.chitiethoadon.chietKhau
      this.kh.ttdiem.soTienDaTichLuy = (this.hoadon.soTienKhachTra/1000 ) *10
      this.kh.capnhatdiemtichluy(this.makh)
      .subscribe((res:any)=>{
        console.log("CapNhatLaiDiemKhachHang",res.thongBao)
      })
    }
    )
    
  }
  TaoHoaDon() {
    this.hoadon.idhoaDon = this.mahd
    this.hoadon.idtheThanhVien = this.makh
    this.ngaylaphoadon = new Date()
    this.hoadon.ngayLapHoaDon = this.NgayLapHoaDonFormat
    this.hoadon.tongTienSauChietKhau = this.tongtien *(1-  this.chitiethoadon.chietKhau)
    this.hoadon.soTienKhachTra = this.tongtien
    if (this.hoadon.soTienKhachTra < this.tongtien) {
      this.toastr.error("Số tiền khách trả không đủ!")
    }
    else {
      this.service.data = this.hoadon
      this.service.themHoaDon()
        .subscribe({
          next: res => {
            this.CapNhatChiTietHoaDon()
            this.toastr.success("Tạo hóa đơn thành công!")
            this.isCTHDEnable = true
            
            this.modalService.dismissAll()
          }
        })
      this.CapNhatDiemTichLuyKhachHang()
    }
    console.log(this.hoadon)
  }

  get NgayLapHoaDonFormat(): string {
    // Chuyển đổi NgaySinh thành chuỗi định dạng 'yyyy-MM-dd'
    return format(this.ngaylaphoadon, 'yyyy-MM-dd');
  }

  set NgayLapHoaDonFormat(value: string) {
    // Chuyển đổi chuỗi thành đối tượng Date
    this.ngaylaphoadon = new Date(value);
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
