import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { getModelToken } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateRecipeDtoStub } from './dto/create-recipe.dto.stub';

describe('RecipeService', () => {
    let recipeService: RecipeService;
    let model: Model<Recipe>;

    const recipeId = 'a first uuid';

    const mockRecipe = {
        _id: '64d39261182f32e4fea58460',
        recipeId: 'a first uuid',
        author: 'Otto',
        userAdded: 'Martin',
        dishName: 'Dish One',
        feeds: 4,
        description: 'A good first recipe',
        ingredients: [{
            name: "First ingredient",
            quantity: 1,
            unit: "tbsp"
        }],
        steps: ["Step 1", "Step 2"],
        tags: ["Tag 1", "Tag 2"]
    }

    const mockRecipeDto = CreateRecipeDtoStub();

    const mockRecipeService = {
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          RecipeService,
          {
            provide: getModelToken(Recipe.name),
            useValue: mockRecipeService,
          },
        ],
      }).compile();
  
      recipeService = module.get<RecipeService>(RecipeService);
      model = module.get<Model<Recipe>>(getModelToken(Recipe.name));
    });

    describe('getRecipes', () => {
        it('should return an array of Recipes', async () => {
    
          jest.spyOn(model, 'find').mockResolvedValue(
            [mockRecipe]
          );

          const result = await recipeService.getRecipes();

          expect(model.find).toHaveBeenCalledWith({});
          expect(result).toEqual([mockRecipe]);
        });
    });

    describe('createRecipe', () => {
        it('should create and return a Recipe', async () => {
          const newRecipe = mockRecipeDto;
    
          jest.spyOn(model, 'create' as any)
            .mockReturnValue(Promise.resolve(mockRecipe));
    
          const result = await recipeService.createRecipe(
            { ...newRecipe, recipeId: mockRecipe.recipeId},
          );
    
          expect(result).toEqual(mockRecipe);
        });
      });

describe('getRecipeById', () => {
    // TODO: Reimplement validation, then reimplement validation test
    it('should find and return a Recipe by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockRecipe);

      const result = await recipeService.getRecipeByID(mockRecipe._id);

      expect(model.findById).toHaveBeenCalledTimes(1);
      expect(model.findById).toHaveBeenCalledWith(mockRecipe._id);
      expect(result).toEqual(mockRecipe);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(recipeService.getRecipeByID(id)).rejects.toThrow(
        BadRequestException,
      );
      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });

    it('should throw NotFoundException if book is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(recipeService.getRecipeByID(mockRecipe._id)).rejects.toThrow(
        NotFoundException,
      );
      expect(model.findById).toHaveBeenCalledWith(mockRecipe._id);
    });
  });
  describe('updateById', () => {
    it('should update and return a book', async () => {
      const updatedRecipe = { ...mockRecipe, author: 'Updated author' };
      const recipe = { author: 'Updated author' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedRecipe);

      const result = await recipeService.updateRecipe(mockRecipe.recipeId, recipe as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockRecipe.recipeId, recipe, {
        new: true,
        runValidators: true,
      });
      expect(result.author).toEqual(recipe.author);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a book', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockRecipe);

      const result = await recipeService.deleteRecipe(mockRecipe.recipeId);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockRecipe.recipeId);
      expect(result).toEqual(mockRecipe);
    });
  });
});