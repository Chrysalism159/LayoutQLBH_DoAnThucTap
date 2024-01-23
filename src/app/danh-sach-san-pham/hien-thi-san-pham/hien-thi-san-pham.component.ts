import { Component } from '@angular/core';
import { SanPhamService } from '../../service/sanpham.service';

@Component({
  selector: 'app-hien-thi-san-pham',
  templateUrl: './hien-thi-san-pham.component.html',
  styles: ``
})
export class HienThiSanPhamComponent {
  imageBaseUrl= 'https://localhost:7219/Resources/'
  constructor(public service: SanPhamService)
  {
    
  }
}
