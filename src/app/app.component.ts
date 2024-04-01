import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { SearchComponent } from './components/search/search.component'
import { ProductListComponent} from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent} from './components/product-category-menu/product-category-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CartStatusComponent} from './components/cart-status/cart-status.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CartStatusComponent, SearchComponent, NgbModule,SalesPersonListComponent, ProductListComponent, RouterLink, HttpClientModule, ProductCategoryMenuComponent],
  templateUrl: './app.component.html',
  providers: [ProductService],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sales';
}
