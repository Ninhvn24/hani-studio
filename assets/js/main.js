// language state
const state = {
  lang: localStorage.getItem("lang") || "en"
};

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

// Init controls
document.addEventListener("DOMContentLoaded", ()=>{
  const langBtn = document.getElementById("langBtn");

  if(langBtn) langBtn.addEventListener("click", toggleLang);

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