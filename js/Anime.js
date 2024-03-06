async function getAnime() {
    let anime_name
    let anime_img
    let anime_fact
    const data = await fetch('https://animechan.vercel.app/api/random')
    const anime = await data.json()
    anime_name = anime.anime
    anime_fact = anime.quote
    anime_img = `https://source.unsplash.com/1600x900/?${anime_name}`

    if (anime_name) {
    document.getElementById('anime_name').innerHTML = "" + anime_name + "";
}
if (anime_img) {
    document.getElementById('anime_img').innerHTML = "<img src='" + anime_img + "' alt='anime_img' />";
}
if (anime_fact) {
    document.getElementById('anime_fact').innerHTML = "" + anime_fact + "";
}
}