import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangeSub: Subscription | undefined;

  selectedIngredient!: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(id: any){
    this.slService.startedEditing.next(id)
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   const newIngredients = [...this.ingredients, ingredient];
  //   this.ingredients = newIngredients;
  //   console.log(this.ingredients);
  // }

  ngOnDestroy(): void {
    this.igChangeSub?.unsubscribe();
  }
}
