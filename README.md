# HomeChef


Add and edit you own recipe book, manage your food storage and get the best discounts in shops near you. Two of three of these features still need to be implemented.

## Setup
### Development
#### Prerequisits
`npm` version 9.8.1 or equivalent
`node` version v20.1.0 or higher

1. Clone the repository
2. Setup a mongoDB database instance. I used mongoDB Atlas. Be aware that the IP whitelist of your Atlas instance needs to be updated regularly if you are running home chef in you private network. Scripts to do so will be added in the future, see Issues #34 and #35.
3. In `./homechef/src create` create a file `secret.ts` with the following content:
```
export { mongodbURL }

const mongodbURL = "you/mongodb/url/?retryWrites=true&w=majority";
```
4. Enter the `Homechef/homechef` directory
5. Run `npm install`
6. Run `npm run start:dev` to run a development server on port 3000. Homechef is now available at `localhost:3000`.
### Deployment
#### Prerequisits
`docker` version 24.0.5 or equivalent
1. Enter the `Homechef/homechef` directory
2. Run `docker build -t home-chef --network=host .` The `--network=host` may not be necessary on your machine.
3. Run `docker run -d -p 3000:3000 -p 27017:27017 home-chef`. If you chose to go with Atlas, the container may fail to establish a connection with the database. In that case:
4. Run `docker run -d --network host home-chef`. Using `--network host` is not advised as it provides no isolation. If you find the reason why step 3 may not work, please enlighten me in issue #36.

## Routes

The following routes are currently implemented:
| Route  | Function |
| ------------- | ------------- |
| `/`  | Returns Homepage, lives in `app.controller.ts` |
| ------------- | ------------- |
| `/recipes/`  | API endpont returning HTML docuemnts for all sub pages of recipes API, lives in `/recipes/reciper.controller.ts`  |
| GET `/recipes/`  | API endpont returning HTML document listing recipes provided by GET `/api/recipes/` |
| GET `/recipes/create`  | API endpont returning HTML document with a form to create a new recipe |
| GET `/recipes/:recipeId`  | API endpont returning HTML document displaying the recipe provided by GET `/api/recipes/:recipeId` |
| ------------- | ------------- |
| `/api/recipes/`  | API endpont for recipe CRUD operations, lives in `/recipes/reciper.controller.ts` |
| GET `/api/recipes/`  | API endpont returning a list of all currently existing recipes in the database |
| POST `/api/recipes/`  | API endpont creating and returning a recipe based on the provided CreateRecipeDto object |
| GET `/api/recipes/:recipeId`  | API endpont returning a recipe corresponding to the provided id |
| PATCH `/api/recipes/:recipeId`  | API endpont updating and returning a recipe corresponding to the provided id based on the provided UpdateRecipeDto object |
| DELETE `/api/recipes/:recipeId`  | API endpont deleting a recipe corresponding to the provided id |
