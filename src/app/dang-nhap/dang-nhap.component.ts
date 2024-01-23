import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { XacThucService } from '../service/xacthuc.service';
import { DangNhap } from '../../model/taikhoan.model';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styles: ``
})
export class DangNhapComponent {

  constructor(public service: XacThucService, private builder: FormBuilder, private router: Router){}
  result: DangNhap = new DangNhap()
  login(){
    console.log(this.service.taikhoan)
    this.service.timtaikhoantheoten(this.service.taikhoan.tenNguoiDung)
    .subscribe({
      next: res => {
        this.result=res as DangNhap
        if(this.result.matKhau === this.service.taikhoan.matKhau)
        {
          sessionStorage.setItem('username',this.result.tenNguoiDung);
            sessionStorage.setItem('role',this.result.phanQuyen);
            this.router.navigate(['trang-chu']);
            console.log(sessionStorage)
        }
      },
      error: err => {
        console.log('Login failed:', err);
    }})
  }
}
