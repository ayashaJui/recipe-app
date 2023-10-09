import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  recipes: Recipe[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.formBuilder.group({
      id: [''],
      name: '',
      description: ['', Validators.required],
      imagePath: ['', Validators.required],
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
        imagePath: recipe.imagePath,
      });

      for (const ingredient of recipe.ingredients) {
        this.addIngredient(ingredient.id, ingredient.name, ingredient.amount);
      }
    }
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    const newRecipe = new Recipe(
      Math.round(Math.random() + 10),
      this.recipeForm.value['name'],
      this.recipeForm.value['desscription'],
      this.recipeForm.value['description'],
      this.recipeForm.value['ingredients']
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        id: new FormControl(Math.round(Math.random() + 1)),
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(id:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id)
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private addIngredient(id: number, name: string, amount: number): void {
    const ingredientGroup = this.formBuilder.group({
      id: [id, Validators.required],
      name: [name, Validators.required],
      amount: [
        amount,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
    });

    const ingredientsFormArray = this.recipeForm.get(
      'ingredients'
    ) as FormArray;
    ingredientsFormArray.push(ingredientGroup);
  }
}
