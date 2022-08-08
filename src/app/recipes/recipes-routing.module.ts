import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "../auth/auth-guard.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  { 
    path: '', 
    component: RecipesComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: '', component: RecipeStartComponent, },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},  
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ] 
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})

export class RecipesRoutingModule {}
