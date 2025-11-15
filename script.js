document.addEventListener("DOMContentLoaded", () => {
  // API NASA

  const nasaApiKey = "b9lF79udYRpT1ve7oPTjdDIzTc3n2vL9PskxF3Di";
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

  // Seletores dos elementos da NASA
  const imgElement = document.getElementById("apod-image");
  const titleElement = document.getElementById("apod-title");
  const explanationElement = document.getElementById("apod-explanation");
  const apodLoading = document.getElementById("apod-loading");

  async function fetchNasaData() {
    try {
      const response = await fetch(apodUrl);
      const data = await response.json();

      apodLoading.style.display = "none";

      if (data.media_type === "image") {
        imgElement.src = data.url;
        imgElement.alt = data.title;
      } else if (data.media_type === "video") {
        console.log("Hoje a APOD é um vídeo:", data.url);
        imgElement.style.display = "none";
      }

      titleElement.textContent = data.title;
      explanationElement.textContent = data.explanation;
    } catch (error) {
      console.error("Erro ao buscar dados da NASA:", error);
      apodLoading.textContent = "Erro ao carregar imagem.";
    }
  }

  // API SpaceX

  const spacexUrl = "https://api.spacexdata.com/v5/launches/next";

  const missionElement = document.getElementById("mission-name");
  const dateElement = document.getElementById("launch-date");
  const countdownElement = document.getElementById("countdown");
  const spacexLoading = document.getElementById("spacex-loading");

  let countdownInterval;

  async function fetchSpaceXData() {
    try {
      const response = await fetch(spacexUrl);
      const data = await response.json();

      spacexLoading.style.display = "none";

      missionElement.textContent = data.name;

      const launchDate = new Date(data.date_utc);
      dateElement.textContent = launchDate.toLocaleString();

      startCountdown(launchDate);
    } catch (error) {
      console.error("Erro ao buscar dados da SpaceX:", error);
      spacexLoading.textContent = "Erro ao carregar dados do lançamento.";
    }
  }

  function startCountdown(targetDate) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownElement.textContent = "Lançamento Realizado!";
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `
                ${days}d ${hours}h ${minutes}m ${seconds}s
            `;
    }, 1000);
  }

  // Iniciar
  fetchNasaData();
  fetchSpaceXData();
});
