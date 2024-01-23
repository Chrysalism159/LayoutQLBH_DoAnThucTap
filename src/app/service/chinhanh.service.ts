import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { KhachHangService } from './khachhang.service';
import { NhanVienService } from './nhanvien.service';
import { ChiTietHoaDon, HoaDon } from '../../model/hoadon.model';
import { ChiNhanh } from '../../model/chinhanh.model';
@Injectable({
  providedIn: 'root'
})
export class ChiNhanhService {
  
  urlChinhanh: string=environment.apiBaseUrl + 'chinhanh'
  data: ChiNhanh = new ChiNhanh
  dscn: ChiNhanh[] = []
  constructor(private http:HttpClient) { }

 
  danhsachChiNhanh()
  {
    return this.http.get(this.urlChinhanh + '/danhsach')
    .subscribe({
        next: res=>{
            this.dscn = res as ChiNhanh[]
        },
        error: err=>{
            console.log(err)
        }
    })
  }
  themthongtinChiNhanh()
  {
    return this.http.post(this.urlChinhanh + '/themthongtin', this.data)
  }
  suathongtinChiNhanh(code: any)
  {
    return this.http.put(this.urlChinhanh + '/capnhatthongtin/'+ code, this.data)
  }
  xoaThongtinChiNhanh(code:any)
  {
    return this.http.delete(this.urlChinhanh + '/xoathongtin/'+code)
  }
  timthongtinchinhanhbangId(code:any)
  {
    console.log(this.urlChinhanh + '/timtheoid/'+code)
    return this.http.get(this.urlChinhanh + '/timtheoid/'+code)
  }
}
