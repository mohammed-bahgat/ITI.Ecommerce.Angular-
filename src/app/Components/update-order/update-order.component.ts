import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/Models/iorder';
import { IPayment } from 'src/app/Models/ipayment';
import { IProductOffer } from 'src/app/Models/iproduct-offer';

import { OrderAPIService } from 'src/app/Services/order-api.service';
import { PaymentAPIService } from 'src/app/Services/payment-api.service';

import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  currentCulture: string;
  items!: IProductOffer[] ;
  orderId:number = 0;
  order!:IOrder ;
  constructor(private shoppingCartservice: ShoppingCartService,
    private route: Router,
    private cookieService: CookieService,
    private paymentSer: PaymentAPIService,
    private orderSer: OrderAPIService,
    private OrderService :OrderService,
    private activedRoute:ActivatedRoute,
    private translate: TranslateService) 
    {
      this.currentCulture = 'en';
    }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
    // this.items = this.OrderService.getItems();
    this.activedRoute.paramMap.subscribe(paramMap =>{
      this.orderId=(paramMap.get('orderId'))?Number(paramMap.get('orderId')):0;
    console.log(this.orderId);
    
    this.orderSer.getById(this.orderId).subscribe(order =>{
      this.order = order;
    })
    
    
    })
  }
  
deleteOrder(id:number){
  var newPrdlist:IProductOffer[]=[];
  for (const prd of this.order.productList) {
    
  if(prd.id !== id){
    newPrdlist.push(prd)
  }
  }
  this.order.productList=newPrdlist
  // console.log(this.items);
  
  // localStorage.setItem('orderItems', JSON.stringify(this.items));

}
// UpdateOrder(){
//   //get order Id
//   var id = this.cookieService.get('orderId');
//   //get order
//   var order!:IOrder ;
//   this.orderSer.getById(+id).subscribe((ord) => { order=ord})
//       //get items id to add in shopping cart
//       // var itemsId: number[] = [];
//       // for (const iterator of this.items) {
//       //   itemsId.push(iterator.id);
//       // }
//         var shoppingcartID=0;
//       // add Item in shopping cart

      // var ShoppingCart:IShoppingCart={productList:this.items}

      // this.shoppingCartSer.Add(ShoppingCart).subscribe((Id: number) => {
      //   shoppingcartID = Id;
      // });
      //add payment
     
      //submit Updating the order


    //   setTimeout(()=>{
    //     //update the order
      
   
    //   order.shoppingCartId=shoppingcartID;
    //   this.orderSer.update(order).subscribe(() => {})

    //   localStorage.setItem('orderItems', JSON.stringify(this.items));
    //   this.route.navigate(['Order']);
    // },3000)

// }
UpdateOrder(order:IOrder) {
  this.orderSer.update(order).subscribe(()=>{this.route.navigate(['Order']);}
  )
}
}

