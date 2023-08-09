import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { Recipe, Ingredient } from "./schemas/recipe.schema";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get(':recipeId')
    async getRecipe(@Param('recipeId') recipeId: string): Promise<Recipe> {
        return this.recipeService.getRecipeByID(recipeId);
    }

    @Get()
    async getRecipes(): Promise<Recipe[]> {
        return this.recipeService.getRecipes();
    }

    @Post()
    async createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeService.createRecipe(
            createRecipeDto.author,
            createRecipeDto.userAdded,
            createRecipeDto.dishName,
            createRecipeDto.description,
            createRecipeDto.ingredients,
            createRecipeDto.steps,
            createRecipeDto.tags
            );
    }

    @Patch(':recipeId')
    async updateRecipe(@Param('recipeId') recipeId: string, @Body() updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        return this.recipeService.updateRecipe(recipeId, updateRecipeDto);
    }

    @Delete(':recipeId')
    async removeRecipe(@Param('recipeId') recipeId: string): Promise<any> {
        return this.recipeService.deleteRecipe(recipeId);
    }

    //@Get(':id')
    //getRecipe(@Param('id') recipeID: number): Recipe {
    //    return this.recipeService.getRecipeByID(recipeID);
    //}
//
    //@Get()
    //getAllRecipes(): any {
    //    return this.recipeService.getAllRecipes();
//
    //}
    //
    //@Post()
    //addRecipe(@Body('recipe') recipe: Recipe): any {
    //    const id = this.recipeService.insertRecipe(recipe);
    //    return id;
    //}
//
    ////Identification data in URL, update data in Body
    //@Patch(':id')
    //updateRecipe(
    //    @Param('id') recipeID: number,
    //    @Body('author') author: string,
    //    @Body('userAdded') userAdded: string,
    //    @Body('name') name: string,
    //    @Body('description') description: string,
    //    @Body('ingredients') ingredients: Ingredient[],
    //    @Body('tags') tags: string[], ) {
    //    this.recipeService.updateRecipe(
    //        recipeID,
    //        author,
    //        userAdded,
    //        name,
    //        description,
    //        ingredients,
    //        tags);
    //    return null;
    //}
}