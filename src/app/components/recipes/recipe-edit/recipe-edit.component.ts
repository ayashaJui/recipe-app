import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) {
    this.recipeForm = this.formBuilder.group({
      id: '',
      name: '',
      description: '',
      imgPath: '',
      ingredients: this.formBuilder.array<FormGroup>([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });

    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);

      this.recipeForm.patchValue({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
      });

      for (const ingredient of recipe.ingredients) {
        this.addIngredient(ingredient.id, ingredient.name, ingredient.amount);
      }
    }
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private addIngredient(id: number, name: string, amount: number): void {
    const ingredientGroup = this.formBuilder.group({
      id: id,
      name: name,
      amount: amount,
    });

    const ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsFormArray.push(ingredientGroup);
  }
}
