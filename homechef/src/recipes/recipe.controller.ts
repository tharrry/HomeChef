import { Controller, Post, Body, Get, Param, Patch, Delete, Render, Header } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { Recipe, Ingredient } from "./schemas/recipe.schema";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";

@Controller('recipes')
export class RecipesViewController {
    @Get()
    @Render('index')
    @Header('content-type', 'text/html')
        root() {
        return {isRecipesView: true}
    }


}

@Controller('api/recipes')
export class RecipesApiController {
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
}