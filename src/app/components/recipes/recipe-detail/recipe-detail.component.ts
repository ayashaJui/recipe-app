import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { MessageService } from 'primeng/api';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: [MessageService],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;

  items: any[] = [
    {
      label: 'To Shopping List',
      command: () => {
        this.onAddShoppingList();
      },
    },
    {
      label: 'Edit Recipe',

      command: () => {
        this.editRecipe();
      },
    },
    {
      label: 'Delete Recipe',
      command: () => {
        this.deleteRecipe();
      },
    },
  ];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onAddShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  editRecipe() {
    console.log('edit recipe');
  }

  deleteRecipe() {
    console.log('delete recipe');
  }
}
