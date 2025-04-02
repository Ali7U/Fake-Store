import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../service/categories.service';
import { InputComponent } from '../../shared/input/input.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  @Output() close = new EventEmitter();
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(/https?:\/\/.+\.(png|jpg|jpeg|gif)/),
        ],
      ],
    });
  }

  getControl(control: string): FormControl {
    return this.categoryForm.get(control) as FormControl
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.categoriesService
      .addCategory(this.categoryForm.value)
      .subscribe(() => {
        this.close.emit();
      });
  }
}
