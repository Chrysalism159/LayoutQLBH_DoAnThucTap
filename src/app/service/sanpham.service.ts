import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HinhAnh, SanPham } from '../../model/sanpham.model';
import { NgForm } from '@angular/forms';
import { KhachHang } from '../../model/khachhang.model';
@Injectable({
  providedIn: 'root'
})
export class SanPhamService {
  resetForm(form: NgForm) {
    throw new Error('Method not implemented.');
  }
  urlSanPham:string = environment.apiBaseUrl + 'SanPham'
  urlHinhanh: string = environment.apiBaseUrl + 'QuanLyAnh'
  ds: SanPham[] = []
  img_ds: HinhAnh[] = []
  formSubmitted: boolean= false;
  formData: SanPham = new SanPham()
  imgdata: HinhAnh = new HinhAnh()
  
  constructor(private http:HttpClient) { }

 
  danhsachSanpham(){
    this.http.get(this.urlSanPham + '/danhsach').subscribe({
      next: res=>{
        console.log(res)
        this.ds = res as SanPham[]
      },
      error(err) {
        console.log(err)
      },
  
    })
  }
  danhsachHinhanh(){
    this.http.get(this.urlHinhanh).subscribe({
      next: res=>{
        console.log(res)
        this.img_ds = res as HinhAnh[]
      },
      error(err) {
        console.log(err)
      },
  
    })
  }
  themSanpham()
  {
    return this.http.post(this.urlSanPham + '/themthongtin', this.formData)
  }
  capnhatSanpham()
  {
    return this.http.put(this.urlSanPham + '/capnhatthongtin/' + this.formData.idsanPham, this.formData)
  }
  xoaSanpham(code:any)
  {
    return this.http.delete(this.urlSanPham + '/xoathongtin/'+ code)
  }
  timsanphamBangid(code:any)
  {
    console.log(this.urlSanPham+ '/timtheoid/' + code)
    return this.http.get(this.urlSanPham + '/timtheoid/' + code)
  }
  themHinhanh(data: HinhAnh)
  {
    let imgData = new FormData();
    imgData.append("idanh", data.idanh)
    imgData.append("file", data.file??"")
    return this.http.post(this.urlHinhanh , imgData)
  }
  capnhatHinhanh(id:any,data: HinhAnh)
  {
    let imgData = new FormData();
    imgData.append("idanh", data.idanh)
    imgData.append("file", data.file??"")
    return this.http.put(this.urlHinhanh +'/'+ id, imgData)
  }
}
