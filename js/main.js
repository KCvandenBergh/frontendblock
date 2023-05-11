window.addEventListener('load', init);

let apiUrl = "./webservices/index.php";
let gallery = document.getElementById('gallery');
let modal = document.getElementById('myModal');

function init() {
    ajaxRequest(apiUrl, makeDataCard)
}

const ajaxRequest = (url, func) => {
    console.log(apiUrl);
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(func)
        .catch((error) => {
            console.log(error)
        });
}

function makeDataCard(data) {

    for (let card of data) {
        console.log(data);

        let countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.dataset.id = card.id;

        gallery.appendChild(countryCard);

        let favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('favoriteBtn');
        favoriteBtn.innerHTML = "🤍";


        let isFavorite = JSON.parse(localStorage.getItem(`favoriteItem-${card.id}`)) || false;

        // Set the innerHTML of the button according to stored state
        if (isFavorite) {
            favoriteBtn.innerHTML = "❤️";
        } else {
            favoriteBtn.innerHTML = "🤍";
        }

        favoriteBtn.addEventListener('click',()=>{
            if(!isFavorite){
                localStorage.setItem(`favoriteItem-${card.id}`, JSON.stringify(true));
                isFavorite = true;
                favoriteBtn.innerHTML = "❤️";
            }else{
                localStorage.removeItem(`favoriteItem-${card.id}`);
                isFavorite = false;
                favoriteBtn.innerHTML = "🤍";
            }
        });

        countryCard.appendChild(favoriteBtn);

        let image = document.createElement('img');
        image.src = card.image;
        image.classList.add('image');
        countryCard.appendChild(image);

        let place = document.createElement('h3')
        place.classList.add('product-price');
        place.innerHTML = `${card.place}`;
        countryCard.appendChild(place);

        let name = document.createElement('h2');
        name.classList.add('country-name');
        name.innerHTML = `${card.name}`;
        countryCard.appendChild(name);

        let detailsBtn = document.createElement('button');
        detailsBtn.classList.add('detailsBtn');
        detailsBtn.innerHTML = 'ℹ';
        detailsBtn.dataset.id = card.id;
        detailsBtn.addEventListener('click', () => {
            ajaxRequest(`${apiUrl}?id=${card.id}`, showDetails)
        });

        countryCard.appendChild(detailsBtn);
    }

}

function showDetails(card) {

    modal.style.visibility = 'visible';
    let detailsCard = document.getElementById('modal-content')

    console.log(detailsCard)
    //empty the div
    detailsCard.innerHTML = "";
    // detailsCard.style.display = 'block';

    //add content title:
    let detailsName = document.createElement("h2")
    detailsName.innerHTML = card.detailsCard + 'Details:';
    detailsCard.appendChild(detailsName);

    //add ingredients
    let ingredients = document.createElement("p");
    ingredients.innerHTML = card.ingredients;
    detailsCard.appendChild(ingredients);

    let category = document.createElement("h5");
    category.innerHTML = 'Categorie:' + '' + card.tags;
    detailsCard.appendChild(category);

    console.log(card.ingredients)

    let closeDetails = document.getElementById('modal-close');
    closeDetails.addEventListener("click", () => {
        modal.style.visibility = "hidden";
    });
}