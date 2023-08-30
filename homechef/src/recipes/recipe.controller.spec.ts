import { Test, TestingModule } from '@nestjs/testing';
import {
  RecipesApiController,
  RecipesViewController,
} from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe } from './schemas/recipe.schema';
import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('RecipeControllers', () => {
  let recipeApiController: RecipesApiController;
  let recipeViewController: RecipesViewController;
  let recipeService: RecipeService;
  //let model: Model<Recipe>;

  const recipeId = 'a unique id';

  const mockRecipe: Recipe = {
    recipeId: recipeId,
    author: 'Otto',
    userAdded: 'Martin',
    dishName: 'Dish One',
    feeds: 4,
    description: 'A good first recipe',
    ingredients: [
      {
        name: 'First ingredient',
        quantity: 1,
        unit: 'tbsp',
      },
    ],
    steps: ['Step 1', 'Step 2'],
    tags: ['Tag 1', 'Tag 2'],
  };

  const mockRecipeService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecipesApiController, RecipesViewController],
      providers: [
        RecipeService,
        {
          provide: getModelToken(Recipe.name),
          useValue: mockRecipeService,
        },
      ],
    }).compile();

    recipeViewController = app.get<RecipesViewController>(
      RecipesViewController,
    );
    recipeApiController = app.get<RecipesApiController>(RecipesApiController);
    recipeService = app.get<RecipeService>(RecipeService);
    //model = app.get<Model<Recipe>>(getModelToken(Recipe.name));
  });

  describe('RecipeViewController', () => {
    describe('recipes', () => {
      it('should return a proper hjtml document', async () => {
        console.log(await recipeViewController.recipes());
      });
    });
  });

  describe('RecipeApiController', () => {
    describe('getRecipe', () => {
      it('should return a recipe', async () => {
        jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
        jest
          .spyOn(recipeService, 'getRecipeByID')
          .mockResolvedValue(mockRecipe);

        const result = await recipeApiController.getRecipe(recipeId);

        expect(recipeService.getRecipeByID).toHaveBeenCalledTimes(1);
        expect(recipeService.getRecipeByID).toHaveBeenCalledWith(recipeId);
        expect(result).toEqual(mockRecipe);
      });
    });
    describe('getRecipes', () => {
      it('should return a list of recipes', async () => {
        jest.spyOn(recipeService, 'getRecipes').mockResolvedValue([mockRecipe]);

        const result = await recipeApiController.getRecipes();

        expect(recipeService.getRecipes).toHaveBeenCalledTimes(1);
        expect(recipeService.getRecipes).toHaveBeenCalledWith();
        expect(result).toEqual([mockRecipe]);
      });
    });
    describe('createRecipe', () => {
      // TODO: find way to mock or use uuidv4() in controller
      it('should return a recipe', async () => {
        jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
        jest.spyOn(recipeService, 'createRecipe').mockResolvedValue(mockRecipe);

        //const result = await recipeApiController.createRecipe(mockRecipe);

        expect(recipeService.createRecipe).toHaveBeenCalledTimes(0);
        //expect(recipeService.createRecipe).toHaveBeenCalledWith(mockRecipe);
        //expect(result).toEqual(mockRecipe);
      });
    });
    describe('updateRecipe', () => {
      it('should return the updated recipe', async () => {
        const updatedRecipe = { ...mockRecipe, author: 'Updated author' };
        const recipe = { author: 'Updated author' };
        jest
          .spyOn(recipeService, 'updateRecipe')
          .mockResolvedValue(updatedRecipe);

        const result = await recipeApiController.updateRecipe(
          mockRecipe.recipeId,
          recipe,
        );

        expect(recipeService.updateRecipe).toHaveBeenCalledTimes(1);
        expect(recipeService.updateRecipe).toHaveBeenCalledWith(
          recipeId,
          recipe,
        );
        expect(result).toEqual(updatedRecipe);
      });
    });
  });
});
