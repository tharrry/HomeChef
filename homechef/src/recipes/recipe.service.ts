import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { title } from "process";
import { RecipeRepository } from "./recipe.repository";
import { Ingredient, Recipe } from "./schemas/recipe.schema";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";

@Injectable()
export class RecipeService {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    async getRecipeByID(recipeId: string): Promise<Recipe> {
        return this.recipeRepository.findOne({recipeId});
    }

    async getRecipes(): Promise<Recipe[]> {
        return this.recipeRepository.find({});
    }

    async createRecipe(
        author: string,
        userAdded: string,
        dishName: string,
        description: string,
        ingredients: Ingredient[],
        steps: string[],
        tags: string[]
    ): Promise<Recipe> {
        return this.recipeRepository.create({
            recipeId: uuidv4(),
            author,
            userAdded,
            dishName,
            description,
            ingredients,
            steps,
            tags
        });
    }

    async updateRecipe(recipeId: string, recipeUpdates: UpdateRecipeDto): Promise<Recipe> {
        return this.recipeRepository.findOneAndUpdate({recipeId}, recipeUpdates);
    }

    async deleteRecipe(recipeId: string): Promise<any> {
        return this.recipeRepository.findOneAndDelete({recipeId});
    }

    //private recipes: Recipe[] = [];
//
    //getAllRecipes() {
    //    // Using spread operator (...) to produce a copy of the recipies array
    //    return [...this.recipes];
    //}
//
    //insertRecipe(recipe: Recipe): any {
    //    this.recipes.push(recipe);
    //    return recipe;
    //}
//
    //updateRecipe(
    //    id: string,
    //    author: string,
    //    userAdded: string,
    //    name: string,
    //    description: string,
    //    ingredients: Ingredient[],
    //    tags: string[]) {
    //        const [recipe, index] = this.findRecipe(id);
    //        const updatedRecipe = {...recipe}
    //        
    //        if (author) {
    //            updatedRecipe.author = author;
    //        }
    //        if (userAdded) {
    //            updatedRecipe.userAdded = userAdded;
    //        }
    //        if (name) {
    //            updatedRecipe.dishName = name;
    //        }
    //        if (description) {
    //            updatedRecipe.description = description;
    //        }
    //        if (ingredients) {
    //            updatedRecipe.ingredients = ingredients;
    //        }
    //        if (tags) {
    //            updatedRecipe.tags = tags;
    //        }
//
    //        this.recipes[index] = updatedRecipe;
    //}

    //deleteRecipe(recipeID: string) {
    //    const [recipe, index] = this.findRecipe(recipeID);
    //    this.recipes.splice(index, 1);
    //}
//
    //private findRecipe(recipeID: string): [Recipe, number] {
    //    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id === recipeId);
    //    const recipe = this.recipes[recipeIndex];
    //    if (!recipe) {
    //        throw new NotFoundException('No recipe with ID ' + recipeID);
    //    }
    //    return [recipe, recipeIndex];
    //}

}