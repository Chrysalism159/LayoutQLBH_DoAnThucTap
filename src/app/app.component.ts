import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgbSlideEvent, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from './service/master.service';
import { XacThucService } from './service/xacthuc.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnDestroy {
	title = 'QuanLyBanHangLayout';
	number: number=0
	private subscription: Subscription = new Subscription;
	currentComponent: string = '';
	role!: boolean
	isTrangChuVisible: boolean = true;
	isEnable=true

	constructor(private router: Router, private master: MasterService, public xacthuc: XacThucService) {
		// Lắng nghe sự kiện NavigationStart để kiểm soát hiển thị component
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				// Khi bắt đầu điều hướng, kiểm tra route và ẩn component nếu cần
				this.isTrangChuVisible = event.url === '/trang-chu'; // Thay '/trangchu' bằng route của trang chủ
				this.subscription = this.master.data$.subscribe((data) => {
					console.log(data)
					this.number = data;
				});
			}
		});
		this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    		).subscribe((event: NavigationEnd) => {
			this.currentComponent = this.extractComponentNameFromUrl(event.url);
			console.log("Component:",this.currentComponent)
		  console.log("Role:",this.role)
		  });

		  
	}
	logout()
	{
		this.router.navigate(['']);
	}


  private extractComponentNameFromUrl(url: string): string {
    // Phân tích URL để lấy tên component (điều này phụ thuộc vào cấu trúc URL của ứng dụng bạn)
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	private offcanvasService = inject(NgbOffcanvas);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case OffcanvasDismissReasons.ESC:
				return 'by pressing ESC';
			case OffcanvasDismissReasons.BACKDROP_CLICK:
				return 'by clicking on the backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
