import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DangKiTaiKhoanComponent } from './dang-ki-tai-khoan/dang-ki-tai-khoan.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DanhSachNguoiDungComponent } from './danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { CapNhatTaiKhoanComponent } from './cap-nhat-tai-khoan/cap-nhat-tai-khoan.component';
import { DanhSachSanPhamComponent } from './danh-sach-san-pham/danh-sach-san-pham.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HienThiSanPhamComponent } from './danh-sach-san-pham/hien-thi-san-pham/hien-thi-san-pham.component';
import { DanhSachNhanVienComponent } from './danh-sach-nhan-vien/danh-sach-nhan-vien.component';
import { ChiTietHoaDonComponent } from './trangchu/chi-tiet-hoa-don/chi-tiet-hoa-don.component';
import { QuanLyHoaDonComponent } from './quan-ly-hoa-don/quan-ly-hoa-don.component';
import { QuanLyChiNhanhComponent } from './quan-ly-chi-nhanh/quan-ly-chi-nhanh.component';
import { QuanLyNhaCungCapComponent } from './quan-ly-nha-cung-cap/quan-ly-nha-cung-cap.component';
import { QuanLyChiTieuComponent } from './quan-ly-chi-tieu/quan-ly-chi-tieu.component';
@NgModule({
  declarations: [
    AppComponent,
    DangKiTaiKhoanComponent,
    DangNhapComponent,
    TrangchuComponent,
    DanhSachNguoiDungComponent,
    CapNhatTaiKhoanComponent,
    DanhSachSanPhamComponent,
    HienThiSanPhamComponent,
    DanhSachNhanVienComponent,
    ChiTietHoaDonComponent,
    QuanLyHoaDonComponent,
    QuanLyChiNhanhComponent,
    QuanLyNhaCungCapComponent,
    QuanLyChiTieuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
