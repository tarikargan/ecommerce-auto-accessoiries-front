import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  public Toast = new BehaviorSubject<Object>({show:false,data:{message:'',type:''}});  //type ==> ['success','warning','danger'];
  delay: number = 5;
  interval:any;

  constructor() { }

  //show toast method
  showToast(data:any){
    this.Toast.next({show:true,data:{message:data?.message,type: data.type}});

  }

  toastSuccess(message:string){
    this.toastSettings();
    this.Toast.next({show:true,
      data:{
        message: message,
        type: 'success'
      }});
  }

  toastError(message:string){
    this.toastSettings();
    this.Toast.next({show:true,
      data:{
        message: message,
        type: 'danger'
      }});
  }

  toastWarning(message:string){
    this.toastSettings();
    this.Toast.next({show:true,
      data:{
        message: message,
        type: 'warning'
      }});
  }

  // hide toast method
  hideToast(){
    this.Toast.next({show:false,data:{message:'',type: ''}});
    clearInterval(this.interval);
    this.delay = 5;
  }


  toastSettings(){
    this.hideToast();
    this.interval = setInterval(()=>{
        this.delay = this.delay - 1;
        //  console.log('this.delay',this.delay);

        if(this.delay == 0){
          clearInterval(this.interval);
          this.hideToast();
          this.delay = 5;
        }
    },1000);
  }
}
