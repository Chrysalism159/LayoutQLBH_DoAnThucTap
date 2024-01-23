import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DangNhap } from '../../model/taikhoan.model';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class XacThucService {
  constructor(private http:HttpClient){}
  loginUrl: string = environment.apiBaseUrl + 'TaiKhoan/SignUpAsync'
  taikhoanUrl: string = environment.apiBaseUrl + 'TaiKhoanNhanVien/timtheoten/'
  taikhoan: DangNhap = new DangNhap()
  isLogIn= false
  
  SignInAccount(data:any)
  {
    console.log('Request URL:', this.loginUrl);
  console.log('Request Data:', this.taikhoan); 
    return this.http.post<any>(this.loginUrl, data)
  }
  timtaikhoantheoten()
  {
    return this.http.get(this.taikhoanUrl + this.taikhoan.tenNguoiDung)
    
  }
  getRole(): Observable<string> {
    // Assuming this.taikhoanUrl and this.taikhoan are class properties
  
    // Make the HTTP request and return an Observable
    return this.http.get<DangNhap>(this.taikhoanUrl + this.taikhoan.tenNguoiDung)
      .pipe(
        map((res: DangNhap) => {
          this.taikhoan = res;
          return this.taikhoan.phanQuyen;
        })
      );
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}