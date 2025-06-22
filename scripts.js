fetch('/message')
    .then((resp) => resp.text())
    .then((text) => {
        const h1 = document.getElementById('heading');
        h1.textContent = text;
});

const button = document.getElementById("button");
button.addEventListener("click", () => {
    fetch('/movies')
    .then((resp) => resp.json()) // <-- use .json() not .text()
    .then((movies) => {
        const container = document.querySelector('.movielist');
        container.innerHTML = ''; // clear existing
		container.classList.remove("movielisttwo");

        movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <div class="info">ID: ${movie.id}</div>
            <div class="info">Title: ${movie.title}</div>
            <div class="info">Release Date: ${movie.release_date}</div>
            <div class="info">Rating: ${movie.rating}</div>
        `;
        container.appendChild(movieDiv);
        });
    });
});

const comments = document.getElementById("commentsdisplay");
comments.addEventListener("click", () => {
    fetch('/movies')
    .then((resp) => resp.json()) // <-- use .json() not .text()
    .then((movies) => {
        const container = document.querySelector('.movielist');
        container.innerHTML = ''; // clear existing
        container.classList.add("movielisttwo");

        movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <div class="user">ID: ${movie.id}</div>
            <div class="comment">Title: ${movie.title}</div>
            <div class="date">Release Date: ${movie.release_date}</div>
            <div class="likes">Rating: ${movie.rating}</div>
        `;
        container.appendChild(movieDiv);
        });
    });
});

const button2 = document.getElementById("button2");
button2.addEventListener("click", () => {
fetch('/favorites')
    .then((resp) => resp.json())
    .then((favorites) => {
    const container = document.querySelector('.movielist');
    container.innerHTML = ''; // Clear previous content
	container.classList.remove("movielisttwo");

    favorites.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
        <div class="info">ID: ${movie.id}</div>
        <div class="info">Title: ${movie.title}</div>
        <div class="info">Release Date: ${movie.release_date}</div>
        <div class="info">Rating: ${movie.rating}</div>
        `;
        container.appendChild(movieDiv);
    });
    });
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    document.querySelector('.movielist').innerHTML = '';
})

const updateButton = document.getElementById("update-button");
updateButton.addEventListener("click", async () => {
    const movieId = document.getElementById("update-id").value;
    const newRating = parseFloat(document.getElementById("update-rating").value);

    if (!movieId || isNaN(newRating)) {
        alert("Please enter a valid movie ID and rating.");
        return;
    }

    const response = await fetch(`/movies/${movieId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating: newRating })
    });

    const result = await response.json();
    if (result.ok) {
        alert("Rating updated successfully.");
        button.click(); // reload movie list
    } else {
        alert("Failed to update rating.");
    }
});

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", async () => {
    const title = document.getElementById("new-title").value;
    const releaseDate = document.getElementById("new-release").value;
    const rating = parseFloat(document.getElementById("new-rating").value);

    if (!title || !releaseDate || isNaN(rating)) {
        alert("Please fill out all fields with valid data.");
        return;
    }

    const response = await fetch("/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            release_date: releaseDate,
            rating
        })
    });

    const result = await response.json();
    if (result.ok) {
        alert("Movie added successfully!");
        button.click(); // Refresh the movie list
    } else {
        alert("Failed to add movie.");
    }
});
