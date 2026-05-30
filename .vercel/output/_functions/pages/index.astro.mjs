/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, r as renderHead, e as renderComponent, f as renderTemplate, g as renderSlot, h as renderScript, i as addAttribute, u as unescapeHTML } from '../chunks/astro/server_CU7ONBb9.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import 'clsx';
export { renderers } from '../renderers.mjs';

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    let resizeTimeout;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();
    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);
  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId;
    const draw = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }
        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      animationId = requestAnimationFrame(draw);
    };
    animationId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: 2 * Math.PI * i / sparkCount,
      startTime: now
    }));
    sparksRef.current.push(...newSparks);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        position: "relative"
      },
      onClick: handleClick,
      children: [
        /* @__PURE__ */ jsx(
          "canvas",
          {
            ref: canvasRef,
            style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none"
            }
          }
        ),
        children
      ]
    }
  );
};

const ClickSparkWrapper = ({ children }) => {
  return /* @__PURE__ */ jsx(
    ClickSpark,
    {
      sparkColor: "#a476ff",
      sparkSize: 8,
      sparkRadius: 20,
      sparkCount: 12,
      duration: 500,
      easing: "ease-out",
      extraScale: 1.2,
      children
    }
  );
};

const Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222"
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - gridOffset.current.x % squareSize;
          const squareY = y - gridOffset.current.y % squareSize;
          const currentSquareX = Math.floor((x - startX) / squareSize);
          const currentSquareY = Math.floor((y - startY) / squareSize);
          if (hoveredSquareRef.current && currentSquareX === hoveredSquareRef.current.x && currentSquareY === hoveredSquareRef.current.y) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "#060606");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);
      hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
    };
    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "squares-canvas" });
};

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Software Developer"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/favicon-192x192.png"><meta property="og:title" content="Ayush Tiwari"><meta property="og:description" content="Software Developer"><meta property="og:image" content="./banner.png"><meta property="og:url" content="https://aaayushh7.vercel.app/"><meta property="og:type" content="website"><meta property="og:site_name" content="Ayush Tiwari Portfolio"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" media="print" onload="this.media='all'">${maybeRenderHead()}<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"></noscript><title>${title}</title>${renderHead()}</head> <body class="bg-[--background] md:px-48 lg:px-20 px-9 relative min-h-screen"> <div class="fixed inset-0 -z-10 w-full h-full"> ${renderComponent($$result, "Squares", Squares, { "client:load": true, "speed": 0.5, "squareSize": 40, "direction": "diagonal", "borderColor": "#222222", "hoverFillColor": "#ffffff", "client:component-hydration": "load", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/Squares", "client:component-export": "default" })} </div> <div class="relative z-10"> ${renderComponent($$result, "ClickSparkWrapper", ClickSparkWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/ClickSparkWrapper", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </div> </body></html>`;
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/layouts/Layout.astro", void 0);

const Resume = ({ onClose }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
          @media (max-width: 768px) {
            .resume-content {
              padding: 1rem;
            }

            .subheading, .contact-info, .social-links {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.25rem;
            }

            .date-location {
              text-align: left;
              margin-top: 0.5rem;
            }
            
            .contact-info span, .social-links span {
              display: none;
            }

            .skills-list li {
              width: 100%;
            }
            
            .resume-header h1 {
                font-size: 2.5rem;
            }

            h2 {
                font-size: 1.5rem;
            }

            h3 {
                font-size: 1.1rem;
            }
          }
        ` }),
    /* @__PURE__ */ jsx("div", { className: "resume-container", children: /* @__PURE__ */ jsxs("div", { className: "resume-content", children: [
      /* @__PURE__ */ jsx("button", { className: "close-button", onClick: onClose, children: "x" }),
      /* @__PURE__ */ jsxs("div", { className: "resume-header", children: [
        /* @__PURE__ */ jsx("h1", { children: "Ayush Tiwari" }),
        /* @__PURE__ */ jsxs("div", { className: "contact-info", children: [
          /* @__PURE__ */ jsx("a", { href: "mailto:aayushtiwari071@gmail.com", children: "aayushtiwari071@gmail.com" }),
          /* @__PURE__ */ jsx("span", { children: "|" }),
          /* @__PURE__ */ jsx("a", { href: "tel:+916306500300", children: "+91 6306500300" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "social-links", children: [
          /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/ayush-tiwari-538ab824b ", target: "_blank", rel: "noopener noreferrer", children: "LinkedIn" }),
          /* @__PURE__ */ jsx("span", { children: "|" }),
          /* @__PURE__ */ jsx("a", { href: "https://aaayushh7.vercel.app/", target: "_blank", rel: "noopener noreferrer", children: "Portfolio" }),
          /* @__PURE__ */ jsx("span", { children: "|" }),
          /* @__PURE__ */ jsx("a", { href: "https://github.com/aaayushh7", target: "_blank", rel: "noopener noreferrer", children: "GitHub" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Education" }),
        /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: "SRM Institute of Science and Technology" }),
            /* @__PURE__ */ jsx("p", { children: "B.Tech, Computer Science — CGPA: 8.6 / 10" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
            /* @__PURE__ */ jsx("p", { children: "Aug 2022 – Jun 2026 (expected)" }),
            /* @__PURE__ */ jsx("p", { children: "Chennai, India" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Experience" }),
        /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "Software Engineer Intern, R&D" }),
              /* @__PURE__ */ jsx("p", { children: "Genpact India Pvt. Ltd." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
              /* @__PURE__ */ jsx("p", { children: "Jan 2026 – Present" }),
              /* @__PURE__ */ jsx("p", { children: "Bengaluru, India" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Architected a Jira webhook-driven autonomous API QA pipeline (Python + LangGraph) that auto-extracted acceptance criteria from issue descriptions and orchestrated multi-stage test generation — covering positive, negative, and edge-case scenarios — with results persisted in PostgreSQL." }),
            /* @__PURE__ */ jsx("li", { children: "Built a RAG-based retrieval layer to dynamically surface contextually relevant OpenAPI specs per Jira issue, enabling LLM agents to generate schema-aware test cases without manual specification lookup." }),
            /* @__PURE__ */ jsx("li", { children: "Engineered a rule-based validation and enrichment engine that verified generated tests against live API schemas and auto-repaired malformed payloads — eliminating LLM dependency for structural correction and expanding coverage via sampling-based scenario generation." }),
            /* @__PURE__ */ jsx("li", { children: "Executed batched, multithreaded API tests via Python concurrent.futures and auto-generated frontend QA reports with expected vs. actual responses and pass/fail analysis, reducing repetitive manual API testing effort by 65%." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "Freelance Software Developer" }),
              /* @__PURE__ */ jsx("p", { children: "Remote / Chennai, India" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "date-location", children: /* @__PURE__ */ jsx("p", { children: "Jun 2025 – Dec 2025" }) })
          ] }),
          /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: "Architected and delivered a multi-platform grocery marketplace (Android / iOS / Web) end-to-end: IONIC Capacitor mobile apps, Node.js / Express / MongoDB backend, and a real-time order and inventory management admin dashboard (Rs.85K contract)." }) }),
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "Research Intern" }),
              /* @__PURE__ */ jsx("p", { children: "Samsung PRISM Research" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
              /* @__PURE__ */ jsx("p", { children: "Mar 2024 – Nov 2024" }),
              /* @__PURE__ */ jsx("p", { children: "Chennai, India" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Fine-tuned Llama-2-7b for sensor anomaly detection (custom attention layers), achieving 85% accuracy (+12% vs. baseline); deployed as a RESTful inference service on Docker / Kubernetes." }),
            /* @__PURE__ */ jsx("li", { children: "Reduced inference latency and compute cost by 35% via 4-bit quantization and CUDA kernel optimizations; service processed 500+ data points/sec at 99.8% uptime." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "Software Engineer Intern" }),
              /* @__PURE__ */ jsx("p", { children: "SRM Technologies" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
              /* @__PURE__ */ jsx("p", { children: "Feb 2024 – Aug 2024" }),
              /* @__PURE__ */ jsx("p", { children: "Chennai, India" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Developed AI video-conferencing backend (Node.js / Express) with WebRTC pipeline optimizations, cutting end-to-end latency 45% for 50+ DAU; improved Next.js app load time by 30% (to 2.2s) via route-based code splitting and lazy loading." }),
            /* @__PURE__ */ jsx("li", { children: "Automated meeting transcription with durable background queues, saving 15+ manual hours/week across 10+ teams; optimized SQL query performance through targeted indexing and partitioning, reducing query cost by 30%." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Projects" }),
        /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "project", children: [
            /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/aaayushh7", target: "_blank", rel: "noopener noreferrer", children: "Pastebin-Lite | Java 17, Spring Boot, PostgreSQL, React (Jan 2026)" }) }),
            /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: "Built a paste-sharing service with TTL-based expiry, atomic view-count updates (database transactions preventing race conditions under concurrent load), and cryptographically secure 10-char IDs via SecureRandom." }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "project", children: [
            /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/aaayushh7", target: "_blank", rel: "noopener noreferrer", children: "URL Shortener Service | Java, Spring Boot, Redis, PostgreSQL (Dec 2025)" }) }),
            /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: "Engineered a scalable URL shortening service with custom aliases, redirect analytics, and expiration policies; implemented Redis caching and composite database indexing to minimise redirect latency under high concurrency." }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "project", children: [
            /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/aaayushh7", target: "_blank", rel: "noopener noreferrer", children: "BookNest | Mistral AI, React, Firebase (Aug 2025)" }) }),
            /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: "Built an AI-assisted reading platform with ISBN barcode scanning (reducing book-entry time by 95%), personalised Mistral-7B recommendations, and gamified streaks; scaled to 100+ users with a 65% engagement lift." }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Technical Skills" }),
        /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsxs("ul", { className: "skills-list", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Languages:" }),
            " Java, Python, JavaScript / TypeScript, SQL, C++"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Backend & APIs:" }),
            " Spring Boot, Node.js / Express, FastAPI, REST, GraphQL, Microservices, Event-driven Architecture"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Databases & Messaging:" }),
            " PostgreSQL, MongoDB, Redis, Kafka"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Cloud & DevOps:" }),
            " Oracle Cloud Infrastructure (OCI), AWS (EC2, S3), Docker, Kubernetes, CI/CD"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "AI / ML:" }),
            " PyTorch, LangGraph, LLM Fine-tuning (Llama-2, Mistral), 4-bit Quantization"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Concepts:" }),
            " System Design, Software Architecture, Data Structures & Algorithms, Distributed Systems, Concurrency, Observability"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Certifications" }),
        /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsxs("ul", { className: "cert-list", children: [
          /* @__PURE__ */ jsx("li", { children: "Oracle: Cloud Infrastructure (OCI) Foundations Associate (2024)" }),
          /* @__PURE__ */ jsx("li", { children: "Fortinet: Certified Associate in Cybersecurity (2024)" })
        ] }) })
      ] })
    ] }) })
  ] });
};

const ResumeModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: handleOpen, children }),
    isOpen && createPortal(
      /* @__PURE__ */ jsx(Resume, { onClose: handleClose }),
      document.body
    )
  ] });
};

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const navItems = [
    {
      label: "Home",
      href: "#home",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path></svg>`
    },
    {
      label: "Projects",
      href: "#projects",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path></svg>`
    },
    {
      label: "Resume",
      href: "#",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM19 19H5V5H19V19ZM7 10H9V12H7V10ZM7 14H17V16H7V14ZM11 10H17V12H11V10Z"></path></svg>`,
      isResume: true
    },
    {
      label: "Contact",
      href: "#contact",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-center w-full" data-astro-cid-d6vcou2g> <nav id="main-nav" class="fixed left-1/2 -translate-x-1/2 z-[100] bg-[var(--background)] border border-1 border-transparent backdrop-blur-xl transition-all duration-500 ease-in-out md:top-6 md:bottom-auto bottom-0 w-[80%]" data-astro-cid-d6vcou2g> <div class="container mx-auto flex justify-center items-center px-2 mt-5" data-astro-cid-d6vcou2g> <ul class="flex w-full justify-between md:space-x-6 md:justify-center md:gap-12 gap-6" data-astro-cid-d6vcou2g> ${navItems.map((item) => renderTemplate`<li class="flex-1 md:flex-none" data-astro-cid-d6vcou2g> ${item.isResume ? renderTemplate`${renderComponent($$result, "ResumeModal", ResumeModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/ResumeModal", "client:component-export": "default", "data-astro-cid-d6vcou2g": true }, { "default": ($$result2) => renderTemplate` <a href="#" class="flex flex-col items-center text-[var(--white-icon)] transition-colors text-xs md:text-base relative group cursor-pointer" data-astro-cid-d6vcou2g> <div class="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 scale-0 opacity-0 bg-[#A9FF5B] nav-indicator hidden md:block" data-astro-cid-d6vcou2g></div> <span class="md:hidden flex items-center justify-center w-6 h-6" data-astro-cid-d6vcou2g> <fragment data-astro-cid-d6vcou2g>${unescapeHTML(item.icon)}</fragment> </span> <span class="hidden md:inline-block" data-astro-cid-d6vcou2g>${item.label}</span> <span class="md:hidden" data-astro-cid-d6vcou2g>${item.label}</span> </a> ` })}` : renderTemplate`<a${addAttribute(item.href, "href")} class="flex flex-col items-center text-[var(--white-icon)] transition-colors text-xs md:text-base relative group" data-astro-cid-d6vcou2g> <div class="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 scale-0 opacity-0 bg-[#A9FF5B] nav-indicator hidden md:block" data-astro-cid-d6vcou2g></div> <span class="md:hidden flex items-center justify-center w-6 h-6" data-astro-cid-d6vcou2g> <fragment data-astro-cid-d6vcou2g>${unescapeHTML(item.icon)}</fragment> </span> <span class="hidden md:inline-block" data-astro-cid-d6vcou2g>${item.label}</span> <span class="md:hidden" data-astro-cid-d6vcou2g>${item.label}</span> </a>`} </li>`)} </ul> </div> </nav> </div>  ${renderScript($$result, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/components/nav.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/components/nav.astro", void 0);

const LetterGlitch = ({
  glitchColors = ["#5e4491", "#A476FF", "#241a38"],
  glitchSpeed = 33,
  centerVignette = false,
  outerVignette = false,
  smooth = true
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef(null);
  const lastGlitchTime = useRef(Date.now());
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;
  const lettersAndSymbols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "<",
    ">",
    ",",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };
  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };
  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };
  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }));
  };
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };
  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";
    letters.current.forEach((letter, index) => {
      const x = index % grid.current.columns * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };
  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;
      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();
      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };
  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;
        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress
          );
          needsRedraw = true;
        }
      }
    });
    if (needsRedraw) {
      drawLetters();
    }
  };
  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }
    if (smooth) {
      handleSmoothTransitions();
    }
    animationRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        animate();
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [glitchSpeed, smooth]);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full bg-[#101010] overflow-hidden", children: [
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block w-full h-full" }),
    outerVignette && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(16,16,16,0)_60%,_rgba(16,16,16,1)_100%)]" }),
    centerVignette && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]" })
  ] });
};

const $$LogoWall = createComponent(($$result, $$props, $$slots) => {
  const technologies = [
    "astro",
    "vue",
    "react",
    "typeScript",
    "tailwindcss",
    "next",
    "nodejs",
    "HTML5",
    "CSS3",
    "javaScript",
    "capacitor",
    "git",
    "supabase",
    "mysql",
    "bash"
  ];
  return renderTemplate`${maybeRenderHead()}<div class="relative overflow-x-hidden py-8"> <div class="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20"></div> <div class="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20"></div> <div class="flex animate-scroll hover:animate-paused gap-12 md:gap-20 w-max"> ${[...technologies, ...technologies, ...technologies].map((tech) => renderTemplate`<div class="flex items-center gap-2 group transition-all duration-300"> <img${addAttribute(`/svg/${tech}.svg`, "src")}${addAttribute(tech, "alt")} class="h-7 w-auto object-contain transition-transform group-hover:scale-110 opacity-60" width="30" height="30" loading="lazy"> <span class="text-lg font-medium text-[var(--white-icon)]"> ${tech.charAt(0).toUpperCase() + tech.slice(1)} </span> </div>`)} </div> </div> `;
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/components/logoWall.astro", void 0);

const CategoryIcons = {
  "Software Development": /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-[var(--sec)] opacity-70", children: /* @__PURE__ */ jsx("path", { d: "M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z" }) }),
  "Machine Learning & AI": /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-[var(--sec)] opacity-70", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM11 16v-2h2v2h-2zm0-4V8h2v4h-2z" }) }),
  "Cloud & DevOps": /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-[var(--sec)] opacity-70", children: /* @__PURE__ */ jsx("path", { d: "M12 4C8.134 4 5 7.134 5 11c0 .833.167 1.667.5 2.5H6c1.378 0 2.5 1.122 2.5 2.5S7.378 18.5 6 18.5H5.5c-.333.833-.5 1.667-.5 2.5 0 3.866 3.134 7 7 7s7-3.134 7-7c0-.833-.167-1.667-.5-2.5H18c-1.378 0-2.5-1.122-2.5-2.5S16.622 11 18 11h.5c.333-.833.5-1.667.5-2.5 0-3.866-3.134-7-7-7z" }) })
};
const SkillsList = () => {
  const [openItem, setOpenItem] = useState(null);
  const skills = {
    "Software Development": [
      "Spring Boot, Node.js / Express, React",
      "REST, GraphQL & Microservices",
      "Java, Python, TypeScript & SQL"
    ],
    "Machine Learning & AI": [
      "LangGraph & LLM Fine-tuning",
      "PyTorch, RAG & Generative AI",
      "Llama-2, Mistral & 4-bit Quantization"
    ],
    "Cloud & DevOps": [
      "AWS, OCI, Docker & Kubernetes",
      "PostgreSQL, MongoDB, Redis & Kafka",
      "CI/CD & Event-driven Architecture"
    ]
  };
  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };
  return /* @__PURE__ */ jsxs("div", { className: "text-left pt-3 md:pt-9", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6", children: "What I do?" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-4 mt-4 text-lg", children: Object.entries(skills).map(([category, items]) => /* @__PURE__ */ jsx("li", { className: "w-full", children: /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => toggleItem(category),
        className: "md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4", children: [
            CategoryIcons[category],
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-grow justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "min-w-0 max-w-[200px] md:max-w-none overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "block truncate text-[var(--white)] text-lg", children: category }) }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  className: `w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${openItem === category ? "rotate-180" : ""}`,
                  children: /* @__PURE__ */ jsx("path", { d: "M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transition-all duration-300 px-4 ${openItem === category ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"}`,
              children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-[var(--white-icon)] text-sm", children: items.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "pl-1", children: "•" }),
                /* @__PURE__ */ jsx("li", { className: "pl-3", children: item })
              ] }, index)) })
            }
          )
        ]
      }
    ) }, category)) })
  ] });
};

const $$Home = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="text-[var(--white)] mt-[7rem] md:mt-0" id="home"> <div class="max-w-5xl mx-auto space-y-8 md:py-36 pb-14"> <div class="text-left space-y-4"> <p class="text-md md:text-lg text-[var(--white-icon)] shiny-white">
Hi, I'm${" "} <span class="inline-block"> ${renderComponent($$result, "TrueFocus", null, { "client:only": "react", "sentence": "Ayush Tiwari", "manualMode": false, "blurAmount": 4, "borderColor": "var(--sec)", "animationDuration": 2, "pauseBetweenAnimations": 1, "fontSize": "1.2em", "fontWeight": "600", "fontFamily": "inherit", "color": "#ffffff", "client:component-hydration": "only", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/TrueFocus", "client:component-export": "default" })} </span> </p> <div class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 md:gap-4"> <h1 class="text-[var(--white)] text-5xl md:text-6xl font-medium text-pretty leading-none">
Software <br> Developer
</h1> <p class="text-md md:text-2xl text-[var(--white-icon)]">
Transforming ideas into interactive and seamless digital experiences
          with cutting-edge <span class="text-[var(--sec)] shiny-sec">Full-Stack</span> development.
</p> </div> <div class="flex justify-start gap-2 pt-3 md:pt-6"> <a target="_blank" href="https://github.com/aaayushh7" aria-label="GitHub" class="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"> <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path> </svg> </a> <a target="_blank" href="https://www.linkedin.com/in/aaayushh7" aria-label="LinkedIn" class="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"> <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path> </svg> </a> <a target="_blank" href="https://leetcode.com/u/aayushtiwari071/" aria-label="LeetCode" class="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"> <path d="M13.483 0a1.374 1.374 0 0 0 -0.961 0.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0 -1.209 2.104 5.35 5.35 0 0 0 -0.125 0.513 5.527 5.527 0 0 0 0.062 2.362 5.83 5.83 0 0 0 0.349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193 0.039 0.038c2.248 2.165 5.852 2.133 8.063 -0.074l2.396 -2.392c0.54 -0.54 0.54 -1.414 0.003 -1.955a1.378 1.378 0 0 0 -1.951 -0.003l-2.396 2.392a3.021 3.021 0 0 1 -4.205 0.038l-0.02 -0.019 -4.276 -4.193c-0.652 -0.64 -0.972 -1.469 -0.948 -2.263a2.68 2.68 0 0 1 0.066 -0.523 2.545 2.545 0 0 1 0.619 -1.164L9.13 8.114c1.058 -1.134 3.204 -1.27 4.43 -0.278l3.501 2.831c0.593 0.48 1.461 0.387 1.94 -0.207a1.384 1.384 0 0 0 -0.207 -1.943l-3.5 -2.831c-0.8 -0.647 -1.766 -1.045 -2.774 -1.202l2.015 -2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0 -1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38 -1.382 1.38 1.38 0 0 0 -1.38 -1.382z"></path> </svg> </a> <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=aayushtiwari071@gmail.com&su=Hey%20Oscar!" aria-label="Email" class="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <svg xmlns="http://www.w3.org/2000/svg" width="2.1em" height="2.1em" viewBox="0 0 24 24"> <path fill="currentColor" d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"></path> </svg> </a> </div> </div> ${renderComponent($$result, "LogoWall", $$LogoWall, {})} <div class="flex flex-col lg:flex-row items-center gap-8"> ${renderComponent($$result, "SkillsList", SkillsList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/SkillsList.tsx", "client:component-export": "default" })} <div class="flex justify-center md:w-full md:h-[292px] size-[290px] pt-3 md:pt-9 md:ml-16"> ${renderComponent($$result, "LetterGlitch", LetterGlitch, { "client:load": true, "glitchColors": ["#5e4491", "#A476FF", "#241a38"], "glitchSpeed": 33, "centerVignette": false, "outerVignette": true, "smooth": true, "client:component-hydration": "load", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/LetterGlitch.tsx", "client:component-export": "default" })} </div> </div> </div> </section> `;
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/components/home.astro", void 0);

const Prism = new Proxy({"src":"/_astro/prism.DTxBeMr5.png","width":2880,"height":1800,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/public/prism.png";
							}
							
							return target[name];
						}
					});

const Sonch = new Proxy({"src":"/_astro/sonch.COfV3zhs.png","width":2880,"height":1800,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/public/sonch.png";
							}
							
							return target[name];
						}
					});

const bucket = new Proxy({"src":"/_astro/bucket.qC6u5U3k.png","width":2880,"height":1800,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/public/bucket.png";
							}
							
							return target[name];
						}
					});

const Mealy = new Proxy({"src":"/_astro/mealy.CzZALciQ.jpg","width":3000,"height":3000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/public/mealy.jpg";
							}
							
							return target[name];
						}
					});

const Pipeline = new Proxy({"src":"/_astro/pipeline.CIGwnwL7.png","width":1536,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/public/pipeline.png";
							}
							
							return target[name];
						}
					});

const Naukri = new Proxy({"src":"/_astro/naukri.BwO5D4ZD.png","width":1536,"height":1024,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/public/naukri.png";
							}
							
							return target[name];
						}
					});

const Trackhub = new Proxy({"src":"/_astro/trackhub.8jx8B75_.png","width":2880,"height":1800,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/public/trackhub.png";
							}
							
							return target[name];
						}
					});

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  const hoverIntensity = 0.5;
  const enableHover = true;
  const projects = [
    {
      title: "Test Generation Pipeline",
      image: Pipeline,
      link: "https://github.com/aaayushh7/TestGeneration-execution-pipeline",
      preview: "https://github.com/aaayushh7/TestGeneration-execution-pipeline",
      status: "Developed"
    },
    {
      title: "Naukri Profile Automation",
      image: Naukri,
      link: "https://github.com/aaayushh7/naukri-profile-automation",
      preview: "https://github.com/aaayushh7/naukri-profile-automation",
      status: "Developed"
    },
    {
      title: "Mealy",
      image: Mealy,
      link: "https://github.com/aaayushh7/Mealy-",
      preview: "https://mealy-a7.vercel.app",
      status: "Developed"
    },
    {
      title: "Trackhub",
      image: Trackhub,
      link: "https://github.com/gothsec/stockin-demo",
      preview: "https://trackhub-at.vercel.app",
      status: "Developed"
    },
    {
      title: "Bucket (web,Android,Ios)",
      image: bucket,
      link: "https://github.com/aaayushh7/GD-frontend",
      preview: "https://cravehub.store/",
      status: "On Development"
    },
    {
      title: "Anomaly Detection of Smart home",
      image: Prism,
      link: "https://github.com/aaayushh7/AnomalyPrism-frontend",
      preview: "https://anomaly-prism-frontend.vercel.app/",
      status: "Developed"
    },
    {
      title: "Sonch",
      image: Sonch,
      link: "https://github.com/aaayushh7/projectSonch",
      preview: "https://project-sonch-5buctavxw-aaayushh7s-projects.vercel.app/",
      status: "Developed"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="projects" class="py-12 border-t border-[#ffffff10] text-[var(--white)]"> <div class="max-w-5xl mx-auto"> <h2 class="text-lg text-[var(--sec)] mb-2 shiny-sec">My work</h2> <div class="mb-8"> ${renderComponent($$result, "FuzzyText", null, { "client:only": "react", "baseIntensity": 0.2, "hoverIntensity": hoverIntensity, "enableHover": enableHover, "fontSize": "2.5rem", "color": "#ffffff", "text": "Projects", "client:component-hydration": "only", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/FuzzyText", "client:component-export": "default" })} </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> ${projects.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", null, { "client:only": true, ...project, "client:component-hydration": "only", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/ProjectCard", "client:component-export": "default" })}`)} </div> <a target="_blank" href="https://github.com/aaayushh7?tab=repositories" aria-label="GitHub" class="w-full flex items-center justify-center gap-2 mt-9 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-full bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <span class="md:text-lg text-md">More projects on</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"> <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path> </svg> </a> </div> </section>`;
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/components/projects.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const hoverIntensity = 0.5;
  const enableHover = true;
  return renderTemplate(_a || (_a = __template(["", `<section id="contact" class="w-full py-12 border-t border-[#ffffff10]"> <div class="max-w-5xl mx-auto"> <h2 class="text-lg text-[var(--sec)] mb-2 shiny-sec">Let's talk</h2> <div class="mb-6"> `, ' </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <div class="text-[var(--white-icon)]"> <p class="mb-4">\nHave a question or a project in mind? Feel free to reach out.\n</p> <div class="flex items-center gap-2"> <span>Location:</span> <span class="text-[var(--white)]">Chennai, Tamil Nadu, India</span> </div> </div> <div> <form id="contact-form" action="https://formspree.io/f/xdkelzgk" method="POST" class="flex flex-col gap-4"> <input type="text" name="from_name" placeholder="Name" required class="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)]"> <input type="email" name="reply_to" placeholder="Email" required class="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)]"> <textarea name="message" placeholder="Message" rows="6" required class="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)] resize-none"></textarea> <button type="submit" class="px-4 py-2 bg-[var(--white-icon-tr)] text-[var(--white)] rounded-lg opacity-60 transition-opacity border border-[var(--white-icon-tr)] hover:opacity-100 hover:bg-[var(--white-icon-tr)]">\nSubmit\n</button> </form> <div id="form-message" class="hidden justify-center items-center mt-4 text-[var(--white)] text-lg">\n\u2705 Thank you for your message!\n</div> </div> </div> </div> </section> <script type="module">\n  const form = document.getElementById("contact-form");\n  const formMessage = document.getElementById("form-message");\n\n  form.addEventListener("submit", async (e) => {\n    e.preventDefault();\n    const formData = new FormData(form);\n\n    try {\n      const response = await fetch(form.action, {\n        method: "POST",\n        body: formData,\n        headers: { Accept: "application/json" },\n      });\n      if (response.ok) {\n        form.reset();\n        form.style.display = "none";\n        formMessage.classList.remove("hidden");\n      } else {\n        const data = await response.json();\n        console.error("Error response:", data);\n        alert("There was a problem sending your message.");\n      }\n    } catch (error) {\n      console.error("Error:", error);\n      alert("There was a problem sending your message.");\n    }\n  });\n<\/script>'])), maybeRenderHead(), renderComponent($$result, "FuzzyText", null, { "client:only": "react", "baseIntensity": 0.2, "hoverIntensity": hoverIntensity, "enableHover": enableHover, "fontSize": "2.5rem", "color": "#ffffff", "text": "Contact", "client:component-hydration": "only", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/FuzzyText", "client:component-export": "default" }));
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/components/contact.astro", void 0);

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [animateLikes, setAnimateLikes] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const baseUrl = typeof window !== "undefined" ? "https://aaayushh7.vercel.app" : "";
  useEffect(() => {
    setIsClient(true);
    const storedIsLiked = localStorage.getItem("websiteIsLiked");
    if (storedIsLiked) {
      setIsLiked(storedIsLiked === "true");
    }
    fetchLikes();
    const interval = setInterval(fetchLikes, 5e3);
    return () => clearInterval(interval);
  }, []);
  const fetchLikes = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/likes`);
      const data = await response.json();
      if (data.likes !== void 0) {
        setLikes(data.likes);
        setAnimateLikes(true);
        setTimeout(() => setAnimateLikes(false), 300);
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  const triggerLikeAnimation = () => {
    setTriggerAnimation(true);
    setTimeout(() => {
      setTriggerAnimation(false);
    }, 300);
  };
  const handleLike = async () => {
    if (isProcessing) return;
    if (isLiked) {
      triggerLikeAnimation();
      return;
    }
    try {
      setIsProcessing(true);
      const response = await fetch(`${baseUrl}/api/likes`, {
        method: "POST"
      });
      if (response.ok) {
        setIsLiked(true);
        localStorage.setItem("websiteIsLiked", "true");
        triggerLikeAnimation();
        fetchLikes();
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  if (!isClient) return null;
  const borderColorClass = isLiked ? "border-[var(--sec)]" : "border-[var(--white-icon)]";
  const svgClasses = `
    w-6 h-6 transition-all duration-300 ease-in-out 
    ${isLiked ? "text-[var(--sec)] scale-110" : "text-[var(--white-icon)] group-hover:text-[var(--white)] group-hover:scale-105"}
    ${triggerAnimation ? " animate-scale" : ""}
  `;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleLike,
      disabled: isProcessing,
      className: `
          group relative w-40 h-10 flex items-center justify-center p-3
          rounded-full transition-all duration-300 ease-in-out transform border-2 ${borderColorClass}
          ${!isLiked ? "md:hover:border-[var(--white)]" : ""}
          ${triggerAnimation ? " animate-scale" : ""}
        `,
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "currentColor",
            className: svgClasses,
            children: /* @__PURE__ */ jsx("path", { d: "M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" })
          }
        ),
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: `
          text-sm pl-3 transition-all duration-300 ease-in-out ${animateLikes ? "animate-scale" : ""}
          text-[var(--white)]
        `,
            children: [
              likes,
              " Likes"
            ]
          }
        )
      ]
    }
  ) });
};

const $$Astro = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="w-full py-12 border-t border-[#ffffff10]"> <div class="max-w-5xl mx-auto"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10"> <div class="flex flex-col lg:items-start items-center space-y-6 gap-9"> <div class="flex space-x-6 sm:space-x-8"> ${[
    {
      href: "https://github.com/aaayushh7",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>',
      label: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/aaayushh7",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"><path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path></svg>',
      label: "LinkedIn"
    },
    {
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=aayushtiwari071@gmail.com&su=Hey%20Oscar!",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2.1em" height="2.1em" viewBox="0 0 24 24"><path fill="currentColor" d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"/></svg>',
      label: "Email"
    }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" class="flex flex-col items-center group"${addAttribute(link.label, "aria-label")}> <div class="text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out"> <div>${unescapeHTML(link.icon)}</div> </div> </a>`)} </div> ${renderComponent($$result, "LikeButton", LikeButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/React/LikeButton.tsx", "client:component-export": "default" })} </div> <div class="flex flex-col items-center md:items-start space-y-6"> <div class="grid grid-cols-1 gap-3 w-full max-w-xs"> ${[
    {
      desc: "Built with",
      name: "Astro",
      icon: "/svg/astro.svg",
      alt: "Astro Logo"
    },
    {
      desc: "Styled with",
      name: "TailwindCSS",
      icon: "/svg/tailwindcss.svg",
      alt: "TailwindCSS Logo"
    },
    {
      desc: "Deployed on",
      name: "Vercel",
      icon: "/svg/vercel.svg",
      alt: "Vercel Logo"
    }
  ].map((tech) => renderTemplate`<div class="flex items-center space-x-3"> <span class="text-[var(--white-icon)] text-sm"> ${tech.desc} </span> <img${addAttribute(tech.icon, "src")}${addAttribute(tech.alt, "alt")} class="h-5 w-5 object-contain filter brightness-0 invert opacity-50" loading="lazy"> <span class="text-[var(--white-icon)] text-sm"> ${tech.name} </span> </div>`)} </div> </div> <div class="flex flex-col items-center lg:items-start space-y-6"> <div class="w-full max-w-xs"> <iframe style="border-radius:12px; border:0;" src="https://open.spotify.com/embed/playlist/3ocHBKSmxJ0fTCkVmnU8hM?utm_source=generator&theme=0" class="w-full h-40" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> </div> </div> </div> <div class="mt-12 pt-8 border-t border-[#ffffff10]"> <p class="text-center text-sm text-[var(--white-icon)] space-y-2"> <!-- If you are using this template, by MIT License you can't remove the copyright notice --> <span class="block sm:inline">Copyright © 2025 <a href="https://github.com/aaayushh7">This Guy</a>. All rights reserved.</span> </p> </div> </div> </footer>`;
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/components/footer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Ayush Tiwari" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, {})} ${renderComponent($$result2, "Home", $$Home, {})} ${renderComponent($$result2, "Projects", $$Projects, {})} ${renderComponent($$result2, "Contact", $$Contact, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/ayushtiwari/Desktop/Github Projects/Portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
