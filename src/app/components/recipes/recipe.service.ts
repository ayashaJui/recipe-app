import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Schnitzel',
      'A super tasty schnitzel - just awesome',
      'https://unsplash.com/photos/NPX7l_C3-f8/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkzMTI0MTk5fA&force=true&w=1920',
      [
        new Ingredient(Math.round(Math.random() + 1), 'Meat', 2),
        new Ingredient(Math.round(Math.random() + 1), 'French Fries', 20),
      ]
    ),
    new Recipe(
      2,
      'Big Fat Burger',
      'What else you need to say?',
      'https://unsplash.com/photos/j-MPEwH9LM4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fGJ1cmdlcnxlbnwwfHx8fDE2OTMxMDMyMDR8MA&force=true',
      [
        new Ingredient(Math.round(Math.random() + 1), 'Buns', 3),
        new Ingredient(Math.round(Math.random() + 1), 'Meat', 2),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    const recipe = this.recipes.filter((r) => r.id === id);
    // console.log(this.recipes[id]);
    return recipe[0];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
