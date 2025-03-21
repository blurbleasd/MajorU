document.addEventListener("DOMContentLoaded", function () {
  // Fetch publication data from the JSON file
  fetch('publications.json')
    .then(response => response.json())
    .then(publications => {
      const featuredContainer = document.getElementById('featured-books');
      if (featuredContainer && publications.length) {
        // Use the first publication as the fixed publication
        let fixedPublication = publications[0];
        let otherPubs = publications.slice(1);
        let selectedFeatured = otherPubs.sort(() => Math.random() - 0.5).slice(0, 2);
        let featuredArray = [fixedPublication, ...selectedFeatured];
        // Shuffle so the fixed publication can appear anywhere among the three
        featuredArray.sort(() => Math.random() - 0.5);
      
        featuredContainer.innerHTML = '';
      
        featuredArray.forEach(pub => {
          const featuredItem = document.createElement('div');
          featuredItem.className = "featured-item";
          
          // If this is the fixed publication, wrap it in a link to skip.html
          if (pub.title === fixedPublication.title) {
            const linkWrapper = document.createElement('a');
            linkWrapper.href = "skip.html";
            linkWrapper.appendChild(featuredItem);
            featuredContainer.appendChild(linkWrapper);
          } else {
            featuredContainer.appendChild(featuredItem);
          }
          
          // Output the featured item markup with separate grid cells for title and author
          featuredItem.innerHTML = `
            <img src="images/${pub.image}" alt="${pub.title}">
            <div class="featured-info">
              <div class="featured-title">${pub.title}</div>
              <div class="featured-author">${pub.author}</div>
            </div>`;
        });
      }
    })
    .catch(error => console.error("Error loading publications.json:", error));
  
  // Contact form: Toggle file upload for "Photo Submission"
  var messageTypeSelect = document.getElementById('message-type');
  var photoUploadDiv = document.getElementById('photo-upload');
  
  if (messageTypeSelect && photoUploadDiv) {
    messageTypeSelect.addEventListener('change', function() {
      photoUploadDiv.style.display = (this.value === 'photo') ? 'block' : 'none';
    });
    messageTypeSelect.dispatchEvent(new Event('change'));
  }
});