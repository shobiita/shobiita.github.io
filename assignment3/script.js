const genRandomNumber = (min, max) => {
    return Math.random() * (max-min) + min;
}
/* Above, I have used the Math object to generate a random number of stars between a min and max value. I used the constant of genRandomNumber as the main element that generates a random number of stars  */

const $el = document.body;
/* I have used the body element to set boundaries for were the stars are located. This is so they don't go out of bounds.  */

/* Below I have made links to the html,css. This portion of the Javascript makes specific links to generating the stars within the background */
const genStar = () => {
    const star= document.createElement ("div");
    star.classList.add("star");
/* The classList.add ("star") refers to the label of the stars in the HTML and CSS. It is good to note that this element is linked to the stars, controlling how the stars' visuals appear when twinkling animation is applied.*/

/* Ultimately, the section below displays the positioning of the stars and their coordinates on the x and y-axis. As we are generating new stars after refreshing our page, this ensures that on each refresh a new group of stars are positioned differently than the previous ones */
    let x = genRandomNumber(1, $el.offsetWidth);
    let y = genRandomNumber(1, $el.offsetHeight);

    const { style } = star;

/* The styling of the star mainly refers to the posioning of each star on the night sky. */

    style.left = Math.floor(x) +"px";
    style.top = Math.floor(y) +"px";

    /* Refers to the scaling of the individual stars */
    style.setProperty(
        "--star-size",
        genRandomNumber (1,3) +"px"
    );

    /* This refers to the animation portion of the stars. I have added a twinkling animation through CSS keyframes and this JS makes specific links to it */
    style.setProperty(
        "--twinkle-duration",
        Math.ceil(genRandomNumber (1,5)) + "s"
    );

    /* The --twinkle-delay property ensures that the stars don't occur all at once and are spaced out through random moments */
    style.setProperty(
        "--twinkle-delay",
        Math.ceil(genRandomNumber (1,5)) + "s"
    );

    return star;
}
/* The index gives a set number of stars that are to be generated randomly (sort of like a guided pathway) */
for ( let index = 0; index < 300; index ++){
    $el.append(genStar());
}


