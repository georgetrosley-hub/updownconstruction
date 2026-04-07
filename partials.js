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
            <span class="brand-text__line" data-nav-region>South Jersey</span>
          </div>
        </a>

        <nav class="navlinks" aria-label="Primary">
          <a data-nav href="index.html">Home</a>
          <a data-nav href="services.html">Services</a>
          <a data-nav href="projects.html">Projects</a>
          <a data-nav href="about.html">About</a>
          <a data-nav href="contact.html">Contact</a>
        </nav>

        <div class="navctas">
          <a class="nav-phone" data-phone-link href="tel:+18565550123"><span data-phone-display>(856) 555-0123</span></a>
          <a class="btn primary nav-cta" data-scroll-to="estimate" href="index.html#estimate">Get Free Estimate</a>
          <div class="hamburger">
            <button type="button" data-menu-btn aria-expanded="false" aria-controls="mobilemenu" aria-label="Open menu">Menu</button>
          </div>
        </div>
      </div>
    </div>

    <div class="mobilemenu" id="mobilemenu" data-mobilemenu data-open="false">
      <div class="container">
        <div class="inner">
          <a data-nav href="index.html">Home</a>
          <a data-nav href="services.html">Services</a>
          <a data-nav href="projects.html">Projects</a>
          <a data-nav href="about.html">About</a>
          <a data-nav href="contact.html">Contact</a>
          <a class="btn primary mobilemenu__cta" data-scroll-to="estimate" href="index.html#estimate">Get Free Estimate</a>
          <a class="mobilemenu__phone" data-phone-link href="tel:+18565550123"><span data-phone-display>(856) 555-0123</span></a>
        </div>
      </div>
    </div>
  </div>`;
}

function footerHtml() {
  return `
  <footer class="footer footer--premium">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <div class="footer__brandrow">
            <div class="brand-mark footer__mark" aria-hidden="true"></div>
            <div>
              <div class="footer__name" data-business-name>Up and Down Construction &amp; Demolition</div>
              <p class="footer__tagline" data-tagline>Premium exterior improvements for South Jersey homeowners.</p>
            </div>
          </div>
          <p class="footer__areas" data-footer-service-area>South Jersey: Camden, Gloucester, Burlington Counties</p>
          <p class="footer__trust">Licensed &amp; insured · Professional workmanship · Local crew</p>
        </div>

        <div class="footer__contact">
          <div class="footer__contact-title">Contact</div>
          <a class="footer__contact-line" data-phone-link href="tel:+18565550123">
            <span class="footer__contact-label">Phone</span>
            <span data-phone-display>(856) 555-0123</span>
          </a>
          <a class="footer__contact-line" data-email-link href="mailto:hello@upanddownconstruction.com">
            <span class="footer__contact-label">Email</span>
            <span data-email-display>hello@upanddownconstruction.com</span>
          </a>
        </div>
      </div>

      <nav class="footer__quick" aria-label="Quick links">
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="projects.html">Projects</a>
        <a href="about.html">About</a>
        <a href="reviews.html">Reviews</a>
        <a href="contact.html">Contact</a>
      </nav>

      <div class="footer__bottom">
        <div class="footer__legal">
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
        </div>
        <p class="footer__copy">© <span data-year></span> <span data-business-name>Up and Down Construction</span></p>
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

