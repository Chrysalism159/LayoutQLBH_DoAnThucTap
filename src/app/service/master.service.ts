import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  imageBaseUrl = 'https://localhost:5000/Resources/'
  private dsspSubject = new BehaviorSubject<any[]>([]);
  dssp$ = this.dsspSubject.asObservable();
  dshd$ = this.dsspSubject.asObservable();
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();



  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



  setData(data: any) {
    this.dataSubject.next(data);
  }
  updateDssp(newDssp: any[]) {
    this.dsspSubject.next(newDssp);
  }
  updateDshd(newDssp: any[]) {
    this.dsspSubject.next(newDssp);
  }
}

