import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { DangKiTaiKhoanComponent } from './dang-ki-tai-khoan/dang-ki-tai-khoan.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DanhSachNguoiDungComponent } from './danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { DanhSachSanPhamComponent } from './danh-sach-san-pham/danh-sach-san-pham.component';
import { xacThucGuard } from './guard/xac-thuc.guard';
import { DanhSachNhanVienComponent } from './danh-sach-nhan-vien/danh-sach-nhan-vien.component';
import { ChiTietHoaDonComponent } from './trangchu/chi-tiet-hoa-don/chi-tiet-hoa-don.component';
import { QuanLyChiNhanhComponent } from './quan-ly-chi-nhanh/quan-ly-chi-nhanh.component';
import { QuanLyNhaCungCapComponent } from './quan-ly-nha-cung-cap/quan-ly-nha-cung-cap.component';
import { QuanLyChiTieuComponent } from './quan-ly-chi-tieu/quan-ly-chi-tieu.component';
import { QuanLyHoaDonComponent } from './quan-ly-hoa-don/quan-ly-hoa-don.component';

const routes: Routes = [
  {component:DangNhapComponent,path:''},
  {component:DangKiTaiKhoanComponent,path:'dang-ki'},
  {component:TrangchuComponent,path:'trang-chu',canActivate:[xacThucGuard]},
  {component:DanhSachNguoiDungComponent,path:'tai-khoan-khach-hang',canActivate:[xacThucGuard]},
  {component:DanhSachSanPhamComponent,path:'san-pham',canActivate:[xacThucGuard]},
  {component:DanhSachNhanVienComponent,path:'nhan-vien',canActivate:[xacThucGuard]},
  {component:ChiTietHoaDonComponent,path:'chi-tiet-hoa-don',canActivate:[xacThucGuard]},
  {component:QuanLyChiNhanhComponent,path:'chi-nhanh',canActivate:[xacThucGuard]},
  {component:QuanLyNhaCungCapComponent,path:'nha-cung-cap',canActivate:[xacThucGuard]},
  {component:QuanLyChiTieuComponent,path:'chi-tieu',canActivate:[xacThucGuard]},
  {component:QuanLyHoaDonComponent,path:'hoa-don',canActivate:[xacThucGuard]},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
