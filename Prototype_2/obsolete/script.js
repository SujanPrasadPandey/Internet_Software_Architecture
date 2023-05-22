document.addEventListener("DOMContentLoaded", () => {
    const locationForm = document.getElementById("locationForm");
  
    locationForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const locationInput = document.getElementById("locationInput").value;
  
      try {
        const response = await fetch("check_location.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location: locationInput }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
  