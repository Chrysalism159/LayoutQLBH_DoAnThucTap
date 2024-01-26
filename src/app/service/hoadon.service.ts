import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { KhachHangService } from './khachhang.service';
import { NhanVienService } from './nhanvien.service';
import { ChiTietHoaDon, HoaDon } from '../../model/hoadon.model';
@Injectable({
  providedIn: 'root'
})
export class HoaDonService {
  
  urlHoaDon: string=environment.apiBaseUrl + 'hoadon'
  urlCTHoaDon: string=environment.apiBaseUrl + 'chitiethoadon'
  data: HoaDon = new HoaDon
  cthd: ChiTietHoaDon = new ChiTietHoaDon()
  dshd: HoaDon[] = []
  dscthd: ChiTietHoaDon[] = []
  constructor(private http:HttpClient, private khachhang: KhachHangService, private nhanvien: NhanVienService) { }

 
  danhsachHoadon()
  {
    return this.http.get(this.urlHoaDon)
    .subscribe({
      next: res=>{
        this.dshd = res as HoaDon[]
        console.log(this.dshd)
      }
    })
  }
  danhsachCTHD()
  {
    return this.http.get(this.urlCTHoaDon)
    .subscribe({
      next: res=>{
        this.dscthd = res as ChiTietHoaDon[]
        console.log(this.dscthd)
      }
    })
  }
  timDSCTHDtheoHD(code:any)
  {
    console.log(this.urlCTHoaDon+"/TimTheoIDHoaDon/" + code)
    return this.http.get(this.urlCTHoaDon+"/TimTheoIDHoaDon/" + code )
    
  }
  xoahoaDon(code:any)
  {
    return this.http.delete(this.urlHoaDon +'/'+code)
  }
  xoaCThoaDon(code:any)
  {
    return this.http.delete(this.urlCTHoaDon +'/xoathongtin/'+code)
  }
  makhachhang(ten: any, sdt:any){
    return this.http.get(this.khachhang.urlKhachHang+'/laymakhachhang/' + ten +'/'+sdt , { params: { sdt: sdt } })
  }
  manhanvien(email:any)
  {
    return this.http.get(this.nhanvien.urlNhanVien + '/timidnhanvien/' + email)
  }
  themHoaDon()
  {
    return this.http.post(this.urlHoaDon,this.data)
  }
  themChitietHD()
  {
    return this.http.post(this.urlCTHoaDon +'/themthongtin/', this.cthd)
  }
  
}
