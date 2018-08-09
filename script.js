var RecipeApp = function () {
    var recipes = [
        { 
            id: 1,
            name: 'Best Chicken Soup!', 
            image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            ingredients: [
                { name: 'whole chicken' },
                { name: 'medium carrots'},
                { name: 'onions' },
            ] 
        }
    ];
    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var createRecipe = function(name, link){
        var recipe = {
            name: name,
            image: link, 
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId ++; 
        ingId = 0; //updating IngId with New Recipe
        recipes.push(recipe);
    };
    
    var createIngredients = function(index, text){
        var ingredient = {
            id: ingId,
            name: text
        };

        //keeps recipe ids unique 
        ingId ++; 
        app.recipes[index].ingredients.push(ingredient);
    };
    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();
        var source = $('#recipes-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(this);
        $('.list').append(newHTML); 
        bindEvents(); bindEventsDelete()
        };
    return {
        recipes: recipes,
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients
    }
};

var app = RecipeApp();
//--------EVENTS

function bindEvents() {
    $('.add-ingredients').off();
    $('.add-ingredients').on("click",function () {
        var text = $(this).closest(".mb-3").find('input').val();
        let recipeId = $(this).closest('div.recipe').data().id;
        let obj = findRecipeById(recipeId);
        app.createIngredients(obj.index, text);
        app.renderRecipes();
    });
}
function removeIngredient(btn) {
    let recipeId = $(btn).closest('div.recipe').data().id;
    let commentIndex = $(btn).closest("li").index();
    let obj = findRecipeById(recipeId);
    app.recipes[obj.index].ingredients.splice(commentIndex, 1);
    app.renderRecipes();
}
var findRecipeById = function (id) {
    for (let i = 0; i < app.recipes.length; i += 1) {
        if (app.recipes[i].id === id) {
            return ({index: i, recipe: app.recipes[i]});
        }
    }
};


$('.add-recipe').on('click',function () {
    var name = $('#recipe-name').val();
    var link='https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg';
    var image = link;//$('#recipe-image').val();
    //add recipe to array and render
    app.createRecipe(name, link);
    app.renderRecipes();
});
function bindEventsDelete() {
    $('.close').off();
    $('.recipe').on('click', '.close', function () {
    removeIngredient(this);
});
 }