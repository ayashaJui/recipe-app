import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { MessageService } from 'primeng/api';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: [MessageService],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

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

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    console.log('edit recipe');
  }

  deleteRecipe() {
    console.log('delete recipe');
  }
}
