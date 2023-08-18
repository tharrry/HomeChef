async function getReferenceRecipe() {
    const url = "http://" + window.location.hostname + ":3000/api/recipes/formReference"
    const response = await fetch(url);
    const recipe = await response.json();
    return recipe;
}

function addNextIngredient() {
    let isEmpty = false;
    console.log(this);
}

function addInputForIngredient(outerFieldset, ingredient, addDelete) {
    let legend = document.createElement('legend');
    legend.innerText = `Ingredient:`;
    
    let fieldset = document.createElement('fieldset');
    fieldset.appendChild(legend);
    
    if (addDelete) {
        let button = document.createElement('button');
        button.setAttribute('onclick', 'removeIngredient()');
        button.innerText = 'Delete';
        fieldset.appendChild(button);
    }
    
    Object.keys(ingredient).forEach(elem => {
        let input = document.createElement('input');
        input.setAttribute("id", elem);
        input.setAttribute("name", elem);
        
        let label = document.createElement('label');
        label.setAttribute("for",elem);
        label.innerText = elem[0].toUpperCase() + elem.substring(1);
        
        if (typeof(elem) == 'string') {
            input.setAttribute("type", 'text');
        }
        if (typeof(elem) == 'number') {
            input.setAttribute("type", 'number');
        }
        
        fieldset.appendChild(label);
        fieldset.appendChild(input);
    });
    outerFieldset.appendChild(fieldset);
    fieldset.addEventListener("change", addNextIngredient(fieldset));
}

function addInputForIngredients(form, attrName, recipe) {
    let outerLegend = document.createElement('legend');
    outerLegend.innerText = 'Ingredients:';

    let outerFieldset = document.createElement('fieldset');
    outerFieldset.setAttribute('id', 'ingredients');
    outerFieldset.appendChild(outerLegend);
    
    addInputForIngredient(outerFieldset, recipe[attrName][0], false);
    
    form.appendChild(outerFieldset);
}

function addInputForStringArray(form, attrName, index) {
    let legend = document.createElement('legend');
    legend.innerText = attrName[0].toUpperCase() + attrName.substring(1);

    let fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', attrName);

    let label = document.createElement('label');
    let labelName = attrName.substring(0, attrName.length - 1) + index;
    label.setAttribute("for",labelName);
    
    let input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute("id", labelName);
    input.setAttribute("name", labelName);
    
    fieldset.appendChild(legend);
    fieldset.appendChild(label);
    fieldset.appendChild(input);
    form.appendChild(fieldset);
}

function addInputForComplexAttr(form, attrName, recipe) {
    let attrValue = recipe[attrName];
    if (attrName == 'ingredients') {
        addInputForIngredients(form, attrName, recipe);
    }
    if (typeof(attrValue[0]) == 'string') {
        addInputForStringArray(form, attrName, 0);
    }
}

function addInputForSimpleAttr(form, attrName, recipe) {
    let attrValue = recipe[attrName];

    let label = document.createElement('label');
    label.setAttribute("for",attrName);
    label.innerText = attrName[0].toUpperCase() + attrName.substring(1);

    let input = document.createElement('input');
    input.setAttribute("id", attrName);
    input.setAttribute("name", attrName);

    if (typeof(attrValue) == 'string') {
        input.setAttribute("type", "text");
    }
    if (typeof(attrValue) == 'number') {
        input.setAttribute("type", "number");
    }

    form.appendChild(label);
    form.appendChild(input);
}

function addInputForAttr(form, attrName, recipe) {

    let attrValue = recipe[attrName];

    if (typeof(attrValue) == 'string' || typeof(attrValue) == 'number') {
        addInputForSimpleAttr(form, attrName, recipe);
    }
    
    if (typeof(attrValue) == 'object') {
        addInputForComplexAttr(form, attrName, recipe);
    }
}

function addSubmitButton(form) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('name', 'submit');
    input.setAttribute('value', 'Add Recipe');
    form.appendChild(input);
}

function buildForm(form, recipe) {
    Object.keys(recipe).forEach(elem => {
        addInputForAttr(form, elem, recipe);
        
        //console.log(elem)
        //console.log(recipe[elem])
        //console.log(typeof(elem))
        //console.log(typeof(recipe[elem]))
    });
    addSubmitButton(form);
}

async function prepareForm() {
    let form = document.querySelector('#createrecipeform');
    const reference = await getReferenceRecipe();
    buildForm(form, reference);
}

prepareForm()