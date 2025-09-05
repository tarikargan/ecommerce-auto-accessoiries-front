import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { MatierePremiereService } from 'src/app/core/services/production-module/matiere-premiere/matierePremiere.service';



@Component({
  selector: 'app-matierepre',
  templateUrl: './matierepre.component.html',
  styleUrls: ['./matierepre.component.scss']
})
export class MatierepreComponent {
  environment                       :any      = environment;

  languages                         :string[] = [];
  lang                              :any      = 'fr';

  userType                          :string   = 'manager';
  checkedAll                        :boolean  = false;
  // allUsers                          :any;
  activeDropDown                    :any      = '';

  MatierePremieres                  :any[]    = [];
  sortType                          :string   = '';
  searchValue                       :string   = '';

  showForm                          :boolean  = false;
  loading                           :boolean  = true;
  displayVideo                      :boolean  = false;

  eventType                         :any      = EventTypes.Add;
  editMatierePremiere_              :any;
  indexEditItem                     :any;

  activeQuTailleArea                :boolean = false;
  quantiteTailleId                  :any;

  constructor(
    private _MatierePremiereService :MatierePremiereService
  ) { }

  ngOnInit(): void {

    this.getAll();
  }

  getAll(){
    this._MatierePremiereService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.loading = false;
      console.log({data});

      this.MatierePremieres = data;

    },
    eroor => {
      this.loading = false;
    }
    )
  }



  toggleTypeUser(type:any){

  }






closePopup(){
  this.checkedAll             = false;
  this.editMatierePremiere_   = null;
  this.indexEditItem          = null;
  this.eventType              = EventTypes.Add;
}

addMatierepre(){
  this.showForm = true;
}

addedMatierePremiere(elearning:any){
  if(typeof elearning === 'object' && elearning !== null){
    this.MatierePremieres  = [elearning, ...this.MatierePremieres];
    this.showForm    = false;
  }
}

editMatierePremiere(item:any,index:any){
  this.eventType             = EventTypes.Edit;
  this.editMatierePremiere_  = item;
  this.indexEditItem         = index;
  this.showForm              = true;

}

updatedMatierePremiere(elearning:any){
  if(typeof elearning === 'object' && elearning !== null){
    this.MatierePremieres.splice(this.indexEditItem,1,elearning);
    this.closeForm();
  }
}


closeForm(){
  this.showForm         = false;
  this.editMatierePremiere_   = null;
  this.eventType        = EventTypes.Add;
  this.indexEditItem    = null;
}


deleteMatierePremiere(id:any){
   if(confirm('are you sure you want to delete this item ?')){
    this._MatierePremiereService.delete(id)
     .pipe(take(1))
     .subscribe(
       data => {
        this.MatierePremieres = this.MatierePremieres.filter(el => el?.id !== id)
       },
       error => console.error(error)
     )
   }
}

toggeDropDown(id:any){
  // console.log(id);
    this.activeDropDown = this.activeDropDown == id ? '': id;
}

switchLang(e:any){
  // console.log(e);

  this.lang = e;

}



  handleQuantiteTaille(id:any){
    this.activeQuTailleArea   = true;
    this.quantiteTailleId     = id;
  }

  calcQuantity(quantiteTaille:any){
    if(quantiteTaille.length > 0){
      let quantite = quantiteTaille.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0);
      return quantite;
    }
    return 0;
  }

  // getStyle
  getStyle(quantiteTaille:any){
    if(quantiteTaille.length > 0){
      let quantite = quantiteTaille.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.quantite, 0);
      if(quantite > 10){
        return 'bg-white text-green-500';
      }else{
        return 'bg-white text-red-500';
      }
    }
    return 'bg-white text-red-500';
  }
}

