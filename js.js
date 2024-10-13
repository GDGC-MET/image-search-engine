const acceskey = "Enter your api key"
const accessurl = "https://api.unsplash.com/photos/?page="

const serachinput = document.getElementById("Search");
const searchbtn = document.getElementById("btn");
const resultSection = document.querySelector(".imagesec");
const FormEL = document.querySelector("form");
const showMoreBtn = document.getElementById("showMore");

let page = 1;


async function getImages() {
    const keyword = serachinput.value;
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${acceskey}&per_page=12`);

    const data = await response.json();
    console.log(data);

    const results = data.results;

    if (page === 1) {
        resultSection.innerHTML = "";

    }



    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.appendChild(image);
        resultSection.appendChild(imageLink);




    })

    showMoreBtn.style.display = "block";


}


FormEL.addEventListener("submit", (event) => {
    event.preventDefault();
    getImages();
})

showMoreBtn.addEventListener("click", (e) => {
    page++;
    getImages();


})
