import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { KhachHangService } from './khachhang.service';
import { NhanVienService } from './nhanvien.service';
import { ChiTietHoaDon, HoaDon } from '../../model/hoadon.model';
import { PhieuNhapHang } from '../../model/phieuthanhtoan.model';
@Injectable({
  providedIn: 'root'
})
export class PhieuNhapHangService {
  
  urlPhieuNhapHang: string=environment.apiBaseUrl + 'PhieuNhapHang/'
  data: PhieuNhapHang = new PhieuNhapHang
  dsPhieu: PhieuNhapHang[] = []
  constructor(private http:HttpClient) { }
  
 
  danhsachPhieunhapHang()
  {
    return this.http.get(this.urlPhieuNhapHang + 'danhsach')
    .subscribe({
        next: res=> {
          console.log(res)
            this.dsPhieu =  res as PhieuNhapHang[]
        },
        error(err) {
          console.log(err)
        },
    })
  }
  makhachhang(ten: any, sdt:any){
    
  }
  manhanvien(email:any)
  {
    
  }
  themHoaDon()
  {
    
  }
  
}
