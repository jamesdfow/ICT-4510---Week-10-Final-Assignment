/*
James Fowler
ICT 4510 Spring Quarter 2025
Description:
 This script runs after the DOM content has fully loaded and is responsible for 
  populating the public-facing menu page with restaurant menu items from an external API.
  
  - It targets the HTML element with the ID "menu-items-list" as the container for menu content.
  - Uses a hardcoded API key to send a GET request to the menu endpoint.
  - Handles different possible data structures returned by the API.
  - Dynamically generates and appends HTML elements to display each item's name, description, and price.
  - If no items are found or if the fetch request fails, it displays an appropriate error message.

  This script is intended for use on a public menu page and does not rely on user authentication.
*/

document.addEventListener('DOMContentLoaded', function () {
  const menuContainer = document.getElementById('menu-items-list');
  const apiKey = 'e2d420aedcdfaa862f20e2d99ea03fde';

  fetch(`https://ict4510.herokuapp.com/api/menus?api_key=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      return response.json();
    })
    .then(data => {
      const menus = Array.isArray(data) ? data
                    : Array.isArray(data.menu) ? data.menu
                    : [];

      if (menus.length === 0) {
        menuContainer.innerHTML = '<p>No menu items available.</p>';
        return;
      }

      menus.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('mb-4', 'p-3', 'border', 'rounded');

        div.innerHTML = `
          <h4>${item.item}</h4>
          <p>${item.description}</p>
          <strong>${item.price}</strong>
        `;

        menuContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error loading menu items:', error);
      menuContainer.innerHTML = '<p>Error loading menu. Please try again later.</p>';
    });
});