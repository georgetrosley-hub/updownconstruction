function headerHtml() {
  return `
  <div class="topbar">
    <a class="skip" href="#main">Skip to content</a>
    <div class="container">
      <div class="nav">
        <a class="brand" href="index.html" aria-label="Home">
          <img data-logo-img="true" src="assets/logo.png" alt="Up and Down Construction logo" style="width:40px;height:40px;border-radius:12px;border:1px solid rgba(0,0,0,.10)" />
          <div class="brand-mark" data-brand-mark style="display:none" aria-hidden="true"></div>
          <div class="brand-text">
            <b data-business-name>Up and Down Construction</b>
            <span data-service-area-summary>South Jersey • Free in-person estimate</span>
          </div>
        </a>

        <nav class="navlinks" aria-label="Primary">
          <a data-nav href="services.html">Services</a>
          <a data-nav href="projects.html">Projects</a>
          <a data-nav href="about.html">About</a>
          <a data-nav href="reviews.html">Reviews</a>
          <a data-nav href="contact.html">Contact</a>
        </nav>

        <div class="navctas">
          <a class="btn" data-phone-link href="tel:+18565550123">Call/Text <span data-phone-display>(856) 555-0123</span></a>
          <a class="btn primary" data-scroll-to="estimate" href="#estimate">Free Estimate</a>
          <div class="hamburger">
            <button type="button" data-menu-btn aria-expanded="false" aria-controls="mobilemenu" aria-label="Open menu">Menu</button>
          </div>
        </div>
      </div>
    </div>

    <div class="mobilemenu" id="mobilemenu" data-mobilemenu data-open="false">
      <div class="container">
        <div class="inner">
          <a href="services.html">Services</a>
          <a href="projects.html">Projects</a>
          <a href="about.html">About</a>
          <a href="reviews.html">Reviews</a>
          <a href="contact.html">Contact</a>
          <a class="btn primary" style="justify-content:center" data-scroll-to="estimate" href="#estimate">Request Free In‑Person Estimate</a>
          <a class="btn" style="justify-content:center" data-phone-link href="tel:+18565550123">Call/Text <span data-phone-display>(856) 555-0123</span></a>
        </div>
      </div>
    </div>
  </div>`;
}

function footerHtml() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footergrid">
        <div>
          <div style="display:flex;gap:12px;align-items:center">
            <div class="brand-mark" aria-hidden="true"></div>
            <div>
              <div style="font-weight:700" data-business-name>Up and Down Construction & Demolition</div>
              <div class="small">Residential remodeling in South Jersey. Free in-person estimates.</div>
            </div>
          </div>
          <div class="small" style="margin-top:12px">
            Call/Text: <a data-phone-link href="tel:+18565550123"><span data-phone-display>(856) 555-0123</span></a><br/>
            Email: <a data-email-link href="mailto:hello@upanddownconstruction.com"><span data-email-display>hello@upanddownconstruction.com</span></a>
          </div>
        </div>

        <div class="footlinks" aria-label="Footer links">
          <a href="services.html">Services</a>
          <a href="projects.html">Projects</a>
          <a href="about.html">About</a>
          <a href="reviews.html">Reviews</a>
          <a href="contact.html">Contact</a>
        </div>

        <div class="footlinks" aria-label="Legal">
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
          <div class="small">
            © <span data-year></span> <span data-business-name>Up and Down Construction</span>.
          </div>
        </div>
      </div>
    </div>
  </footer>`;
}

function mountPartials() {
  const header = document.querySelector("[data-header]");
  const footer = document.querySelector("[data-footer]");
  if (header) header.innerHTML = headerHtml();
  if (footer) footer.innerHTML = footerHtml();
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", mountPartials);

