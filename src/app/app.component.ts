import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbSlideEvent, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from './service/master.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnDestroy {
	title = 'QuanLyBanHangLayout';
	number: number=0
	private subscription: Subscription = new Subscription;

	isTrangChuVisible: boolean = true;

	constructor(private router: Router, private master: MasterService) {
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
