"use client";

import { useEffect } from "react";

/**
 * Site-wide scroll motion – plain browser APIs, no animation library.
 * Mounted once in app/layout.tsx. Components only add data attributes:
 *
 *   <div data-reveal>                       fade + rise once in view
 *   <div data-reveal style={{ "--delay": "0.2s" }}>   start later
 *   <ul data-stagger>                       direct children appear one by one (0.08s apart)
 *   <span data-count="412">412</span>       counts up when in view (keeps prefix/suffix: "$12k", "94%")
 *   <SplitText>                             letters / words play when half in view
 *   Icons (SVGs up to 96px in <main> and <footer>) draw their strokes and pop their dots
 *   in when they scroll into view. Opt out with data-no-draw on the svg or a parent.
 *
 * New content (client navigation, streamed sections) is picked up by a MutationObserver.
 * With "reduce motion" everything is shown at once.
 */

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el: HTMLElement) {
  const target = el.dataset.count ?? el.textContent ?? "";
  const match = target.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match || reduceMotion()) return;
  const [, prefix, digits, suffix] = match;
  const end = Number.parseFloat(digits.replace(/,/g, ""));
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  const start = performance.now();
  const duration = 1400;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = (end * eased).toFixed(decimals);
    el.textContent = `${prefix}${digits.includes(",") ? Number(value).toLocaleString("en-US") : value}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

const SHAPES = "path, line, polyline, polygon, circle, ellipse, rect";

/** Stroke "draw-in" + fill "pop" for one icon. */
function drawIcon(svg: SVGSVGElement) {
  const strokes: SVGGeometryElement[] = [];
  const fills: SVGGeometryElement[] = [];
  svg.querySelectorAll<SVGGeometryElement>(SHAPES).forEach((el) => {
    const cs = getComputedStyle(el);
    const stroked = cs.stroke !== "none" && parseFloat(cs.strokeWidth) > 0;
    if (stroked && cs.strokeDasharray === "none") strokes.push(el);
    else if (!stroked && cs.fill !== "none" && el.tagName !== "rect") fills.push(el);
  });
  strokes.forEach((el, i) => {
    el.setAttribute("pathLength", "1");
    const a = el.animate(
      [
        { strokeDasharray: "1", strokeDashoffset: 1 },
        { strokeDasharray: "1", strokeDashoffset: 0 },
      ],
      { duration: 900, delay: 120 + i * 70, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "backwards" },
    );
    a.onfinish = () => el.removeAttribute("pathLength");
  });
  fills.forEach((el, i) => {
    el.style.transformBox = "fill-box";
    el.style.transformOrigin = "center";
    el.animate(
      [
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1 },
      ],
      { duration: 650, delay: 380 + i * 60, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "backwards" },
    );
  });
}

export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute("data-revealed", "");
          if (el.dataset.count !== undefined) countUp(el);
          reveal.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const split = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-split-play", "");
          split.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );

    const icons = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          icons.unobserve(entry.target);
          drawIcon(entry.target as SVGSVGElement);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.6 },
    );

    const scan = () => {
      const reduce = reduceMotion();

      document.querySelectorAll<HTMLElement>("[data-stagger]:not([data-motion])").forEach((list) => {
        Array.from(list.children).forEach((child, i) => {
          const item = child as HTMLElement;
          if (!item.style.getPropertyValue("--delay")) item.style.setProperty("--delay", `${i * 0.08}s`);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-motion]), [data-stagger]:not([data-motion]), [data-count]:not([data-motion])").forEach((el) => {
        el.setAttribute("data-motion", "");
        if (reduce) el.setAttribute("data-revealed", "");
        else reveal.observe(el);
      });

      document.querySelectorAll<HTMLElement>('[data-split][data-trigger="view"]:not([data-motion])').forEach((el) => {
        el.setAttribute("data-motion", "");
        if (reduce) el.setAttribute("data-split-play", "");
        else split.observe(el);
      });

      if (reduce) return;
      // Only icons that start below the fold, so nothing visible on load flickers.
      const fold = window.innerHeight;
      document.querySelectorAll<SVGSVGElement>("main svg:not([data-motion]), footer svg:not([data-motion])").forEach((svg) => {
        svg.setAttribute("data-motion", "");
        if (svg.closest("[data-no-draw], [hidden], [data-split]")) return;
        const r = svg.getBoundingClientRect();
        if (!r.width || r.width > 96 || r.height > 96) return;
        if (r.top < fold) return;
        if (svg.getAnimations({ subtree: true }).length) return;
        icons.observe(svg);
      });
    };

    // Rescan on every DOM change (client navigation, streamed content).
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    };
    const mo = new MutationObserver(schedule);

    // First scan once the page has loaded and React has finished hydrating every segment
    // (the browser is idle), so no attribute is added to markup React still has to check.
    let idle = 0;
    const start = () => {
      const run = () => {
        scan();
        mo.observe(document.body, { childList: true, subtree: true });
      };
      // requestIdleCallback is missing in some Safari versions – fall back to a short timeout.
      const hasIdle = typeof window.requestIdleCallback === "function";
      idle = hasIdle ? window.requestIdleCallback(run, { timeout: 600 }) : window.setTimeout(run, 120);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
      cancelAnimationFrame(frame);
      mo.disconnect();
      reveal.disconnect();
      split.disconnect();
      icons.disconnect();
    };
  }, []);

  return null;
}
