document.addEventListener("DOMContentLoaded", () => {
  // 1. Attach click handlers to modal links
  const modalLinks = document.querySelectorAll(".modal-link");
  modalLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      // Identify the target modal by href or a data attribute
      const targetID = link.getAttribute("href").replace("#", "");
      const modal = document.getElementById(targetID);
      if (modal) {
        // Add the .visible class to fade in
        modal.classList.add("visible");
      }
    });
  });

  // 2. Attach click handlers to close buttons
  const closeButtons = document.querySelectorAll(".modal .close");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const modal = btn.closest(".modal");
      if (modal) {
        // Remove the .visible class to fade out
        modal.classList.remove("visible");
      }
    });
  });
});