document.addEventListener("DOMContentLoaded", function () {
  // Selecting DOM elements
  const menu = document.getElementById("menu");
  const aboutLink = menu.querySelector("a[href='/about']");
  const storeLinks = Array.from(menu.querySelectorAll("a[href^='/stores']"));
  const createLink = menu.querySelector("a[href='/create_store']");
  const pages = Array.from(document.querySelectorAll(".page"));
  const form = document.getElementById("create-store-form");
  const storesList = document.getElementById("stores-list");

  // Hide all pages except the about page initially
  pages.forEach((page) => (page.style.display = "none"));
  document.getElementById("about-page").style.display = "block";

  // Event listeners

  // About link
  aboutLink.addEventListener("click", function (event) {
    event.preventDefault();
    showPage("about-page");
  });

  // Store links
  storeLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const path = this.getAttribute("href").substring(1);
      fetchStores(path);
    });
  });

  // Create link
  createLink.addEventListener("click", function (event) {
    event.preventDefault();
    showPage("create-store-page");
  });

  // Form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;
    const district = document.getElementById("district").value;
    createNewStore(name, url, district);
  });

  // Function to fetch and display stores
  async function fetchStores(path) {
    try {
      const response = await fetch("http://localhost:8081/stores");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.stores.length > 0) {
        data.stores.forEach((store) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = store.url;
          a.textContent = store.name;
          li.appendChild(a);
          storesList.appendChild(li);
        });
      } else {
        storesList.textContent = "No stores found.";
      }
      showPage("stores-page");
    } catch (error) {
      console.error("Error fetching and parsing data:", error);
    }
  }

  // Function to create a new store
  async function createNewStore(name, url, district) {
    try {
      const response = await fetch("http://localhost:8081/stores/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, url, district }),
      });
      const data = await response.json();
      console.log("New store created:", data);
      form.reset();
      fetchStores("/");
    } catch (error) {
      console.error("Error creating store:", error);
      // Show error message or handle as needed
    }
  }

  // Function to show a specific page
  function showPage(pageId) {
    pages.forEach((page) => {
      page.style.display = page.id === pageId ? "block" : "none";
    });
  }
});
