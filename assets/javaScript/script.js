const PROJECT_COPY = {
  logistics: {
    badge: "Flagship",
    title: "UWA Logistics Agent",
    desc:
      "A stateful, multi-agent AI platform for the UWA AI Club: room bookings, event management, poster generation, notifications, and interest-based recommendations. LangGraph orchestrates specialized ReAct agents with conditional routing and persistent memory. Includes a React + Vite frontend, Dockerized full-stack deployment, MariaDB, REST APIs, and Google Calendar sync for reliable, production-style workflows.",
    tech: "Python · Django · React · Vite · LangGraph · LangChain · OpenRouter LLM · MariaDB · Docker · REST · Google Calendar API",
  },
  crm: {
    badge: "Freelance",
    title: "CRM Desktop System",
    desc:
      "End-to-end CRM desktop application built with Python and PySide6 for a business in Australia. Modules cover invoice generation and printing, sales recording and history, dynamic sales reports, product stock management, barcode scanning for cart operations, and reprinting past sales. Object-oriented design with MariaDB/RDBMS for data integrity and a maintainable codebase.",
    tech: "Python · PySide6 · MariaDB · RDBMS · OOP · Barcode",
  },
  wallet: {
    badge: "Academic",
    title: "WalletWhiz",
    desc:
      "Full-stack personal finance web app using Flask: budgets, expense visualization, and downloadable summaries. Interactive dashboards and automated spending insights with AJAX, jQuery, and SQLAlchemy. Emphasis on reliability through unit tests and Selenium end-to-end coverage.",
    tech: "Flask · Python · SQLAlchemy · HTML · CSS · JavaScript · jQuery · AJAX · Jinja · Unit testing · Selenium",
  },
  cameras: {
    badge: "Production",
    title: "Multi-camera tracking",
    desc:
      "Contributed to a production-grade system that tracks people and vehicles across multiple camera feeds. Work included improving legacy C++ and Python modules, optimizing compute and reducing latency, SQL-based data handling, and modularizing/containerizing components with Docker for more dependable deployments.",
    tech: "Python · C++ · SQL · OOP · Docker",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("main section[id], footer[id]");
  const revealItems = document.querySelectorAll(".reveal");
  const progressBar = document.querySelector(".scroll-progress");
  const parallaxImage = document.querySelector(".parallax-image");
  const heroVisual = document.querySelector(".hero-visual");
  const statsBar = document.querySelector(".stats-bar");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  const setActiveNavLink = () => {
    const marker = window.scrollY + 140;
    const aboutTop = document.querySelector("#about")?.offsetTop ?? 600;

    if (window.scrollY < aboutTop - 120) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === "#profile");
      });
      return;
    }

    let currentId = "";
    sections.forEach((section) => {
      if (marker >= section.offsetTop && marker < section.offsetTop + section.offsetHeight) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  };

  const setScrollProgress = () => {
    if (!progressBar) {
      return;
    }
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  const setHeroParallax = () => {
    if (!parallaxImage || !heroVisual) {
      return;
    }
    const y = Math.min(window.scrollY, 400);
    const imageOffset = y * -0.06;
    const scale = 1 + y * 0.0002;
    parallaxImage.style.transform = `translateY(${imageOffset}px) scale(${scale})`;
    heroVisual.style.transform = `translateY(${y * -0.025}px)`;
  };

  let statsAnimated = false;
  const animateStats = () => {
    if (statsAnimated || !statsBar) {
      return;
    }
    const nums = statsBar.querySelectorAll(".stat-num[data-target]");
    nums.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      const duration = 900;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - t) * (1 - t);
        el.textContent = String(Math.round(eased * target));
        if (t < 1) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    });
    statsAnimated = true;
  };

  if (statsBar) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    statObserver.observe(statsBar);
  }

  const projectDetail = document.getElementById("project-detail");
  const projectDetailInner = document.getElementById("project-detail-inner");
  const projectBadge = document.getElementById("project-badge");
  const projectTitle = document.getElementById("project-title");
  const projectDesc = document.getElementById("project-desc");
  const projectTech = document.getElementById("project-tech");
  const projectPickers = document.querySelectorAll(".project-picker");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyProject = (key) => {
    const data = PROJECT_COPY[key];
    if (!data || !projectBadge || !projectTitle || !projectDesc || !projectTech) {
      return;
    }
    projectBadge.textContent = data.badge;
    projectTitle.textContent = data.title;
    projectDesc.textContent = data.desc;
    projectTech.textContent = data.tech;
  };

  const switchProject = (key, button) => {
    const data = PROJECT_COPY[key];
    if (!data || !projectDetailInner) {
      return;
    }

    projectPickers.forEach((btn) => {
      const active = btn === button;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    const runUpdate = () => {
      applyProject(key);
      if (prefersReducedMotion) {
        return;
      }
      projectDetailInner.classList.remove("is-switching-out");
      requestAnimationFrame(() => {
        projectDetailInner.classList.add("is-switching-in");
        const onAnimEnd = () => {
          projectDetailInner.classList.remove("is-switching-in");
          projectDetailInner.removeEventListener("animationend", onAnimEnd);
        };
        projectDetailInner.addEventListener("animationend", onAnimEnd);
      });
    };

    if (prefersReducedMotion) {
      applyProject(key);
    } else {
      projectDetailInner.classList.add("is-switching-out");
      window.setTimeout(runUpdate, 300);
    }

    if (projectDetail && window.matchMedia("(max-width: 960px)").matches) {
      window.setTimeout(() => {
        projectDetail.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
      }, prefersReducedMotion ? 0 : 120);
    }
  };

  projectPickers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      if (!key || btn.classList.contains("is-active")) {
        return;
      }
      switchProject(key, btn);
    });
  });

  const onScroll = () => {
    setActiveNavLink();
    setScrollProgress();
    setHeroParallax();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  document.querySelectorAll('a[href="#top"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTop();
      if (history.replaceState) {
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
    });
  });

  /* Visitor badge — works on static GitHub Pages (third-party stores count; not in this repo) */
  const visitCounter = document.getElementById("visit-counter");
  if (visitCounter) {
    const badge = document.createElement("img");
    badge.alt = "Visitor count";
    badge.className = "visit-counter-badge";
    badge.decoding = "async";
    badge.referrerPolicy = "no-referrer-when-downgrade";
    badge.loading = "eager";

    const fixedId = document.body?.dataset?.visitCounterId?.trim();
    const pageId =
      fixedId ||
      `${window.location.hostname}${window.location.pathname.replace(/\/$/, "") || "/"}`;

    if (window.location.protocol === "file:") {
      const note = document.createElement("span");
      note.className = "visit-counter-fallback";
      note.textContent = "Deploy to GitHub Pages to show count";
      visitCounter.appendChild(note);
    } else {
      badge.src = `https://visitor-badge.laobi.icu/badge?page_id=${encodeURIComponent(pageId)}`;
      badge.addEventListener("error", () => {
        badge.remove();
        const note = document.createElement("span");
        note.className = "visit-counter-fallback";
        note.textContent = "Count blocked or offline (try disabling ad blocker)";
        visitCounter.appendChild(note);
      });
      visitCounter.appendChild(badge);
    }
  }
});
