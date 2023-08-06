import { Module } from "@nestjs/common";
import { RecipesController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";

@Module({
    controllers: [RecipesController],
    providers: [RecipeService]
})

export class RecipeModule {}