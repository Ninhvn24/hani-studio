// language + theme state
const state = {
  lang: localStorage.getItem("lang") || "en",
  theme: localStorage.getItem("theme") || "light"
};

document.documentElement.setAttribute("data-theme", state.theme);

// Apply language
function applyLang(lang){
  state.lang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-en]").forEach(el=>{
    // Chỉnh textContent thành innerHTML ở dòng dưới đây
    el.innerHTML = (lang === "en") ? el.dataset.en : el.dataset.vi;
  });

  const langBtn = document.getElementById("langBtn");
  if(langBtn){
    langBtn.textContent = (lang === "en") ? "EN" : "VI";
  }
}

// Toggle language
function toggleLang(){
  applyLang(state.lang === "en" ? "vi" : "en");
}

// Toggle theme
function toggleTheme(){
  state.theme = (state.theme === "light") ? "dark" : "light";
  localStorage.setItem("theme", state.theme);
  document.documentElement.setAttribute("data-theme", state.theme);

  const themeBtn = document.getElementById("themeBtn");
  if(themeBtn){
    themeBtn.textContent = (state.theme === "light") ? "☾" : "☼";
  }
}

// Init controls
document.addEventListener("DOMContentLoaded", ()=>{
  const langBtn = document.getElementById("langBtn");
  const themeBtn = document.getElementById("themeBtn");

  if(langBtn) langBtn.addEventListener("click", toggleLang);
  if(themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // set initial button icons
  if(themeBtn){
    themeBtn.textContent = (state.theme === "light") ? "☾" : "☼";
  }

  applyLang(state.lang);

  // scroll animation
  const items = document.querySelectorAll(".fade");
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
});