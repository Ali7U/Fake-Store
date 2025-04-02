import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Categories } from '../../main/interfaces/categories';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    DropdownModule,
    InputGroupModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() inputType: string = '';
  @Input() label: string = '';
  @Input() isArray: boolean = false;
  @Input() isCategoryList = false;
  @Input() categories: Categories[] = [];

  @Output() valueChange = new EventEmitter<string[]>();
  @Output() selectCategory = new EventEmitter<any>();

  @Input() parentForm!: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentForm'] && this.parentForm) {
      console.log('InputComponent - Parent Form:', this.parentForm.value);
      console.log('InputComponent - Images FormArray:', this.formArray);
      console.log('InputComponent - Form Controls:', this.getFormControls());
      this.cdr.detectChanges();
    }
  }

  get formArray(): FormArray {
    const array = this.parentForm.get('images') as FormArray;
    if (!array) {
      console.error('Images FormArray not found in parentForm');
    }
    return array;
  }

  getFormControls(): FormControl[] {
    return this.formArray.controls as FormControl[];
  }

  addItem() {
    this.formArray.push(
      new FormControl('', [
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/),
        Validators.required,
      ])
    );
    this.emitValueChange();
  }

  removeItem(index: number) {
    if (index > 0) {
      this.formArray.removeAt(index);
      this.cdr.detectChanges();
      this.emitValueChange();
    }
  }

  emitValueChange() {
    this.valueChange.emit(
      this.formArray.controls.map((control) => control.value)
    );
  }

  getCategory(option: any) {
    this.control.setValue(option.value);
    this.selectCategory.emit(option.value);
  }

  showErrors(imgControl?: FormControl): Boolean {
    const control = this.control || imgControl;
    if (!control) {
      return false;
    }
    const { dirty, touched, errors } = control;
    return dirty || touched && !errors;
  }
}
