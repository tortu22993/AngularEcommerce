import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, timeInterval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]=[];

  totalPrice: Subject<number>= new Subject<number>();
  totalQuantity: Subject<number>= new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if(this.cartItems.length>0){

      existingCartItem= this.cartItems.find(tempCarItem => tempCarItem.id === theCartItem.id);   

      alreadyExistsInCart=(existingCartItem != undefined);
    }

    if(alreadyExistsInCart){
      //if(existingCartItem!=undefined){
      existingCartItem!.quantity++;
      //}
    } else{
      this.cartItems.push(theCartItem);
    }
      this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number =0;
    let totalQuantityValue: number=0;
    
    for(let currentCartItem of this.cartItems){
      totalPriceValue+= currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number){
    console.log('Contenido del carrito');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`nombre: ${tempCartItem.name}, cantidad= ${tempCartItem.quantity}, precio unidad=${tempCartItem.unitPrice}, subtotal=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)} totalQuantity: ${totalQuantityValue}`);
    console.log('-----------');

  }
}
