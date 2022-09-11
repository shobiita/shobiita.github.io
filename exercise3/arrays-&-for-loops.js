var fruit1 = "banana";
var fruit2 = "pineapple";
var fruit3 = "apple";
var fruit4 = "peach";
var fruit5 = "orange";

var fruitArray = ["banana", "pineapple", "apple", "peach", "orange"];

fruitArray[1] = "tomato";

var mixedArray = [42, "pineapple", true, [3, 6, "nine"], "orange"];

//console.log(fruitArray);

for(var fruit of fruitArray){
    console.log(fruit);
}
