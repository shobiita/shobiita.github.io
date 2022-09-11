function filterCategory(filterSelection, filterBy){
    let itemsToFilter = Array.from(document.getElementsByClassName("RecipeCardWrapper"));
    //console.log(itemsToFilter);
    for(let listItem of itemsToFilter){
        if(listItem.dataset[filterSelection] === filterBy){
        listItem.style.display = "flex";
        } else{
            listItem.style.display = "none";
        }
    }
}
// As mentioned in the index.html, the filterSelection is essentially the category and the filterBy is to match the recipe with the category;
// The 'IF' function which demonstrates that IF the filterSelecion (data-set ex data-veg) equal to filterBy (yes) then the function will go through and be displayed within the subcategories. This function guides the RecipeCardWrapper depending on the filterBy on what to display within the categories.
function filterAll(){
    let itemsToFilter = Array.from(document.getElementsByClassName("RecipeCardWrapper"));
    for (let listItem of itemsToFilter){
        listItem.style.display="flex";
    }
}
// This is the function to filterAll, meaning all of the recipes contained within the RecipeCardWrapper will get displayed when 'filterAll()' is applied.


