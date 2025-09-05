import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { take, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { StockService } from 'src/app/core/services/production-module/stock/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  environment                       :any      = environment;

  languages                         :string[] = [];
  lang                              :any      = 'fr';

  userType                          :string   = 'manager';
  checkedAll                        :boolean  = false;
  // allUsers                          :any;
  activeDropDown                    :any      = '';

  stocks                            :any[]    = [];
  sortType                          :string   = '';
  searchValue                       :string   = '';

  showForm                          :boolean  = false;
  loading                           :boolean  = true;
  displayVideo                      :boolean  = false;

  eventType                         :any      = EventTypes.Add;
  editStock_                        :any;
  indexEditItem                     :any;


  SVGArCircleIcon!                  :HTMLElement | any;
  SVGFrCircleIcon!                  :HTMLElement | any;
  SVGEnCircleIcon!                  :HTMLElement | any;


  constructor(
    private _fb                     :FormBuilder,
    private _stockservice           :StockService,
  ) { }



  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._stockservice.getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data =>{
      this.loading = false;
      console.log({data});
      this.stocks = data;
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
  this.editStock_        = null;
  this.indexEditItem     = null;
  this.eventType         = EventTypes.Add;
}

addFr(){
  this.showForm = true;
}

addedStock(stock:any){
  if(typeof stock === 'object' && stock !== null){
    this.stocks   = [stock, ...this.stocks];
    this.showForm = false;
  }
}

editStock(item:any,index:any){
  this.eventType       = EventTypes.Edit;
  this.editStock_  = item;
  this.indexEditItem   = index;
  this.showForm        = true;

}

updatedStock(elearning:any){
  if(typeof elearning === 'object' && elearning !== null){
    this.stocks.splice(this.indexEditItem,1,elearning);
    this.closeForm();
  }
}


closeForm(){
  this.showForm         = false;
  this.editStock_       = null;
  this.eventType        = EventTypes.Add;
  this.indexEditItem    = null;
}


deleteStock(id:any){
   if(confirm('are you sure you want to delete this item ?')){
    this._stockservice.delete(id)
     .pipe(take(1))
     .subscribe(
       data => {
        this.stocks = this.stocks.filter(el => el?.id !== id)
       },
       error => console.error(error)
     )
   }
}

toggeDropDown(id:any){
    this.activeDropDown = this.activeDropDown == id ? '': id;
}




}
