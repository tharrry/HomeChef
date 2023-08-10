async function getRecipes() {
    const response = await fetch("api/recipes");
    const recipes = await response.json();
    return recipes;
}

function buildHTMLForRecipes(recipes) {
    
    let html = "<ul>";

    recipes.forEach(recipe => {
        html += "<li><h2>" + recipe.dishName + "</h2><p>" + recipe.author + "</p>";
    });

    html+= "</ul>";

    console.log(html);

    return html;
}

async function printRecipes() {
    const recipes = await getRecipes();

    let recipeDiv = document.querySelector('#recipes');

    recipeDiv.innerHTML = buildHTMLForRecipes(recipes);

}



printRecipes();