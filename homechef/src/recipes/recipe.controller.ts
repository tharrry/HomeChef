import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Render,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { RecipeService } from "./recipe.service";
import { Recipe } from "./schemas/recipe.schema";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { uuidv4 } from "uuid";

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipesViewController {
    @Get()
    @Render('index')
    @Header('content-type', 'text/html')
    recipes() {
        return {isRecipesView: true}
    }

    @Get(':recipeId')
    @Render('index')
    @Header('content-type', 'text/html')
    recipe() {
        return {isRecipeView: true}
    }
}

@Controller('api/recipes')
export class RecipesApiController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get(':recipeId')
    async getRecipe(
        @Param('recipeId')
        recipeId: string,
    ): Promise<Recipe> {
        return this.recipeService.getRecipeByID(recipeId);
    }

    @Get()
    async getRecipes(): Promise<Recipe[]> {
        return this.recipeService.getRecipes();
    }

    @Post()
    async createRecipe(
        @Body()
        createRecipeDto: CreateRecipeDto
    ): Promise<Recipe> {
        return this.recipeService.createRecipe({...createRecipeDto, recipeId: uuidv4()});
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