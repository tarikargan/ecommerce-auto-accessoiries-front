import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { take, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { SaisonService } from 'src/app/core/services/production-module/saison/saison.service';

@Component({
  selector: 'app-saison',
  templateUrl: './saison.component.html',
  styleUrls: ['./saison.component.scss']
})
export class SaisonComponent {
  environment                       :any      = environment;

  languages                         :string[] = [];
  lang                              :any      = 'fr';

  userType                          :string   = 'manager';
  checkedAll                        :boolean  = false;
  // allUsers                          :any;
  activeDropDown                    :any      = '';

  Saisons                      :any[]    = [];
  sortType                          :string   = '';
  searchValue                       :string   = '';

  showForm                          :boolean  = false;
  loading                           :boolean  = true;
  displayVideo                      :boolean  = false;

  eventType                         :any      = EventTypes.Add;
  editFournisseur_                  :any;
  indexEditItem                     :any;

  videoDetail                       :any      = {
    idVideo     :'',
    titleVideo  :'',
    moduleVideo :'',
    thumbnail   : {url:''}
  }

  SVGArCircleIcon!                  :HTMLElement | any;
  SVGFrCircleIcon!                  :HTMLElement | any;
  SVGEnCircleIcon!                  :HTMLElement | any;


  constructor(
    private _fb                     :FormBuilder,
    private _SaisonService          :SaisonService,
  ) { }



  ngOnInit(): void {

    this.getAll();
  }

  getAll(){
    this._SaisonService.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.loading = false;
      console.log({data});

      this.Saisons = data;

    },
    eroor => {
      this.loading = false;
    }
    )
  }


  toggleTypeUser(type:any){

  }




closePopup(){
  this.checkedAll        = false;
  this.editFournisseur_  = null;
  this.indexEditItem     = null;
  this.eventType         = EventTypes.Add;
}

addFr(){
  this.showForm = true;
}

addedFournisseur(elearning:any){
  if(typeof elearning === 'object' && elearning !== null){
    this.Saisons  = [elearning, ...this.Saisons];
    this.showForm    = false;
  }
}

editFournisseur(item:any,index:any){
  this.eventType       = EventTypes.Edit;
  this.editFournisseur_  = item;
  this.indexEditItem   = index;
  this.showForm        = true;

}

updatedFournisseur(elearning:any){
  if(typeof elearning === 'object' && elearning !== null){
    this.Saisons.splice(this.indexEditItem,1,elearning);
    this.closeForm();
  }
}


closeForm(){
  this.showForm         = false;
  this.editFournisseur_   = null;
  this.eventType        = EventTypes.Add;
  this.indexEditItem    = null;
}


deleteFournisseur(id:any){
   if(confirm('are you sure you want to delete this item ?')){
    this._SaisonService.delete(id)
     .pipe(take(1))
     .subscribe(
       data => {
        this.Saisons = this.Saisons.filter(el => el?.id !== id)
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


}
