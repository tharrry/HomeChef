import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Ingredient } from '../schemas/recipe.schema';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  userAdded?: string;

  @IsOptional()
  @IsString()
  dishName?: string;

  @IsOptional()
  @IsNumber()
  feeds?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  ingredients?: Ingredient[];

  @IsOptional()
  steps?: string[];

  @IsOptional()
  tags?: string[];
}
