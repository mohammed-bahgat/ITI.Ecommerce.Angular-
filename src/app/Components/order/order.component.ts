import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { OrderAPIService } from 'src/app/Services/order-api.service';
import { OrderService } from 'src/app/Services/order.service';
import { IOrder } from 'src/app/Models/iorder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  Address : string ;
  items : IProductOffer[] =[];
  length:number=0;
  ordersList:IOrder[]=[]
  customerId:string;
  constructor(    private route: Router,
    private cookieService: CookieService,
    private orderSer: OrderAPIService,private OrderService :OrderService, ) {
    this.Address = this.cookieService.get('UserAddress');
    this.customerId=this.cookieService.get('UserId');
  }

  ngOnInit(): void {
    this.items = this.OrderService.getItems();
    this.length=this.items.length; 
  }

 

  deleteOrder() {
    var orderId = this.cookieService.get('orderId');
    this.orderSer.delete(+orderId).subscribe(() => {});
    localStorage.removeItem('orderItems');
    this.route.navigate(['Home']);
    }
  
}
