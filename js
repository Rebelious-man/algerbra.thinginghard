const frame = document.getElementById("frame");
const loader = document.getElementById("loader");
const input = document.getElementById("url");
const form = document.getElementById("form");

function showLoader() { loader.classList.add("active"); }
function hideLoader() { loader.classList.remove("active"); }

function isURL(text) {
  try { new URL(text); return true; } catch { return false; }
}

function searchOrNavigate(value) {
  let url;
  if (isURL(value)) {
    url = value.startsWith("http") ? value : "https://" + value;
  } else {
    url = `https://lite.qwant.com/?q=${encodeURIComponent(value)}`;
  }

  showLoader();
  frame.style.display = "block";
  frame.src = url;

  frame.onload = hideLoader;
  frame.onerror = () => {
    hideLoader();
    window.open(url, "_blank");
  };
}

form.addEventListener("submit", e => {
  e.preventDefault();
  searchOrNavigate(input.value.trim());
});

document.querySelectorAll("aside a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const url = link.dataset.link;
    input.value = url;
    searchOrNavigate(url);
  });
});
