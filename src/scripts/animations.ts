import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initAnimations() {
  gsap.registerPlugin(ScrollTrigger); // ← aquí adentro

  // FADE UP
  gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
    gsap.fromTo(el,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  });

  // STAGGER
  gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
    const items = group.querySelectorAll(".stagger-item");
    gsap.fromTo(items,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        stagger: 0.12, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: group, start: "top 85%" },
      }
    );
  });

  gsap.utils
  .toArray(".illuminate-text")
  .forEach((el) => {

    const text = el.textContent;

    const words =
      text.split(" ");

    el.innerHTML =
      words.map((word) =>
        `<span class="word">${word}</span>`
      ).join(" ");

    gsap.to(
      el.querySelectorAll(".word"),

      {
        color: "#FFFFFF",

        stagger: 0.08,

        ease: "none",

        scrollTrigger: {
          trigger: el,
          start: "top 55%",
          end: "bottom 60%",
          scrub: true,
        },

      }
    );

  });

  // IMAGE REVEAL
  gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((image) => {
    gsap.fromTo(image,
      { scale: 1.12, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: image, start: "top 88%" },
      }
    );
  });

  // PARALLAX
  gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
    gsap.to(el, {
      yPercent: -15, duration: 1.2, ease: "none",
      scrollTrigger: { trigger: el, scrub: true },
    });
  });

  // MARQUEE
  gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track) => {
    gsap.to(track, { xPercent: -50, duration: 30, repeat: -1, ease: "none" });
  });

  // MAGNETIC BUTTONS
  gsap.utils.toArray<HTMLElement>(".magnetic").forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(button, { x: x * 0.12, y: y * 0.12, duration: 0.6, ease: "power3.out" });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });
    });
  });

  // =========================
// TEXT SPLIT (word by word)
// =========================
gsap.utils.toArray<HTMLElement>(".split-words").forEach((el) => {
  const words = el.innerText.split(" ");
  el.innerHTML = words
    .map(w => `<span class="word-split" style="display:inline-block; overflow:hidden;">
                  <span style="display:inline-block">${w}</span>
                </span>`)
    .join(" ");

  const spans = el.querySelectorAll(".word-split span");

  gsap.fromTo(spans,
    { y: "110%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      stagger: 0.06,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    }
  );
});



// =========================
// CLIP-PATH IMAGE REVEAL
// =========================
gsap.utils.toArray<HTMLElement>(".clip-reveal").forEach((el) => {
  gsap.fromTo(el,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.4,
      ease: "power4.inOut",
      scrollTrigger: { trigger: el, start: "top 85%" },
    }
  );
});

// =========================
// COUNTER
// =========================
gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
  const target = parseFloat(el.dataset.target || "0");
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";

  gsap.fromTo({ val: 0 }, { val: target },
    {
      duration: 2,
      ease: "power2.out",
      onUpdate: function () {
        el.textContent = prefix + Math.round(this.targets()[0].val) + suffix;
      },
      scrollTrigger: { trigger: el, start: "top 85%" },
    }
  );
});

// =========================
// LINE DRAW (SVG)
// =========================
gsap.utils.toArray<SVGPathElement>(".line-draw").forEach((path) => {
  const length = path.getTotalLength();
  gsap.fromTo(path,
    { strokeDasharray: length, strokeDashoffset: length },
    {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: path, start: "top 85%" },
    }
  );
});

// =========================
// SCRAMBLE TEXT REVEAL
// =========================
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function scrambleEl(el: HTMLElement, delay: number) {
  const text = el.dataset.scramble || el.innerText;
  el.innerHTML = "";
  let frame = 0;

  setTimeout(() => {
    const interval = setInterval(() => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") { output += " "; continue; }
        const resolveAt = i * 4 + 20;
        if (frame >= resolveAt) {
          output += text[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.innerHTML = output;
      frame++;
      if (frame > text.length * 4 + 20) clearInterval(interval);
    }, 30);
  }, delay);
}

gsap.utils.toArray<HTMLElement>(".scramble-line").forEach((el, i) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    onEnter: () => scrambleEl(el, i * 280),
    once: true,
  });
});

// =========================
// LINE MASK REVEAL (editorial)
// =========================
gsap.utils.toArray<HTMLElement>(".reveal-heading").forEach((heading) => {
  const lines = heading.querySelectorAll(".reveal-line");

  gsap.set(lines, { y: "110%", opacity: 0 });

  ScrollTrigger.create({
    trigger: heading,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(lines, {
        y: "0%",
        opacity: 1,
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.18,
      });
    },
  });
});

// gsap.set(".fade-up", {
//   opacity: 0,
//   y: 40,
// });

// gsap.to(".fade-up", {
//   opacity: 1,
//   y: 0,
//   duration: 1,
//   stagger: 0.1,
// });

gsap.set(".split-words", {
  opacity: 0,
  y: 40,
});

gsap.to(".split-words", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.1,
});

  ScrollTrigger.refresh();
}

