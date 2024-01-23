import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NhaCungCap } from '../../model/nhacungcap.model';
@Injectable({
  providedIn: 'root'
})
export class NhaCungCapService {
  
  urlNhacungcap: string=environment.apiBaseUrl + 'nhacungcap'
  data: NhaCungCap = new NhaCungCap
  dsncc: NhaCungCap[] = []
  constructor(private http:HttpClient) { }

 
  danhsachNhaCungCap()
  {
    return this.http.get(this.urlNhacungcap + '/danhsach')
    .subscribe({
        next: res=>{
            this.dsncc = res as NhaCungCap[]
        },
        error: err=>{
            console.log(err)
        }
    })
  }
  themthongtinNhaCungCap()
  {
    return this.http.post(this.urlNhacungcap + '/themthongtin', this.data)
  }
  suathongtinNhaCungCap(code: any)
  {
    return this.http.put(this.urlNhacungcap + '/capnhatthongtin/'+ code, this.data)
  }
  xoaThongtinNhaCungCap(code:any)
  {
    return this.http.delete(this.urlNhacungcap + '/xoathongtin/'+code)
  }
  timThongtinbangID(code:any)
  {
    return this.http.get(this.urlNhacungcap + '/timtheoID/'+code)
  }
}
