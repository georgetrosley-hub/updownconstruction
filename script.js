async function loadSiteConfig() {
  const res = await fetch("./site.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load site.json");
  return await res.json();
}

function setText(sel, value) {
  const el = document.querySelector(sel);
  if (!el) return;
  el.textContent = value;
}

function setHref(sel, value) {
  const el = document.querySelector(sel);
  if (!el) return;
  el.setAttribute("href", value);
}

function setMultipleText(selector, value) {
  document.querySelectorAll(selector).forEach((el) => (el.textContent = value));
}

function e164ToTel(e164) {
  return `tel:${e164}`;
}

function e164ToSms(e164) {
  return `sms:${e164}`;
}

function formatServiceArea(area) {
  const counties = (area?.counties || []).join(", ");
  return counties ? `${area.region} • ${counties}` : area?.region || "";
}

function fillNavCurrentPage() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
  });
}

function wireMobileMenu() {
  const btn = document.querySelector("[data-menu-btn]");
  const menu = document.querySelector("[data-mobilemenu]");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = menu.getAttribute("data-open") === "true";
    menu.setAttribute("data-open", String(!open));
    menu.style.display = open ? "none" : "block";
    btn.setAttribute("aria-expanded", String(!open));
  });
}

function buildServicesCards(services) {
  const root = document.querySelector("[data-services]");
  if (!root) return;
  root.innerHTML = "";
  (services || []).forEach((s) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${escapeHtml(s.title || "")}</h3>
      <p>${escapeHtml(s.summary || "")}</p>
      <div class="meta">Free in-person estimate • South Jersey</div>
    `;
    root.appendChild(div);
  });
}

function buildTestimonials(reviews) {
  const root = document.querySelector("[data-testimonials]");
  if (!root) return;
  root.innerHTML = "";
  (reviews || []).slice(0, 3).forEach((r) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${escapeHtml(r.quote || "")}</h3>
      <p class="meta">— ${escapeHtml(r.name || "Client")}, ${escapeHtml(r.location || "")}</p>
    `;
    root.appendChild(div);
  });
}

function buildServiceAreaList(area) {
  const el = document.querySelector("[data-service-area]");
  if (!el) return;
  const towns = (area?.towns || []).slice(0, 10);
  el.textContent = towns.length ? towns.join(" • ") : formatServiceArea(area);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function localBusinessJsonLd(site) {
  const area = site?.serviceArea || {};
  const contact = site?.contact || {};
  const counties = (area?.counties || []).join(", ");
  const services = (site?.services || []).map((s) => s.title).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site?.businessName,
    areaServed: counties || area?.region || "South Jersey",
    email: contact?.email,
    telephone: contact?.phoneDisplay,
    url: location.origin ? location.origin + location.pathname : undefined,
    makesOffer: services.length ? services.map((n) => ({ "@type": "Offer", name: n })) : undefined
  };
}

function injectJsonLd(site) {
  const script = document.querySelector('script[data-jsonld="LocalBusiness"]');
  if (!script) return;
  script.textContent = JSON.stringify(localBusinessJsonLd(site));
}

function wireEstimateForm(site) {
  const form = document.querySelector("[data-estimate-form]");
  if (!form) return;
  const success = document.querySelector("[data-form-success]");
  const error = document.querySelector("[data-form-error]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (success) success.style.display = "none";
    if (error) error.style.display = "none";

    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const zip = (fd.get("zip") || "").toString().trim();
    const type = (fd.get("projectType") || "").toString().trim();
    const desc = (fd.get("details") || "").toString().trim();
    const contactPref = (fd.get("contactPref") || "").toString().trim();

    if (!name || !phone || !zip || !type) {
      if (error) {
        error.textContent = "Please fill in Name, Phone, ZIP, and Project Type.";
        error.style.display = "block";
      }
      return;
    }

    // Static-site friendly: open a prefilled email draft.
    const subject = encodeURIComponent(`Free estimate request — ${type} (${zip})`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `ZIP: ${zip}\n` +
        `Project type: ${type}\n` +
        `Preferred contact: ${contactPref || "Either"}\n\n` +
        `Details:\n${desc || "(none)"}\n`
    );
    const to = encodeURIComponent(site?.contact?.email || "");
    if (!to) {
      if (error) {
        error.textContent = "Missing email in site.json. Please set contact.email.";
        error.style.display = "block";
      }
      return;
    }

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    if (success) {
      success.textContent = "Email draft opened. Send it to request your free in-person estimate.";
      success.style.display = "block";
    }
    form.reset();
  });
}

function wireEstimateButtons() {
  document.querySelectorAll('[data-scroll-to="estimate"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = document.querySelector("#estimate");
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const focus = target.querySelector("input,select,textarea,button");
      if (focus) focus.focus({ preventScroll: true });
    });
  });
}

function applyLogoFallback() {
  const img = document.querySelector('[data-logo-img="true"]');
  if (!img) return;
  img.addEventListener("error", () => {
    img.style.display = "none";
    const mark = document.querySelector("[data-brand-mark]");
    if (mark) mark.style.display = "grid";
  });
}

async function init() {
  fillNavCurrentPage();
  wireMobileMenu();
  wireEstimateButtons();
  applyLogoFallback();

  try {
    const site = await loadSiteConfig();
    setMultipleText("[data-business-name]", site.businessName || "");
    setText("[data-tagline]", site.tagline || "");
    setText("[data-service-area-summary]", formatServiceArea(site.serviceArea || {}));

    const tel = e164ToTel(site?.contact?.phoneE164 || "");
    const sms = e164ToSms(site?.contact?.smsE164 || site?.contact?.phoneE164 || "");

    setMultipleText("[data-phone-display]", site?.contact?.phoneDisplay || "");
    setHref("[data-phone-link]", tel);
    setHref("[data-sms-link]", sms);
    setMultipleText("[data-email-display]", site?.contact?.email || "");
    setHref("[data-email-link]", `mailto:${site?.contact?.email || ""}`);

    buildServicesCards(site.services || []);
    buildTestimonials(site.reviews || []);
    buildServiceAreaList(site.serviceArea || {});
    injectJsonLd(site);
    wireEstimateForm(site);
  } catch (err) {
    // Silent fail: site still renders with defaults.
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", init);

