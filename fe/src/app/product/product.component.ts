import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() data!: any;
  @Output() dataChange = new EventEmitter<any>();

  selectedSize = null;
  selectedColor: any = null;
  isDisabled = true;

  product_tmp: any;

  checkBuy = {
    color: "",
    size: "",
    quantity: 0
  }

  ngOnInit() {
    // Set the first color as the default selected color
    if (this.data.colors.length > 0) {
      this.selectedColor = this.data.colors[0].color_name;
      this.product_tmp = this.data.colors[0].images;
      this.checkBuy.color = this.selectedColor;
    }
  }

  selectSize(size: any) {
    this.selectedSize = size;
    this.checkBuy.size = size;
    this.checkBuyNow();
    console.log(this.checkBuy);
  }

  selectColor(color: string) {
    console.log(color);
    this.selectedColor = color;
    this.checkBuy.color = color;
    for (let c of this.data.colors) {
      // console.log(c);
      if (c.color_name === color) {
        this.product_tmp = c.images;
      }
    }
    this.checkBuyNow();
    console.log(this.checkBuy);
  }

  up() {
    this.data.quantity++;
    // console.log(this.data.quantity);
    this.dataChange.emit(this.data);
    this.checkBuy.quantity = this.data.quantity;
    this.checkBuyNow();
    console.log(this.checkBuy);
  }

  down() {
    if (this.data.quantity >= 1) {
      this.data.quantity--;
      this.dataChange.emit(this.data);
      this.checkBuy.quantity = this.data.quantity;
      this.checkBuyNow();
      console.log(this.checkBuy);
      
    }
  }

  checkBuyNow() {
    this.isDisabled = !(this.checkBuy.color && this.checkBuy.size && this.checkBuy.quantity > 0);
    return this.isDisabled;
  }

  buyNow() {
    alert('Successfully ' + this.data.name);
  }

  quantityChange(e: any) {
    this.data.quantity = e.target.value;
    this.checkBuy.quantity = this.data.quantity;
    this.dataChange.emit(this.data);
    this.checkBuyNow();
    console.log(this.checkBuy);
    
  }

}
