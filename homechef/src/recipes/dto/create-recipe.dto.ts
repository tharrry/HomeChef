import {
    IsNotEmpty,
    IsNumber,
    IsString,
  } from 'class-validator';
import { Ingredient } from "../schemas/recipe.schema";

export class CreateRecipeDto {

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    userAdded: string;

    @IsNotEmpty()
    @IsString()
    dishName: string;

    @IsNotEmpty()
    @IsNumber()
    feeds: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    ingredients: Ingredient[];

    @IsNotEmpty()
    steps: string[];

    @IsNotEmpty()
    tags: string[];
}