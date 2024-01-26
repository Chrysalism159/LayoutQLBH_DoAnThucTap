import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HinhAnh, SanPham } from '../../model/sanpham.model';
import { NgForm } from '@angular/forms';
import { Diem, KhachHang, LoaiThe } from '../../model/khachhang.model';
@Injectable({
  providedIn: 'root'
})
export class KhachHangService {
  
  urlKhachHang:string = environment.apiBaseUrl + 'TheKhachHang'
  urlLoaiThe: string = environment.apiBaseUrl + 'LoaiThe'
  ttdiem: Diem = new Diem
  loaiTheList: LoaiThe[] = []
  dskh: KhachHang[] = []
  dataKhachHang: KhachHang = new KhachHang()
  dataLoaiThe: LoaiThe = new LoaiThe()
  chietkhau: number = 0.00
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
  capnhatdiemtichluy(code:any)
  {
    return this.http.patch(this.urlKhachHang+'/capnhatdiem/' + code, this.ttdiem)
  }
  xoaThongTinKhachHang(code:any)
  {
    return this.http.delete(this.urlKhachHang + '/xoathongtin/' + code)
  }
  timkhachhangBangid(code:any)
  {
    return this.http.get(this.urlKhachHang + '/TimTheoID/'+code)
    
    
  }
  timtheKHbangID(code:any)
  {
    return this.http.get(this.urlLoaiThe+ '/TimTheoID/'+code)
    .subscribe((res:any)=>{
      if(res.tenLoaiThe==="Thẻ vàng")
        this.chietkhau=0.2
      else if(res.tenLoaiThe==="Thẻ bạc")
        this.chietkhau=0.1
      else if(res.tenLoaiThe==="Thẻ bạch kim")
        this.chietkhau=0.3
      else
        this.chietkhau=0.05
    })
  }
  resetForm(form: NgForm) {
    throw new Error('Method not implemented.');
  }
}
