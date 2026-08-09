(() => {
  const THEME_KEY = "foodhub-theme";
  const THEMES = ["midnight", "counter"];

  const pipelineData = {
    load: {
      title: "Load & structure",
      body: "Imported foodhub_order.csv into a pandas DataFrame and inspected shape, dtypes, and sample rows to establish the analytic frame.",
      points: [
        "1,898 rows × 9 columns",
        "Keys: order_id, customer_id, restaurant_name, cuisine_type",
        "Ops fields: cost, day_of_the_week, rating, prep time, delivery time",
      ],
    },
    quality: {
      title: "Data quality",
      body: "Validated completeness with info()/isnull() checks and reviewed dtype fitness before EDA. Rating uses the string sentinel “Not given” rather than NaN — treated as a categorical state, not silently filled.",
      points: [
        "Zero nulls across all columns",
        "int64 / float64 / object mix confirmed",
        "736 orders carry rating = Not given",
      ],
    },
    univariate: {
      title: "Univariate EDA",
      body: "Mapped distributions for cost, prep, delivery, cuisine, restaurant, weekday/weekend, and ratings with histograms, boxplots, and countplots.",
      points: [
        "Cost slightly right-skewed; mass in $10–$20",
        "~71% of orders on weekends",
        "American cuisine and Shake Shack lead volume",
      ],
    },
    multivariate: {
      title: "Multivariate EDA",
      body: "Compared relationships across day type, cuisine, cost, times, and ratings. Correlation among cost, prep, and delivery is weak; weekday delivery runs slower.",
      points: [
        "Weekday mean delivery ~5 minutes longer than weekend",
        "Korean cuisine shows slightly lower prep times",
        "Rating vs delivery time shows no strong linear link",
      ],
    },
    business: {
      title: "Business questions",
      body: "Answered operational and commercial questions with groupby filters and rule-based revenue logic grounded in the company brief.",
      points: [
        "Promo filter: rating_count > 50 and avg rating > 4 → 4 restaurants",
        "Commission: 25% if cost > $20; 15% if $5 < cost ≤ $20 → $6,166.30",
        "Prep + delivery > 60 min on 10.54% of orders (200)",
      ],
    },
    recommend: {
      title: "Conclusions & recommendations",
      body: "Translated patterns into partnership, ops, and loyalty actions: grow rating capture, protect SLA outliers, lean into top cuisines, and upsell the $10–$20 band.",
      points: [
        "Incentivize post-order ratings",
        "Staff / route for slower weekday delivery",
        "Reward high-volume, high-rated partners",
      ],
    },
  };

  function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById("theme-toggle");
    const stored = localStorage.getItem(THEME_KEY);
    const theme = THEMES.includes(stored) ? stored : "midnight";
    root.setAttribute("data-theme", theme);
    updateToggleLabel(toggle, theme);

    toggle?.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "midnight" ? "counter" : "midnight";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      updateToggleLabel(toggle, next);
      if (window.mermaid) {
        renderMermaid(next);
      }
    });
  }

  function updateToggleLabel(btn, theme) {
    if (!btn) return;
    btn.setAttribute("aria-pressed", theme === "counter" ? "true" : "false");
    btn.textContent = theme === "midnight" ? "Counter light" : "Midnight dark";
  }

  function initPipeline() {
    const steps = document.querySelectorAll("[data-pipeline-step]");
    const panel = document.getElementById("pipeline-panel");
    if (!steps.length || !panel) return;

    const render = (key) => {
      const data = pipelineData[key];
      if (!data) return;
      panel.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.body}</p>
        <ul>${data.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      `;
      steps.forEach((btn) => {
        btn.setAttribute("aria-selected", btn.getAttribute("data-pipeline-step") === key ? "true" : "false");
      });
    };

    steps.forEach((btn) => {
      btn.addEventListener("click", () => render(btn.getAttribute("data-pipeline-step")));
    });

    render("load");
  }

  function initTopics() {
    const filters = document.querySelectorAll("[data-topic-filter]");
    const topics = document.querySelectorAll("[data-topic]");

    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-topic-filter");
        filters.forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
        topics.forEach((topic) => {
          const tags = (topic.getAttribute("data-tags") || "").split(/\s+/);
          const show = filter === "all" || tags.includes(filter);
          topic.hidden = !show;
        });
      });
    });

    document.querySelectorAll(".topic-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const topic = btn.closest(".topic");
        topic.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", topic.classList.contains("is-open") ? "true" : "false");
      });
    });
  }

  function initReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((n) => io.observe(n));
  }

  function initSmoothScroll() {
    document.querySelectorAll("[data-scroll]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || !id.startsWith("#")) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function mermaidTheme(theme) {
    return theme === "counter"
      ? {
          theme: "base",
          themeVariables: {
            primaryColor: "#e8eef2",
            primaryTextColor: "#1a1a1a",
            primaryBorderColor: "#1b3a4b",
            lineColor: "#1b3a4b",
            secondaryColor: "#f4f6f8",
            tertiaryColor: "#ffffff",
            background: "#ffffff",
            mainBkg: "#ffffff",
            nodeBorder: "#1b3a4b",
            clusterBkg: "#f4f6f8",
            titleColor: "#1a1a1a",
            edgeLabelBackground: "#ffffff",
          },
        }
      : {
          theme: "dark",
          themeVariables: {
            primaryColor: "#1a2030",
            primaryTextColor: "#e8e4dc",
            primaryBorderColor: "#f0a500",
            lineColor: "#a8a296",
            secondaryColor: "#141820",
            tertiaryColor: "#0b0d10",
            background: "#141820",
            mainBkg: "#141820",
            nodeBorder: "#f0a500",
            clusterBkg: "#0b0d10",
            titleColor: "#e8e4dc",
            edgeLabelBackground: "#141820",
          },
        };
  }

  async function renderMermaid(theme) {
    const nodes = document.querySelectorAll(".mermaid");
    if (!window.mermaid || !nodes.length) return;

    // Restore original definitions if re-rendering
    nodes.forEach((node) => {
      if (node.dataset.src) {
        node.removeAttribute("data-processed");
        node.textContent = node.dataset.src;
      } else {
        node.dataset.src = node.textContent.trim();
      }
    });

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      ...mermaidTheme(theme),
    });
    await window.mermaid.run({ nodes });
  }

  function initMermaid() {
    const theme = document.documentElement.getAttribute("data-theme") || "midnight";
    if (!window.mermaid) return;
    renderMermaid(theme);
  }

  function initHeroVideo() {
    const video = document.getElementById("hero-video");
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (reduce.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        video.setAttribute("autoplay", "");
        const play = video.play();
        if (play && typeof play.catch === "function") play.catch(() => {});
      }
    };

    syncMotion();
    if (typeof reduce.addEventListener === "function") {
      reduce.addEventListener("change", syncMotion);
    } else if (typeof reduce.addListener === "function") {
      reduce.addListener(syncMotion);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initPipeline();
    initTopics();
    initReveal();
    initSmoothScroll();
    initMermaid();
    initHeroVideo();
  });
})();
