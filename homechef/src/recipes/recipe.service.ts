import { Injectable, NotFoundException } from "@nestjs/common";
import { Recipe, Ingredient } from "./recipe.entity";
import { title } from "process";

@Injectable()
export class RecipeService {
    
    private recipes: Recipe[] = [];

    getRecipeByID(recipeID: number): Recipe {
        return {...this.findRecipe(recipeID)[0]};
    }

    getAllRecipes() {
        // Using spread operator (...) to produce a copy of the recipies array
        return [...this.recipes];
    }

    insertRecipe(recipe: Recipe): any {
        this.recipes.push(recipe);
        return recipe;
    }

    updateRecipe(
        id: number,
        author: string,
        userAdded: string,
        name: string,
        description: string,
        ingredients: Ingredient[],
        tags: string[]) {
            const [recipe, index] = this.findRecipe(id);
            const updatedRecipe = {...recipe}
            
            if (author) {
                updatedRecipe.author = author;
            }
            if (userAdded) {
                updatedRecipe.userAdded = userAdded;
            }
            if (name) {
                updatedRecipe.name = name;
            }
            if (description) {
                updatedRecipe.description = description;
            }
            if (ingredients) {
                updatedRecipe.ingredients = ingredients;
            }
            if (tags) {
                updatedRecipe.tags = tags;
            }

            this.recipes[index] = updatedRecipe;
    }

    deleteRecipe(recipeID: number) {
        const [recipe, index] = this.findRecipe(recipeID);
        this.recipes.splice(index, 1);
    }

    private findRecipe(recipeID: number): [Recipe, number] {
        const recipeIndex = this.recipes.findIndex((recipe) => recipe.id == recipeID);
        const recipe = this.recipes[recipeIndex];
        if (!recipe) {
            throw new NotFoundException('No recipe with ID ' + recipeID);
        }
        return [recipe, recipeIndex];
    }

}