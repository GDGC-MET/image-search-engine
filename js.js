const accessKey = "IcVtEE9OJ2snq5yTuaoL475FnpJGHpLOPSW6v3wj0FU"; // Your API key
const imageSection = document.getElementById("imageSection");
const searchInput = document.getElementById("Search");
const searchForm = document.getElementById("searchForm");
const historyList = document.getElementById("historyList");
const showMoreBtn = document.getElementById("showMore");

let page = 1;

async function getImages() {
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        alert("Please enter a search term.");
        return;
    }

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`);

        if (!response.ok) {
            throw new Error("Failed to fetch images.");
        }

        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            imageSection.innerHTML = "";
            updateSearchHistory(keyword); // Update search history
        }

        if (results.length === 0) {
            alert("No images found. Please try a different keyword.");
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image from Unsplash";
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank"; // Open link in a new tab
            imageLink.appendChild(image);
            imageSection.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error fetching images:", error);
        alert("An error occurred while fetching images. Please try again later.");
    }
}

function updateSearchHistory(keyword) {
    const historyItem = document.createElement("li");
    historyItem.textContent = keyword;
    historyItem.onclick = () => {
        searchInput.value = keyword;
        page = 1; // Reset to the first page for the new search
        getImages();
    };
    historyList.appendChild(historyItem);
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Reset page to 1 for new searches
    getImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    getImages();
});
