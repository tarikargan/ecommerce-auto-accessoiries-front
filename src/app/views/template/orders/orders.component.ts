import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { CommandesService } from 'src/app/core/services/sales-module/commandes/commande.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  environement        :any     = environment
  loading             :boolean = true;
  orders              :any     = [];
  links                             :any      = [];
  meta                              :any      = [];

  showForm            :boolean = false;

  eventType           :any     = EventTypes.Add;
  indexEditItem       :any;
  editOrder_          :any;
  editcommande        :any;


  constructor(
    private _CommandeService     : CommandesService,
    private _router              : Router
  ){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrders();
  }



  /**
   * @method get
   * get listing's orders
   */
  getOrders(){
      this._CommandeService.getAll()
      .pipe(take(1))
      .subscribe((res:any) =>{
        console.log({res});


        this.loading = false;
        this.orders   = [...res?.data];
        this.links    = res?.links;
        this.meta     = res?.meta;

      },
      error =>{
        console.error({error});

      })
  }


  handleSearch(event:any){
      console.log(event.target.value);
      let data = {
        search : event.target.value
      }
      this._CommandeService.search(data)
      .pipe(take(1))
      .subscribe((res:any) => {
        console.log(res);

        this.orders  = res?.data;
        this.links     = res?.links;
        this.meta      = res?.meta;
      });

  }



  handlePagination(url:any){
    if(url !== null){
      this._CommandeService.getBypaginate(url)
      .pipe(take(1))
      .subscribe((res:any) => {
        console.log(res);

        this.orders  = res?.data;
        this.links     = res?.links;
        this.meta      = res?.meta;
      });
    }
  }




  toggleForm(){
    this.showForm = !this.showForm;
  }

  /**
   * @event details response
   *
   */
  details(id:any){
    this._router.navigateByUrl('admin/orders/details/'+ id);
  }
  /**
   * @event post response
   *
   */
  addedOrder(event:any){
    if(typeof event === 'object' && event !== null){
      this.orders  = [event, ...this.orders];
      this.showForm    = false;
    }
  }



  edit(order : any){
    this.eventType       = EventTypes.Edit;
    this.editcommande    = order;
    this.toggleForm();
  }

  /**
   * @method update
   *
   */
  updatedOrder(event:any){
    console.log('updatedOrder', event);

    if(typeof event === 'object' && event !== null){
      this.orders.splice(this.indexEditItem,1,event);
      this.eventType = EventTypes.Add;
      this.toggleForm();
    }
  }

  duplicate(order : any){
    this.eventType       = EventTypes.Duplicate;
    this.editcommande    = order;
    this.toggleForm();
  }




  /**
   * @method delete order
   * delete order
   */
  delete(id:any){
      this._CommandeService.delete(id)
      .pipe(take(1)).subscribe(data =>{
        console.log(data?.message);

        this.orders = this.orders.filter((item:any)=> item.id != id );
      })
  }


  getActiveEtape(order:any){
    const etapes   = order.etapes;
    let item       = etapes.find((el:any) => el?.id == order?.etape_id);
    return item?.title;

  }


  getStyle(order:any){
    const etapes   = order.etapes;
    let item       = etapes.find((el:any) => el?.id == order?.etape_id);
    return item?.color;
    //  switch(item?.color){
    //   case "green":
    //     return 'bg-green-500 text-white';
    //     break;
    //   case "violet":
    //     return 'bg-violet-500 text-white';
    //     break;
    //   case "blue":
    //     return 'bg-blue-500 text-white';
    //     break;
    //   case "cyan":
    //     return 'bg-cyan-500 text-white';
    //     break;
    //   case "teal":
    //     return 'bg-teal-500 text-white';
    //     break;
    //   case "red":
    //     return 'bg-red-500 text-white';
    //     break;
    //   default:
    //     return '';
    // }
  }

}
