import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HinhAnh, SanPham } from '../../model/sanpham.model';
import { NgForm } from '@angular/forms';
import { KhachHang, LoaiThe } from '../../model/khachhang.model';
import { NhanVien } from '../../model/nhanvien.model';
import { ChiNhanh } from '../../model/chinhanh.model';
import { DangNhap } from '../../model/taikhoan.model';
@Injectable({
  providedIn: 'root'
})
export class NhanVienService {
  
  urlNhanVien:string = environment.apiBaseUrl + 'nhanvien'
  urlChiNhanh: string = environment.apiBaseUrl + 'chinhanh'
  taikhoanUrl: string = environment.apiBaseUrl + 'TaiKhoanNhanVien'
  dsTaiKhoan: DangNhap[]=[]
  dsChiNhanh: ChiNhanh[] = []
  dsnv: NhanVien[] = []
  dataNhanVien: NhanVien = new NhanVien()
  ttchiNhanh: ChiNhanh = new ChiNhanh()
  constructor(private http:HttpClient) { }

 
  danhsachNhanVien(){
    this.http.get(this.urlNhanVien + '/danhsach').subscribe({
      next: res=>{
        console.log(res)
        this.dsnv = res as NhanVien[]
      },
      error(err) {
        console.log(err)
      },
  
    })
  }
  danhsachChiNhanh(){
    this.http.get(this.urlChiNhanh + '/danhsach').subscribe({
      next: res=>{
        console.log(res)
        this.dsChiNhanh = res as ChiNhanh[]
      },
      error(err) {
        console.log(err)
      },
  
    })
  }
  danhsachTaikhoan(){
    this.http.get(this.taikhoanUrl + '/danhsach').subscribe({
      next: res=>{
        console.log(res)
        this.dsTaiKhoan = res as DangNhap[]
      },
      error(err) {
        console.log(err)
      },
  
    })
  }
  themNhanvien()
  {
    console.log(this.dataNhanVien)
    return this.http.post(this.urlNhanVien + '/themthongtin', this.dataNhanVien)
  }
  capnhatNhanvien()
  {
    return this.http.put(this.urlNhanVien + '/capnhatthongtin/' + this.dataNhanVien.idnhanVien, this.dataNhanVien)
  }
  xoaThongTinNhanvien(code:any)
  {
    return this.http.delete(this.urlNhanVien + '/xoathongtin/' + code)
  }
  timNhanvienBangid(code:any)
  {
    return this.http.get(this.urlNhanVien + '/TimTheoID/'+code)
  }
  resetForm(form: NgForm) {
    throw new Error('Method not implemented.');
  }
}
