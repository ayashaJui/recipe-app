import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private slService: ShoppingListService
  ) {
    this.form = this.formBuilder.group({
      name: '',
      amount: 0,
    });
  }

  onAddItem() {
    const formData = this.form.value;
    const newIngredient = new Ingredient(formData.name, formData.amount);
    this.slService.addIngredient(newIngredient);
  }
}
