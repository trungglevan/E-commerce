import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  // products: any;
  public products: Product[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
      console.log(this.products);

    });
    // return this.products = this.productService.getProducts();
  }
  total = 0;

  calTotal() {
    this.total = 0;
    this.products.forEach((product: any) => {
      this.total += product.current_price * product.quantity;
    });
  }
}
