import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: UntypedFormGroup;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      // console.log(this.editMode);
      this.initForm();
    });
  }

  // onSubmit() {
  //   const newRecipe = new Recipe(
  //     this.recipeForm.value['name'],
  //     this.recipeForm.value['imagePath'],
  //     this.recipeForm.value['description'],
  //     this.recipeForm.value['ingredients']
  //     );

  //   if (this.editMode) {
  //     this.recipeService.updateRecipe(this.id, newRecipe);
  //   } else {
  //     this.recipeService.addRecipe(newRecipe);
  //   }
  // }

  // Since our value of the form has exactly the format of our recipe model and the same names like image path and so on and this is something we especially wanted to make sure and we focused on, you can skip this step of saving it in a new constant and just pass this recipe form value because the object stored here should have a valid format to fit one of our recipes.
  // Compare above onSubmit() and below onSubmit()

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  get controls() { // a getter!
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        'name': new UntypedFormControl(null, Validators.required),
        'amount': new UntypedFormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // Deleting all Items in a FormArray
  // As of Angular 8+, there's a new way of clearing all items in a FormArray.
  // (<FormArray>this.recipeForm.get('ingredients')).clear();
  // The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.
  // It's like manually creating a loop and calling removeAt() for every item.

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new UntypedFormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new UntypedFormGroup({
              'name': new UntypedFormControl(ingredient.name, Validators.required),
              'amount': new UntypedFormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          )
        }
      }
    }

    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recipeName, Validators.required),
      'imagePath': new UntypedFormControl(recipeImagePath, Validators.required),
      'description': new UntypedFormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
}
