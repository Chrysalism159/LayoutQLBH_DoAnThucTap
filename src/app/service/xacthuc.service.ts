import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DangNhap } from '../../model/taikhoan.model';
@Injectable({
  providedIn: 'root'
})
export class XacThucService {
  constructor(private http:HttpClient){}
  loginUrl: string = environment.apiBaseUrl + 'TaiKhoan/SignUpAsync'
  taikhoanUrl: string = environment.apiBaseUrl + 'TaiKhoanNhanVien/timtheoten/'
  taikhoan: DangNhap = new DangNhap()
  
  SignInAccount(data:any)
  {
    console.log('Request URL:', this.loginUrl);
  console.log('Request Data:', this.taikhoan); 
    return this.http.post<any>(this.loginUrl, data)
  }
  timtaikhoantheoten(email: any)
  {
    return this.http.get(this.taikhoanUrl + email)
  }
}