import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { CommandesService } from 'src/app/core/services/sales-module/commandes/commande.service';


interface Product {
  id: number;
  name: string;
  size: string;
  status: string;
  quantity: number;
  price: number;
  text: number;
  amount: number;
  image: string;
}

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  loading      :boolean = true;
  id           :any;
  commande     :any;


  constructor(
    private _commandeService : CommandesService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getCommande();// Access the 'id' parameter from the URL
      console.log('Test ID:', this.id);
    });
  }



  getCommande(){
    this._commandeService.get(this.id).pipe(take(1), map(res => res?.data))
    .subscribe((data:any)=>{
      this.commande = data;
      console.log({data});

      this.loading = false;
    })
  }


  products: Product[] = [
    {
      id: 1,
      name: 'Men Black Slim Fit T-shirt',
      size: 'M',
      status: 'Ready',
      quantity: 1,
      price: 80.00,
      text: 3.00,
      amount: 83.00,
      image: 'assets/images/black-tshirt.png'
    },
    {
      id: 2,
      name: 'Dark Green Cargo Pent',
      size: 'M',
      status: 'Packaging',
      quantity: 3,
      price: 330.00,
      text: 4.00,
      amount: 334.00,
      image: 'assets/images/cargo-pant.png'
    },
    {
      id: 3,
      name: 'Men Dark Brown Wallet',
      size: 'S',
      status: 'Ready',
      quantity: 1,
      price: 132.00,
      text: 5.00,
      amount: 137.00,
      image: 'assets/images/wallet.png'
    },
    {
      id: 4,
      name: 'Kid\'s Yellow T-shirt',
      size: 'S',
      status: 'Packaging',
      quantity: 2,
      price: 220.00,
      text: 3.00,
      amount: 223.00,
      image: 'assets/images/yellow-tshirt.png'
    }
  ];

  timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      title: 'The packing has been started',
      description: 'Confirmed by Gaston Lapierre',
      timestamp: 'April 23, 2024, 09:40 am',
      completed: true
    },
    {
      id: 2,
      title: 'The invoice has been sent to the customer',
      description: 'Invoice email was sent to hello@dundermufflin.com',
      timestamp: 'April 23, 2024, 09:40 am',
      completed: true
    }
  ];

  totalAmount: number = 737.00;

  customerDetails = {
    name: 'Gaston Lapierre',
    email: 'hello@dundermufflin.com',
    contactNumber: '(723) 732-760-5760',
    shipping: {
      name: 'Wilson\'s Jewelers LTD',
      address: '1344 Hershell Hollow Road',
      city: 'Tukwila',
      state: 'WA',
      zip: '98158',
      country: 'United States',
      phone: '(723) 732-760-5760'
    },
    billing: {
      sameAsShipping: true
    },
    payment: {
      cardType: 'Master Card',
      cardNumber: 'xxxx xxxx xxxx 7812',
      transactionId: '#IDN76813905B',
      cardHolderName: 'Gaston Lapierre'
    }
  };

  getStatusClass(status: string): string {
    return status === 'Ready'
      ? 'bg-green-100 text-green-600'
      : 'bg-blue-100 text-blue-600';
  }

  resendInvoice(): void {
    console.log('Invoice resent to customer');
    // Implement your resend logic here
  }

}
