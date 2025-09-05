import { Component } from '@angular/core';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { ClientsService } from 'src/app/core/services/sales-module/clients/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  loading                           :boolean   = true;
  showForm                          :boolean   = false;

  clients                           :any[]     = [];
  links                             :any       = [];
  meta                              :any       = [];

  indexEditItem                     :any;
  eventType                         :any       = EventTypes.Add;
  editClient_                       :any;


  constructor(
    private _ClientService          :ClientsService
  ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getClients();
  }

  getClients(){
    this._ClientService.getAll()
    .pipe(take(1))
    .subscribe((res:any)=>{
      this.clients   = [...res?.data];
      this.links     = res?.links;
      this.meta      = res?.meta;
      this.loading = false;

      console.log("get clients", res);
    }, error => {
      this.loading = false;
      console.error('Error al obtener los clientes');
    });
  }


  handlePagination(url:any){
    if(url !== null){
      this._ClientService.getBypaginate(url)
      .pipe(take(1))
      .subscribe((res:any) => {
        console.log(res);

        this.clients  = res?.data;
        this.links     = res?.links;
        this.meta      = res?.meta;
      });
    }
  }


  handleSearch(event:any){
    console.log(event.target.value);
    let data = {
      search : event.target.value
    }
    this._ClientService.search(data)
    .pipe(take(1))
    .subscribe((res:any) => {
      console.log(res);

      this.clients   = res?.data;
      this.links     = res?.links;
      this.meta      = res?.meta;
    });

}




  handleEdit(item:any, i:any){
    this.eventType       = EventTypes.Edit;
    this.editClient_     = item;
    this.indexEditItem   = i;
    this.showForm        = true;
  }


  handleDelete(id:any, i:any){
    if(confirm('are you sure you want to delete this item ?')){
      this._ClientService.delete(id)
      .pipe(take(1))
      .subscribe(
        data => {
          this.clients = this.clients.filter(el => el?.id !== id)
        },
        error => console.error(error)
      )
    }
  }






  toggleForm(){
    this.showForm = !this.showForm;
  }

  updatedClient(event:any){
    console.log({event});

    if(typeof event === 'object' && event !== null){
      this.clients.splice(this.indexEditItem,1,event);
      this.toggleForm();
    }
  }


  addedClient(event:any){
    console.log(event);

    if(typeof event === 'object' && event !== null){
      this.clients  = [event, ...this.clients];
      this.showForm    = false;
    }
  }



}
