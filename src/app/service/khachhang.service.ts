import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HinhAnh, SanPham } from '../../model/sanpham.model';
import { NgForm } from '@angular/forms';
import { KhachHang, LoaiThe } from '../../model/khachhang.model';
@Injectable({
  providedIn: 'root'
})
export class KhachHangService {
  
  urlKhachHang:string = environment.apiBaseUrl + 'TheKhachHang'
  urlLoaiThe: string = environment.apiBaseUrl + 'LoaiThe'
  
  loaiTheList: LoaiThe[] = []
  dskh: KhachHang[] = []
  dataKhachHang: KhachHang = new KhachHang()
  dataLoaiThe: LoaiThe = new LoaiThe()
  constructor(private http:HttpClient) { }

 
  danhsachKhachHang(){
    this.http.get(this.urlKhachHang + '/danhsach').subscribe({
      next: res=>{
        console.log(res)
        this.dskh = res as KhachHang[]
      },
      error(err) {
        console.log(err)
      },
  
    })
  }
  danhsachLoaiThe(){
    this.http.get(this.urlLoaiThe + '/danhsach').subscribe({
      next: res=>{
        console.log(res)
        this.loaiTheList = res as LoaiThe[]
      },
      error(err) {
        console.log(err)
      },
  
    })
  }
  themKhachHang()
  {
    return this.http.post(this.urlKhachHang + '/themthongtin', this.dataKhachHang)
  }
  capnhatKhachHang()
  {
    return this.http.put(this.urlKhachHang + '/capnhatthongtin/' + this.dataKhachHang.idtheThanhVien, this.dataKhachHang)
  }
  xoaThongTinKhachHang(code:any)
  {
    return this.http.delete(this.urlKhachHang + '/xoathongtin/' + code)
  }
  timkhachhangBangid(code:any)
  {
    return this.http.get(this.urlKhachHang + '/TimTheoID/'+code)
  }
  resetForm(form: NgForm) {
    throw new Error('Method not implemented.');
  }
}
