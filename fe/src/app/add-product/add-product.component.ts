import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../product/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  [x: string]: any;
  public productForm!: FormGroup;
  public productFlag: boolean = false;
  public message: string = 'Product is creating...';
  variants: Array<{ color_code: string, color_name: string, images: any[] }> = [];
  sizes: Array<{ value: string }> = [];

  ngOnInit(e: any) {
    // form
    this.productForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      quantity: new FormControl('', [
        Validators.required,
      ]),
      isInStock: new FormControl('', [

      ]),
      isBestSeller: new FormControl('', [

      ]),
      original_price: new FormControl('', [
        Validators.required,
      ]),
      current_price: new FormControl('', [
        Validators.required,
      ]),
      price_unit: new FormControl('', [
        Validators.required,
      ]),
      size: new FormControl('', [
        Validators.required,
      ]),
      colors: new FormControl('', [
        Validators.required,
      ]),
      color_code: new FormControl('', []),
      color_name: new FormControl('', []),
      images: new FormControl('', []),
    });
    this.addVariant(e);
    this.addSize(e)
  }
  constructor(private _productService: ProductService, private router: Router) {

  }
  onSubmit() {
    const product: Product = {
      _id: undefined,
      name: this.productForm.get('name')?.value ?? '',
      description: this.productForm.get('description')?.value ?? '',
      original_price: this.productForm.get('original_price')?.value ?? 0,
      current_price: this.productForm.get('current_price')?.value ?? 0,
      price_unit: this.productForm.get('price_unit')?.value ?? '',
      quantity: this.productForm.get('quantity')?.value ?? 0,
      rating: 4,
      rating_account: 2000,
      colors: this.variants,
      size: this.sizes,
      size_unit: '',
      isInStock: this.productForm.get('isInStock')?.value ?? false,
      isBestSeller: this.productForm.get('isBestSeller')?.value ?? false,
    }
    this.productFlag = true;
    this._productService.createProduct(product).subscribe(data => {
      // check status of response
      if (data) {
        this.message = 'product created successfully!';
        // delay 3s and redirect to list products
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 3000);
      } else {
        this.message = 'Error creating product!';
        setTimeout(() => {
          this.productFlag = false;
        }, 2000);
      }
    });
  }

  addVariant(e: any): void {
    if (e) {
      e.preventDefault();
    }
    this.variants.push({
      color_code: this.productForm.get('color_code')?.value ?? '',
      color_name: this.productForm.get('color_name')?.value ?? '',
      images: []
    });
    console.log(this.variants);

  }

  onSelect(event: any, i: number) {
    console.log(event);
    // const addedFiles = event.addedFiles;
    this.variants[i].images.push(...event.addedFiles);

    // const fileNames = addedFiles.map((file: File) => file.name);
    // console.log('Selected file names:', fileNames);
  }

  removeVariant(index: number) {
    this.variants[index] = { color_code: '#563d7c', color_name: '', images: [] };
    this.variants.splice(index, 1);
  }

  onRemove(event: any, i: number) {
    console.log(event);
    this.variants[i].images.splice(this.variants[i].images.indexOf(event), 1);
  }

  addSize(event: Event) {
    if (event) {
      event.preventDefault();
    }
    this.sizes.push({ value: this.productForm.get('size')?.value ?? '' });
    console.log(this.sizes);

  }

  removeSize(index: number) {
    this.sizes.splice(index, 1);
  }

  public get name() {
    return this.productForm.get('name');
  }

  public get description() {
    return this.productForm.get('description');
  }

  public get quantity() {
    return this.productForm.get('quantity');
  }

  public get isInStock() {
    return this.productForm.get('isInStock');
  }

  public get isBestSeller() {
    return this.productForm.get('isBestSeller');
  }

  public get original_price() {
    return this.productForm.get('original_price');
  }

  public get current_price() {
    return this.productForm.get('current_price');
  }

  public get price_unit() {
    return this.productForm.get('price_unit');
  }

  public get size() {
    return this.productForm.get('size');
  }

  public get color_code() {
    return this.productForm.get('color_code');
  }

  public get colors() {
    return this.productForm.get('colors');
  }

  public get images() {
    return this.productForm.get('images');
  }
}
