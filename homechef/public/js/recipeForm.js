let INGREDIENT;

async function getReferenceRecipe() {
    const url = "http://" + window.location.hostname + ":3000/api/recipes/formReference"
    const response = await fetch(url);
    const recipe = await response.json();
    return recipe;
}

function addNextIngredient(fieldset) {
    let outerFieldset = document.querySelector("#ingredients");
    let emptyChildren = 0;

    outerFieldset.childNodes.forEach(childfieldset => {
        if (childfieldset.tagName != 'LEGEND') {
            let allChildrenEmpty = true;
            childfieldset.childNodes.forEach(child => {
                if (child.tagName === 'INPUT') {
                    if (!child.value == '') {
                        allChildrenEmpty = false;
                    }
                }
            });
            if (allChildrenEmpty == true) {
                emptyChildren += 1;
            }
        }
    });

    if (emptyChildren < 1 ) {
        addInputForIngredient(true);
    }
}

function removeIngredient(fieldset) {

}

function addInputForIngredient(addDelete) {

    let outerFieldset = document.querySelector("#ingredients");
    const children = outerFieldset.children.length;

    let legend = document.createElement('legend');
    legend.innerText = `Ingredient:`;
    
    let fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', `fieldset${children}`);
    fieldset.appendChild(legend);
    
    if (addDelete) {
        let button = document.createElement('button');
        button.setAttribute('onclick',  function() { removeIngredient(fieldset)});
        button.innerText = 'Delete';
        fieldset.appendChild(button);
    }
    
    Object.keys(INGREDIENT).forEach(elem => {
        console.log(elem)
        console.log(typeof(elem))
        console.log(INGREDIENT[elem])
        console.log(typeof(INGREDIENT[elem]))
        let input = document.createElement('input');
        input.setAttribute("name", elem);
        
        let label = document.createElement('label');
        label.setAttribute("for",elem);
        label.innerText = elem[0].toUpperCase() + elem.substring(1);
        
        if (typeof(INGREDIENT[elem]) == 'string') {
            input.setAttribute("type", 'text');
        }
        if (typeof(INGREDIENT[elem]) == 'number') {
            input.setAttribute("type", 'number');
        }
        
        fieldset.appendChild(label);
        fieldset.appendChild(input);
    });
    outerFieldset.appendChild(fieldset);
    fieldset.childNodes
    fieldset.addEventListener('change', function () {
        addNextIngredient(fieldset);
    });
}

function addInputForIngredients(form, attrName, recipe) {

    INGREDIENT = recipe[attrName][0];

    let outerLegend = document.createElement('legend');
    outerLegend.innerText = 'Ingredients:';

    let outerFieldset = document.createElement('fieldset');
    outerFieldset.setAttribute('id', 'ingredients');
    outerFieldset.appendChild(outerLegend);
    form.appendChild(outerFieldset);

    let addButton = document.createElement('button');
    addButton.setAttribute('onclick',  function() {
        addInputForIngredient(true)
    });

    addInputForIngredient(false);
    
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
    });
    addSubmitButton(form);
}

async function prepareForm() {
    let form = document.querySelector('#createrecipeform');
    const reference = await getReferenceRecipe();
    buildForm(form, reference);
}

prepareForm()