import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { DangNhap, TaiKhoanXacThuc } from '../../model/taikhoan.model';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import  * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class XacThucService {
  constructor(private http:HttpClient, private jwtHelper: JwtHelperService){}
  loginUrl: string = environment.apiBaseUrl + 'TaiKhoan'
  taikhoanUrl: string = environment.apiBaseUrl + 'TaiKhoanNhanVien/timtheoten/'
  taikhoan: DangNhap = new DangNhap()
  account: TaiKhoanXacThuc=new TaiKhoanXacThuc
 
  
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
  // dangnhap(){
  //   this.http.post(`${this.loginUrl}/dangnhap/DangNhap`, this.account)
  //   .subscribe((res:any)=>{
  //     if(res.MaTrangThai === 1)
  //     {
  //       alert("Login Successfull")
  //       localStorage.setItem("loginToken", res.ThongBao)
  //       console.log(localStorage.getItem("loginToken"))
  //     }
  //   })
  // }
  getRoles(): string[] {
    debugger
    const token = localStorage.getItem('loginToken');
    if (token) {
      const decryptToken = this.jwtHelper.decodeToken(token);
      return decryptToken['roles'] || [];
    }
    return [];
  }
  
}