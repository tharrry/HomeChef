import { Module } from "@nestjs/common";
import { RecipesController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./schemas/recipe.schema";
import { RecipeRepository } from "./recipe.repository";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Recipe.name, schema: RecipeSchema}
    ])],
    controllers: [RecipesController],
    providers: [RecipeService, RecipeRepository]
})

export class RecipeModule {}


//https://www.youtube.com/watch?v=hvbIGDlrGJk