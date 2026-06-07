import Lenis from "lenis";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {

  const lenis = new Lenis({

    duration: 1.2,

    lerp: 0.08,

    smoothWheel: true,

    wheelMultiplier: 1,

    touchMultiplier: 1.5,

    infinite: false,

  });

  // RAF LOOP
  function raf(time: number) {

    lenis.raf(time);

    requestAnimationFrame(raf);

  }

  requestAnimationFrame(raf);

  // GSAP SYNC
  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

}