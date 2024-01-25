import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { XacThucService } from '../service/xacthuc.service';
import { DangNhap } from '../../model/taikhoan.model';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styles: ``
})
export class DangNhapComponent {

  constructor(public service: XacThucService, private builder: FormBuilder, private router: Router, private http: HttpClient){}
  result: DangNhap = new DangNhap()
  role: string[] = []
  login(){
    console.log(this.service.taikhoan)
    this.http.post('https://localhost:5000/api/TaiKhoan/dangnhap/DangNhap', this.service.account)
    .subscribe((res:any)=>{
      console.log(res)
      if(res.maTrangThai == 1)
      {
        alert("Login Successfull")
        localStorage.setItem("loginToken", res.thongBao)
        console.log("localStorage:",localStorage.getItem("loginToken"))
        this.role = this.service.getRoles()
        console.log(this.role)
        this.router.navigateByUrl('trang-chu')
        
      }
    })
    // this.service.dangnhap()
    // .subscribe(
    //   response => {
    //     // Successfully logged in
    //     console.log(response.access_token);

    //     // Save token to local storage
    //     // localStorage.setItem('access_token', response.access_token);

    //     // Redirect or perform other actions as needed
    //     // Example: Redirect to the home page
    //     this.router.navigate(['/home']);
    //   },
    //   error => {
    //     // Handle errors, show error messages, etc.
    //     console.error('Login failed', error);
    //   }
    // );
    // this.service.timtaikhoantheoten()
    // .subscribe({
    //   next: res => {
    //     this.result=res as DangNhap
    //     if(this.result.matKhau === this.service.taikhoan.matKhau)
    //     {
    //       sessionStorage.setItem('username',this.result.tenNguoiDung);
    //         sessionStorage.setItem('role',this.result.phanQuyen);
    //         this.router.navigate(['trang-chu']);
    //         this.service.isLogIn = true
    //         console.log(sessionStorage)
    //     }
    //   },
    //   error: err => {
    //     console.log('Login failed:', err);
    // }})
  }
  
  
  
}
