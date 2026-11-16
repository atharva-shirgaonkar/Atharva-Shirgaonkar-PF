// Portfolio animations: Lenis (smooth scroll) + GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Scroll progress bar
  gsap.to("#bar", { scaleX: 1, ease: "none", scrollTrigger: { scrub: 0.3, start: 0, end: "max" } });

  // Grid lights up around the cursor
  addEventListener("mousemove", e => {
    document.documentElement.style.setProperty("--mx", e.clientX + "px");
    document.documentElement.style.setProperty("--my", e.clientY + "px");
  });

  // Hero: photo rises, then the JSON prints line by line
  gsap.from(".photo", { y: 50, opacity: 0, duration: 1.1, ease: "power3.out" });
  gsap.to(".code .l", { opacity: 1, duration: .01, stagger: .32, delay: .5 });

  // Pinned statement: words light up green
  const p = document.getElementById("words");
  p.innerHTML = p.textContent.split(" ").map(w => `<span class="w">${w}</span>`).join(" ");
  gsap.to(".w", { color: "#39d98a", stagger: .1, ease: "none",
    scrollTrigger: { trigger: ".pin", start: "top top", end: "+=1600", scrub: true, pin: true } });

  // Projects: horizontal scroll
  const track = document.querySelector(".track");
  gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: "none",
    scrollTrigger: { trigger: ".hz", start: "top top", end: () => "+=" + track.scrollWidth, scrub: true, pin: true, invalidateOnRefresh: true } });

  // Experience line draws as you scroll
  gsap.to(".line", { scaleY: 1, ease: "none",
    scrollTrigger: { trigger: ".exp-wrap", start: "top 60%", end: "bottom 70%", scrub: true } });

  // Reveal on scroll
  gsap.utils.toArray(".reveal").forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" } }));
}
