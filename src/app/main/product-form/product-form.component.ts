import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../service/products.service';
import { CategoriesService } from '../../service/categories.service';
import { AuthService } from '../../service/auth.service';
import { Categories } from '../interfaces/categories';
import { InputComponent } from '../../shared/input/input.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Product } from '../interfaces/products';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    InputGroupModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    NgStyle,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit, OnChanges {
  categories: Categories[] = [];
  @Input() title: string = '';
  @Input() getProductForm?: Product;
  @Input() selectedCategory?: Categories;

  @Output() productSubmit = new EventEmitter();

  productForm: FormGroup = new FormGroup({
    title: new FormControl(this.getProductForm?.title, [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(this.getProductForm?.price, [
      Validators.required,
      Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$/),
    ]),
    description: new FormControl(this.getProductForm?.description, [
      Validators.required,
    ]),
    categoryId: new FormControl(this.getProductForm?.category?.id, [
      Validators.required,
    ]),
    images: new FormArray([
      new FormControl('', [
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/),
        Validators.required,
      ]),
    ]),
  });
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getProductForm']?.currentValue) {
      this.productForm.patchValue({
        title: this.getProductForm?.title || '',
        price: this.getProductForm?.price || null,
        description: this.getProductForm?.description || '',
        categoryId: this.getProductForm?.category?.id || null,
        images: this.getProductForm?.images || [],
      });

      this.imagesArray.clear();

      this.getProductForm?.images.forEach((image) => {
        this.imagesArray.push(
          new FormControl(image, [
            Validators.required,
            Validators.pattern(
              /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/
            ),
          ])
        );
      });
    }
  }

  getControl(controlName: string): FormControl {
    const control = this.productForm.get(controlName);
    return control as FormControl;
  }

  get imagesArray(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  updateCategoryId(categoryId: number) {
    this.getControl('categoryId')?.setValue(categoryId);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.productSubmit.emit(this.productForm?.value);
  }
}
