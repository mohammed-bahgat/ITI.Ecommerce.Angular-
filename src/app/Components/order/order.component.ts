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
  OrderListlength:number=0;
  ordersList:IOrder[]=[]
  customerId:string;
  pending:boolean=false;
  delivered :boolean=false;
  pendingOrderList:IOrder[]=[];
  pendingListlength:number=0;
  deliveredOrderList:IOrder[]=[];
  DeliveredListlength:number=0;

  constructor(    private route: Router,
    private cookieService: CookieService,
    private orderSer: OrderAPIService,private OrderService :OrderService, ) {
    this.Address = this.cookieService.get('UserAddress');
    this.customerId=this.cookieService.get('UserId');
  }

  ngOnInit(): void {
    // this.items = this.OrderService.getItems();
    //get User orders
  this.orderSer.getByCustomerId(this.customerId).subscribe((orders)=>{
    this.ordersList = orders;
    
    console.log(this.ordersList);
    console.log(orders);
   // get pending orders
    this.pendingOrderList=this.ordersList.filter((order)=>order.status==="Pending")
this.pendingListlength=this.pendingOrderList.length;
console.log(this.pendingOrderList,this.pendingListlength);

    //get Delivered orders
    this.deliveredOrderList=this.ordersList.filter((order)=>order.status=="Delivered")
    this.DeliveredListlength=this.deliveredOrderList.length
    console.log(this.deliveredOrderList,this.DeliveredListlength);
     this.OrderListlength=this.ordersList.length;

    
    console.log(this.OrderListlength);
  });

    
    
  }

 

  deleteOrder(pendingorderId:number) {
    // var orderId = this.cookieService.get('orderId');
    // this.orderSer.delete(+orderId).subscribe(() => {});
    // localStorage.removeItem('orderItems');
    // this.route.navigate(['Home']);
    this.orderSer.delete(pendingorderId).subscribe(() => {});
    this.route.navigate(['Order']);
    }
    UpdateOrder(pendingorderId:number){

    }
}
