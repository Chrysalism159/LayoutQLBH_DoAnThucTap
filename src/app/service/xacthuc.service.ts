import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DangNhap, TaiKhoanXacThuc } from '../../model/taikhoan.model';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class XacThucService {
  constructor(private http:HttpClient, private jwtHelper: JwtHelperService){}
  loginUrl: string = environment.apiBaseUrl + 'TaiKhoan'
  taikhoanUrl: string = environment.apiBaseUrl + 'TaiKhoanNhanVien/timtheoten/'
  taikhoan: DangNhap = new DangNhap()
  account: TaiKhoanXacThuc=new TaiKhoanXacThuc
 
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
  getRoles(): string[] {
    const token = localStorage.getItem('loginToken');
    if (token) {
      const decryptToken = this.jwtHelper.decodeToken(token);
      return decryptToken['roles'] || [];
    }
    return [];
  }
}