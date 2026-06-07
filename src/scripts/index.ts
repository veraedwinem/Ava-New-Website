import { initAnimations } from "./animations";
import { initSmoothScroll } from "./smoothScroll";

document.addEventListener(
  "astro:page-load",
  () => {
    initAnimations();
    initSmoothScroll();
    console.log("Animations ready")
  }
);

window.addEventListener("load", () => {
  initAnimations(); // animations.ts ya NO escucha "load" internamente
  initSmoothScroll();
});