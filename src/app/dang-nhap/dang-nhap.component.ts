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
       
        this.router.navigateByUrl('trang-chu')
        
      }
    })
  }
  
  
  
}
