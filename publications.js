document.addEventListener("DOMContentLoaded", function () {
  console.log("Starting to load publications...");
  
  // Fetch the publications data from the JSON file
  fetch('publications.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(publications => {
      console.log("Publications loaded successfully:", publications);
      
      const gridContainer = document.getElementById('publication-grid');
      if (!gridContainer) {
        console.error("No element with id 'publication-grid' found in the DOM.");
        return;
      }
      
      if (!publications || publications.length === 0) {
        console.error("Publications data is empty.");
        return;
      }
      
      // Use the first publication as the fixed one
      let fixedPublication = publications[0];
      let selectedPublications = publications.slice(1).sort(() => Math.random() - 0.5).slice(0, 15);
      const finalPublications = [fixedPublication, ...selectedPublications];
      
      // Clear any existing content
      gridContainer.innerHTML = '';
      
      finalPublications.forEach(pub => {
        const gridItem = document.createElement('div');
        gridItem.className = "grid-item";
        
        // If this is the fixed publication, link it to the Skip page
        if (pub.title === fixedPublication.title) {
          const linkWrapper = document.createElement('a');
          linkWrapper.href = "skip.html";
          linkWrapper.appendChild(gridItem);
          gridContainer.appendChild(linkWrapper);
        } else {
          gridContainer.appendChild(gridItem);
        }
        
        gridItem.innerHTML = `
          <img src="images/${pub.image}" alt="${pub.title}">
          <div class="grid-overlay">
            <h3 class="book-title">${pub.title}</h3>
            <p class="book-author">${pub.author}</p>
            <p class="book-description">${pub.description}</p>
          </div>`;
      });
      
    })
    .catch(error => {
      console.error("Error loading publications.json:", error);
    });
});
document.addEventListener("DOMContentLoaded", function() {
  // Wait 1 second before sliding the header up
  setTimeout(function() {
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.add('hidden-header');
    }
  }, 1000);
});