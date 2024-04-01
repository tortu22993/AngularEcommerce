import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbModule],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  products: Product[] = [];
  currentCategoryId: number =1;
  searchMode: boolean = false;
  previousCategoryId: number=1;

  //new properties for paginacion
  thePageNumber: number=1;
  thePageSize: number=5;
  theTotalElements: number=0;
  
  previousKeyword: string ="";

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const theKeyword: string= this.route.snapshot.paramMap.get('keyword')!;
    //si tenemos una keyword diferente que vuelva a la pagina 1

    if(this.previousKeyword!= theKeyword){
      this.thePageNumber=1;
    }

    this.previousKeyword= theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductsPagiante(this.thePageNumber-1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
  }


  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    ///chequear si hay una diferente categoria, si hay una diferente que la anterior hay que poner el page a 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId= this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber-1, 
                        this.thePageSize, 
                        this.currentCategoryId).subscribe(this.processResult());
  }

  processResult(){

    return (data:any)=>{
      this.products = data._embedded.products;
      this.thePageNumber= data.page.number+1;
      this.thePageSize= data.page.size;
      this.theTotalElements= data.page.totalElements;
    };
  }

  updatePageSize(pageSize: string) {
    this.thePageSize=+pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Añadiendo al carrito: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
    }

}
