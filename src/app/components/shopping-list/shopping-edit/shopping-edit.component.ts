import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  form: FormGroup;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem: any = Ingredient;

  constructor(
    private formBuilder: FormBuilder,
    private slService: ShoppingListService
  ) {
    this.form = this.formBuilder.group({
      id: '',
      name: '',
      amount: '',
    });
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((id: any) => {
      this.editedItemIndex = id;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(id);
      this.form.setValue({
        id: this.editedItem.id,
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  onAddItem() {
    const formData = this.form.value;

    if (this.editMode) {
      const newIngredient = new Ingredient(
        formData.id,
        formData.name,
        formData.amount
      );
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      const newIngredient = new Ingredient(
        Math.round(Math.random() + 1),
        formData.name,
        formData.amount
      );
      this.slService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItem)
    this.onClear()
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
