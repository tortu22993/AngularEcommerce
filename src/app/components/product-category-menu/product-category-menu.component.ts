import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent {

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('product categories=' +JSON.stringify(data));
        this.productCategories=data;
      }
    )
  }
  

}
