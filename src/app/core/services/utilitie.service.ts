import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { delay, first, isObservable, of } from 'rxjs';
// import { DebugService } from './debug.service';
import { ViewportScroller } from '@angular/common';
import { DebugService } from './debug.service';

// Just a service giving access to all utility services (without the need of injecting them all)

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public randomColors: any[] = [];
  searchUsers:boolean = false;

  constructor(
    // public translate: TranslateService,
    public debug: DebugService,
    private scroll: ViewportScroller
  ) {
    // this.translate.instant("GENERAL.PMP");
    for (let i = 0; i < 1000; i++) {
      this.randomColors.push(this.randomColor());
    }
  }


  stopProp(e: { stopPropagation: () => void; }) {
    e.stopPropagation();
  }

  randomColor() {
    let color =
      "rgb(" +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      ")";
    return color;
  }





  deleteAsyncData(myObject: any) {
    for (var property in myObject) {
      if (
        myObject.hasOwnProperty(property) &&
        (isObservable(myObject[property]) || this.isPromise(myObject[property]))
      ) {
        delete myObject[property];
      }
      if (property.indexOf("async") > -1) {
        delete myObject[property];
      }
    }
    return myObject;
  }

  isPromise(p: any) {
    return p && Object.prototype.toString.call(p) === "[object Promise]";
  }

  truncateText(text: string, nmb = 40) {
    return text.length > nmb ? text.slice(0, nmb) + "..." : text;
  }

  truncateTextTrim(text: string, nmb = 40) {
    let t = text.trim();
    return text.length > nmb ? text.slice(66, 66 + nmb) + "..." : text;
  }

  calculateFileSize(_size: any){
    let fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
    i=0;
    while(_size>900){
      _size/=1024;i++;
    }
    return (Math.round(_size*100)/100)+' '+fSExt[i];
  }

  getItemCssClassByIncertitude(incertitude_id: any) {
    const classes :any =  {
      1: 'bg-exate_color text-exate_color',
      2: 'bg-faible_color text-faible_color',
      3: 'bg-moyen_faible_color text-moyen_faible_color',
      4: 'bg-moyen_fort_color text-moyen_fort_color',
      5: 'bg-fort_color text-fort_color',
      default: 'bg-green-50/50 text-primary'
    }

    if(incertitude_id !== null ){
      let style = classes[incertitude_id];
      return style;
    }else return classes['default'];

  }




  mapEventContent(eventType:any){
    let event:any = {
       delete:{
        title:'Voulez-vous vraiment supprimer ce bilan?',
        text:"Cette action est définitive et ne peut être annulée.",
        btnContent: 'Supprimer',
        btnStyle  : 'bg-red-500 text-white'
       },
       valider:{
        title:'Voulez-vous vraiment Verrouiller ce bilan?',
        text:"Veuillez noter que cette action est irréversible et que vous ne pourrez pas modifier les informations une fois que vous l'aurez validé.",
        btnContent: 'Verrouiller',
        btnStyle  : 'bg-cloture_bg text-white'
       },
       inValider:{
        title:'Déverrouiller ce poste',
        text:"Êtes-vous sûr de vouloir déverrouiller cette liste ? Une fois déverrouillée, tous les utilisateurs pourront y accéder et la modifier.",
        btnContent: 'Déverrouiller',
        btnStyle  : 'bg-cloture_bg text-white'
       },
       cloturer:{
        title:'Voulez-vous vraiment clôturer ce bilan?',
        text :"Veuillez noter que cette action est irréversible et que vous ne pourrez plus modifier les informations contenues dans ce bilan une fois qu'il sera clôturé.",
        btnContent: 'Clôturer',
        btnStyle  : 'bg-black text-white'
       },
       decloture:{
        title:'Déverrouiller ce poste',
        text:"Êtes-vous sûr de vouloir déverrouiller cette liste ? Une fois déverrouillée, tous les utilisateurs pourront y accéder et la modifier.",
        btnContent: 'Déverrouiller',
        btnStyle  : 'bg-cloture_bg text-white'
       }
    }

    if(eventType !== null){
      return event[eventType]
    }else return event['delete'];
  }

  setTimeout$(cb: () => void, timer: number) {
    of(true).pipe(delay(timer), first()).subscribe(cb);
  }

  async delayFunct(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }




  scrolloToTop(){
    this.scroll.scrollToPosition([0,0]);
  }
}
