import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { DangKiTaiKhoanComponent } from './dang-ki-tai-khoan/dang-ki-tai-khoan.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DanhSachNguoiDungComponent } from './danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { DanhSachSanPhamComponent } from './danh-sach-san-pham/danh-sach-san-pham.component';
// import { XacThucGuard } from './guard/xac-thuc.guard';
import { DanhSachNhanVienComponent } from './danh-sach-nhan-vien/danh-sach-nhan-vien.component';
import { ChiTietHoaDonComponent } from './trangchu/chi-tiet-hoa-don/chi-tiet-hoa-don.component';
import { QuanLyChiNhanhComponent } from './quan-ly-chi-nhanh/quan-ly-chi-nhanh.component';
import { QuanLyNhaCungCapComponent } from './quan-ly-nha-cung-cap/quan-ly-nha-cung-cap.component';
import { QuanLyChiTieuComponent } from './quan-ly-chi-tieu/quan-ly-chi-tieu.component';
import { QuanLyHoaDonComponent } from './quan-ly-hoa-don/quan-ly-hoa-don.component';
import { ChanTruyCapComponent } from './chan-truy-cap/chan-truy-cap.component';

const routes: Routes = [
  {component:DangNhapComponent,path:''},
  {component:DangKiTaiKhoanComponent,path:'dang-ki'},
  {component: ChanTruyCapComponent, path:'chan-truy-cap'},
  {component:TrangchuComponent,path:'trang-chu'},
  {component:DanhSachNguoiDungComponent,path:'tai-khoan-khach-hang'},
  {component:DanhSachSanPhamComponent,path:'san-pham'},
  {component:DanhSachNhanVienComponent,path:'nhan-vien'},
  {component:ChiTietHoaDonComponent,path:'chi-tiet-hoa-don'},
  {component:QuanLyChiNhanhComponent,path:'chi-nhanh'},
  {component:QuanLyNhaCungCapComponent,path:'nha-cung-cap'},
  {component:QuanLyChiTieuComponent,path:'chi-tieu'},
  {component:QuanLyHoaDonComponent,path:'hoa-don'},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//,canActivate:[XacThucGuard]