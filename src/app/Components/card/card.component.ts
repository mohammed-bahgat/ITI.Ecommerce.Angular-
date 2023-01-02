import { CurrencyPipe } from '@angular/common';
import {Component,ElementRef,OnInit,QueryList, ViewChildren,} from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/Models/iorder';
import { IPayment } from 'src/app/Models/ipayment';
import { IProductOffer } from 'src/app/Models/iproduct-offer';

import { Loggeduser } from 'src/app/Models/loggeduser';
import { OrderAPIService } from 'src/app/Services/order-api.service';
import { PaymentAPIService } from 'src/app/Services/payment-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  user!: Loggeduser;
  item: IProductOffer[] = [];
  TotalPrice: number = 0;
  paymentMethod: string = '';
  inputPrice: number = 0;
  currentCulture: string;
  length: number = 0;
  totalprice: number[] = [];
  orderId: number = 0;
  shoppingCartId: number = 0;
  constructor(
    private route: Router,
    private cookieService: CookieService,
    private shoppingCartservice: ShoppingCartService,
    private paymentSer: PaymentAPIService,
    private orderSer: OrderAPIService,
    private translate: TranslateService
  ) {
    this.currentCulture = 'en';
  }

  ngOnInit(): void {
    this.item = this.shoppingCartservice.getItems();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

    this.length = this.item.length;
    
console.log(this.length);

    this.calcTotalPrice();
  }



  addToCart(it: IProductOffer) {
    if (!this.shoppingCartservice.itemInCart(it)) {
      it.quantity = 1;
      this.shoppingCartservice.addToCart(it); //add items in cart
      this.item = this.shoppingCartservice.getItems();
    }
  }

  OrderSubmit() {
    var id = this.cookieService.get("UserId");
   var idIndex=document.cookie.indexOf("UserId")
    console.log( document.cookie.indexOf("UserId"));

    if (idIndex===-1) {
      this.route.navigate(['LogIn']);
    } else {
      var price = this.TotalPrice;
      if (this.paymentMethod == 'cash') {
      
        //add payment
        var payment: IPayment = { id: 0, paymentType: 'Cash', isAllowed: true };

        this.paymentSer.Add(payment).subscribe((ConfirmedPaymentId: number) => {
          this.orderId = ConfirmedPaymentId;
        });

        setTimeout(() => {
          //submit the order
          var order: IOrder = {
            id: 0,
            customerId: this.cookieService.get('UserId'),
            paymentId: this.orderId,
            orderDate: new Date(),

            productList:this.item,
            status:"Pending"
          };
          this.orderSer.Add(order).subscribe((orderId: number) => {
            this.cookieService.set('orderId', orderId.toString());
          });

          localStorage.setItem('orderItems', JSON.stringify(this.item));
          this.shoppingCartservice.clearCart();
          this.route.navigate(['Order']);
          // Add order items on local storage
        }, 3000);
      }
      if (this.paymentMethod == 'visa') {
        this.route.navigate(['pay', price]);
      }
    }
  }

  calcTotalPrice() {
    this.TotalPrice = 0;
    for (const i of this.item) {
      this.TotalPrice += i.quantity * i.totalPrice;
    }
  }
}
