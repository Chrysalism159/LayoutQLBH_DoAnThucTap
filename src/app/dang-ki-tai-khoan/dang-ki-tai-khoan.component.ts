import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { XacThucService } from '../service/xacthuc.service';

@Component({
  selector: 'app-dang-ki-tai-khoan',
  templateUrl: './dang-ki-tai-khoan.component.html',
  styles: ``
})
export class DangKiTaiKhoanComponent {

  constructor(private builder:FormBuilder, private toastr : ToastrService, private service : XacThucService)
    // , private route : Route
  {

  }
  registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  })
  proceedregister() {
    // if (this.registerForm.valid) {
    //   this.service.RegisterUser(this.registerForm.value).subscribe(result => {
    //     this.toastr.success('Please contact admin for enable access.','Registered successfully')
    //     this.route.navigate(['login'])
    //   });
    // } else {
    //   this.toastr.warning('Please enter valid data.')
    // }
  }
}
