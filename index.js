const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById("state-input");
const button = document.getElementById("get-alerts-btn");
const alertSection = document.getElementById("alerts");
const errorDiv = document.getElementById("error-message");

// ===============================
// FETCH WEATHER ALERTS
// ===============================
async function fetchWeatherAlerts(state) {
    try {
        const response = await fetch(`${weatherApi}${state}`);

        if (!response.ok) {
            throw new Error("Failed to fetch weather alerts");
        }

        const data = await response.json();
        displayAlerts(data);

    } catch (error) {
        displayError(error.message);
    }
}

// ===============================
// DISPLAY ALERTS
// ===============================
function displayAlerts(data) {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";

    alertSection.innerHTML = "";

    const alerts = data.features;

    if (!alerts || alerts.length === 0) {
        alertSection.textContent = "No active alerts found.";
        return;
    }

    const summary = document.createElement("h3");
    summary.textContent = `${data.title}: ${alerts.length}`;
    alertSection.appendChild(summary);

    const list = document.createElement("ul");

    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        list.appendChild(li);
    });

    alertSection.appendChild(list);
}

// ===============================
// DISPLAY ERROR
// ===============================
function displayError(message) {
    alertSection.innerHTML = "";

    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

// ===============================
// BUTTON CLICK EVENT
// ===============================
button.addEventListener("click", () => {
    const state = input.value.trim().toUpperCase();

    if (!state) {
        displayError("Please enter a state code");
        return;
    }

    fetchWeatherAlerts(state);
    input.value = "";
});

// ===============================
// EXPORT (FOR TESTS)
// ===============================
if (typeof module !== "undefined") {
    module.exports = {
        fetchWeatherAlerts,
        displayAlerts,
        displayError
    };
}