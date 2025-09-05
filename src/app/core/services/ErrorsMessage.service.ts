import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsMessageService {
  public errorMessage = new BehaviorSubject<any>(null);

  // call it if validated another emission
  updateErrorMsg(msg:any) {
    this.errorMessage.next(msg);
  }
}
