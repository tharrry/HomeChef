import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { Recipe, Ingredient } from "./recipe.entity";

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get(':id')
    getRecipe(@Param('id') recipeID: number): Recipe {
        return this.recipeService.getRecipeByID(recipeID);
    }

    @Get()
    getAllRecipes(): any {
        return this.recipeService.getAllRecipes();

    }
    
    @Post()
    addRecipe(@Body('recipe') recipe: Recipe): any {
        const id = this.recipeService.insertRecipe(recipe);
        return id;
    }

    //Identification data in URL, update data in Body
    @Patch(':id')
    updateRecipe(
        @Param('id') recipeID: number,
        @Body('author') author: string,
        @Body('userAdded') userAdded: string,
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('ingredients') ingredients: Ingredient[],
        @Body('tags') tags: string[], ) {
        this.recipeService.updateRecipe(
            recipeID,
            author,
            userAdded,
            name,
            description,
            ingredients,
            tags);
        return null;
    }

    @Delete(':id')
    removeRecipe(@Param('id') recipeID: number) {
        this.recipeService.deleteRecipe(recipeID);
    }
}