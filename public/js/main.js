// Підключення YouTube API
let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

let currentPlayer = null; // активне відео

document.querySelectorAll(".video-preview").forEach(preview => {
  const playBtn = preview.querySelector(".video-preview__play");

  playBtn.addEventListener("click", () => {
    // if (currentPlayer) {
      // Якщо інше відео вже грає — зупинити його
    //  currentPlayer.stopVideo();
    //  currentPlayer.container.innerHTML = currentPlayer.previewContent;
    //  currentPlayer = null;
    // }

    const videoId = preview.dataset.video;
    const previewContent = preview.innerHTML;

    // Створюємо контейнер для iframe
    preview.innerHTML = `<div id="player-${videoId}"></div>
                         <button class="video-preview__stop">✖</button>`;

    const stopBtn = preview.querySelector(".video-preview__stop");

    // Ініціалізація YouTube player
    const player = new YT.Player(`player-${videoId}`, {
      videoId: videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
      },
    });

    currentPlayer = {
      player: player,
      container: preview,
      previewContent: previewContent
    };

    // Натиснути Stop
    stopBtn.addEventListener("click", () => {
      player.stopVideo();
      preview.innerHTML = previewContent;
      currentPlayer = null;
    });
  });
});


const burger = document.getElementById("burger");
const menu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
  menu.classList.add("active");
  overlay.classList.add("active");
}

function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");
}

burger.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
