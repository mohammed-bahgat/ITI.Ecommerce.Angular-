import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

searchWord:string ="";
productlist!:IProductOffer[];
searchLanguage: string="ar";
searchItems: IProductOffer[] = [];
currentCulture: string;

  constructor(private productOfferApiservice: ProductOfferApiService,
    private activedRoute: ActivatedRoute,
    private translate: TranslateService, 
    private route:Router, 
    private shoppingCartservice:ShoppingCartService) { 
      this.currentCulture = 'en';

    }

  ngOnInit(): void {

      this.searchWord = String(this.activedRoute.snapshot.paramMap.get('search'))

    this.productOfferApiservice.getAllProductOffer()
    .subscribe((prdList) => {
      this.productlist = prdList;

      var english = /^[A-Za-z0-9]*$/;

      if (english.test(this.searchWord)) {
      this.searchLanguage="en";
        this.searchItems = this.productlist.filter((b) =>
          b.nameEN.toUpperCase().includes(this.searchWord.toUpperCase())
        );
      } else {
        this.searchLanguage="ar";

        this.searchItems = this.productlist.filter((b) =>
          b.nameAR.toUpperCase().includes(this.searchWord.toUpperCase())
        );
      }
  this.productlist.map(i =>i.productImageList[0].path="http://localhost:8080/"+i.productImageList[0].path)
  console.log(this.searchItems);
});


this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
  this.currentCulture = event.lang;
});

  }


  OpenPrdDetails(prdID:number){
    this.route.navigate(['productdetails',prdID])
  }

  AddToCart(prd:IProductOffer)
  {
    this.shoppingCartservice.addToCart(prd);
    Swal.fire("Done","You Add Success","success");


  }
}