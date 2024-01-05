async function fetchFortniteData() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/cosmetics/br');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching Fortnite data:', error);
        return [];
    }
}

async function fetchFortnitePlaylists() {
    try {
        const response = await fetch('https://fortnite-api.com/v1/playlists');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching Fortnite playlists:', error);
        return [];
    }
}

async function fetchFortniteSprays() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/cosmetics/br');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching Fortnite sprays:', error);
        return [];
    }
}

async function search() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filter = document.getElementById("filterSelect").value;

    let data = [];

    if (filter === "Playlist") {
        data = await fetchFortnitePlaylists();
    } else if (filter === "Spray") {
        data = await fetchFortniteSprays();
    } else {
        data = await fetchFortniteData();
    }

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    data.forEach(item => {
        if ((filter === "all" || (filter === "Playlist" && item.type === "playlist") || (filter === "Spray" && item.type === "spray") || item.type.value === filter) && item.name.toLowerCase().includes(searchTerm)) {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `<img src="${item.images.icon}" alt="${item.name}">
                                <p>ID: ${item.id}</p>
                                <p>Name: ${item.name}</p>
                                <p>Type: ${filter === "Playlist" ? "Playlist" : (filter === "Spray" ? "Spray" : item.type.value)}</p>`;
            resultsContainer.appendChild(itemDiv);
        }
    });
}

// Initial search when the page loads
search();
