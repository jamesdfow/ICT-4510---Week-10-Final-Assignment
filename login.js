// LOGIN HANDLER
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    fetch("https://ict4510.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        const user = data.user;
        sessionStorage.setItem("user", JSON.stringify(user));

        document.getElementById("login-form").style.display = "none";
        document.getElementById("welcome-message").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        loadAndRenderMenuItems();
      })
      .catch((error) => {
        alert("Login error: " + error.message);
        console.error("Login error:", error);
      });
  });

// MENU FORM SUBMIT HANDLER
document
  .getElementById("menu-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const item = document.getElementById("item").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = document.getElementById("price").value.trim();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiKey = user.api_key;
    const token = user.token;

    fetch(`https://ict4510.herokuapp.com/api/menus?api_key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ item, description, price }),
    })
      .then((response) => {
        if (response.status === 201) {
          document.getElementById("menu-form").reset();
          loadAndRenderMenuItems();
        } else {
          throw new Error("Failed to add menu item.");
        }
      })
      .catch((error) => {
        console.error("Error adding menu item:", error);
        alert("There was a problem adding the item.");
      });
  });

// LOAD AND RENDER MENU ITEMS
function loadAndRenderMenuItems() {
  const userData = sessionStorage.getItem("user");
  if (!userData) {
    console.error("User not found in sessionStorage");
    return;
  }

  const user = JSON.parse(userData);
  const apiKey = user.api_key;

  fetch(`https://ict4510.herokuapp.com/api/menus?api_key=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched menu data:", data); // 🔍 Debug log

      const container = document.getElementById("menu-items-container");
      container.innerHTML = "";

      let menus = [];

      if (Array.isArray(data)) {
        menus = data;
      } else if (data.menu && Array.isArray(data.menu)) {
        menus = data.menu;
      } else if (data.item && data.description && data.price) {
        menus = [data];
      }

      if (!menus || menus.length === 0) {
        container.innerHTML = "<p>No menu items found.</p>";
        return;
      }

      menus.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.style.borderBottom = "1px solid #444";
        div.style.padding = "10px 0";

        div.innerHTML = `
          <strong>${item.item}</strong><br>
          ${item.description}<br>
          <em>${item.price}</em><br>
          <button class="btn btn-sm btn-danger" data-id="${item.id}">Delete</button>

        `;

        container.appendChild(div);
      });

      container.querySelectorAll("button[data-id]").forEach((button) => {
        button.addEventListener("click", function () {
          const itemId = this.getAttribute("data-id");
          deleteMenuItem(itemId);
        });
      });

      // Save to localStorage
      localStorage.setItem("menuItems", JSON.stringify(menus));
    })
    .catch((error) => {
      console.error("Error loading menu items:", error);
      const container = document.getElementById("menu-items-container");
      container.innerHTML = "<p>Unable to load menu items.</p>";
    });
}

document.getElementById("logout-button").addEventListener("click", function () {
  // Clear the session
  sessionStorage.removeItem("user");

  // Hide the dashboard
  document.getElementById("dashboard").style.display = "none";

  // Reset and show the login form
  document.getElementById("login-form").reset();
  document.getElementById("login-form").style.display = "flex";

  // Optional: clear menu display
  const container = document.getElementById("menu-items-container");
  if (container) {
    container.innerHTML = "";
  }
});

function deleteMenuItem(itemId) {
  console.log(`Attempting to delete item ID: ${itemId}`);

  const userData = sessionStorage.getItem('user');
  if (!userData) {
    console.error('User not found in sessionStorage');
    return;
  }

  const user = JSON.parse(userData);
  const apiKey = user.api_key;
  const token = user.token;

  console.log('API Key:', apiKey);
  console.log('Token:', token);

  const deleteUrl = `https://ict4510.herokuapp.com/api/menus/${itemId}?api_key=${apiKey}`;
  console.log('Full DELETE URL:', deleteUrl);

  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'x-access-token': token
    }
  })
  .then(response => {
    if (response.status === 204) {
      console.log(`Successfully deleted item ID ${itemId}`);
      loadAndRenderMenuItems(); // Refresh the list
    } else {
      throw new Error(`Failed to delete item (status: ${response.status})`);
    }
  })
  .catch(error => {
    console.error('Delete error:', error);
    alert('There was a problem deleting the item.');
  });
}