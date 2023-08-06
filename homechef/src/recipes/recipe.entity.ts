
export class Recipe {
    constructor(
        public id: number,
        public author: string,
        public userAdded: string,
        public name: string,
        public description: string,
        public ingredients: Ingredient[],
        public tags: string[]) {}
  }
  
// Define the Ingredient interface (a custom object for ingredients)
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}
