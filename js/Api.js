async function getQuote() {
    let anime;
    let character;
    let quote;
    const data = await fetch("https://animechan.xyz/api/random");
    const json = await data.json();
    anime = json.anime;
    character = json.character;
    quote = json.quote;
 

    if (quote) {
        document.getElementById("quote").innerText = "''" + quote + "''";
    }
    
    if (character){
        document.getElementById("character").innerText = "- " + character;
    }
   
    if (anime) {
        document.getElementById("anime").innerText = "Anime: " + anime;
    }

}
 
getQuote();

function button() {
    location.reload();
}

function knapp() {
    location.href = "programmering.html";
}