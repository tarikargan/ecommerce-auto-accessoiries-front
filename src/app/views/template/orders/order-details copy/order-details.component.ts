// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { map, take } from 'rxjs';
// import { CommandesService } from 'src/app/core/services/sales-module/commandes/commande.service';

// @Component({
//   selector: 'app-order-details',
//   templateUrl: './order-details.component.html',
//   styleUrls: ['./order-details.component.scss']
// })
// export class OrderDetailsComponent {

//   loading      :boolean = true;
//   id           :any;
//   commande     :any;


//   constructor(
//     private _commandeService : CommandesService,
//     private route: ActivatedRoute
//   ){

//   }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.id = params['id'];
//       this.getCommande();// Access the 'id' parameter from the URL
//       console.log('Test ID:', this.id);
//     });
//   }



//   getCommande(){
//     this._commandeService.get(this.id).pipe(take(1), map(res => res?.data))
//     .subscribe((data:any)=>{
//       this.commande = data;
//       console.log({data});

//       this.loading = false;
//     })
//   }



// }
