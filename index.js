const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");

const display = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

function clearUI() {
  display.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

function isValidState(code) {
  return /^[A-Z]{2}$/.test(code);
}

async function fetchAlerts(state) {
  const response = await fetch(
    https://api.weather.gov/alerts/active?area=${state}
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather alerts.");
  }

  return await response.json();
}

function renderAlerts(data) {
  const alerts = data.features;


  const summary = document.createElement("h2");
  summary.textContent = Weather Alerts: ${alerts.length};
  display.appendChild(summary);

  const ul = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  display.appendChild(ul
}

button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  clearUI();

  // validation
  if (!isValidState(state)) {
    showError("Please enter a valid 2-letter state code (e.g. NY).");
    return;
  }

  try {
    const data = await fetchAlerts(state);

renderAlerts(data);

input.value = ""; // clear input after success
  } catch (error) {
    showError(error.message);
  }
});
