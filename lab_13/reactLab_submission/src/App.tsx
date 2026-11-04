import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import "./App.css";
import heroImg from "./assets/hero.png";

/* ---------- Data ---------- */
const brands = [
  { name: "Google", className: "brand-google" },
  { name: "Trello", className: "brand-trello" },
  { name: "monday.com", className: "brand-monday" },
  { name: "Notion", className: "brand-notion" },
  { name: "slack", className: "brand-slack" },
];

const services = [
  {
    title: "Brand Identity",
    text: "Logos, color systems and guidelines that make your business easy to recognize.",
    icon: "star",
  },
  {
    title: "Web Design",
    text: "Fast, mobile-friendly websites built to turn visitors into paying customers.",
    icon: "layout",
  },
  {
    title: "Customer Loyalty",
    text: "Reward programs and emails that bring customers back again and again.",
    icon: "heart",
  },
  {
    title: "Digital Marketing",
    text: "Search, social and email campaigns focused on results you can measure.",
    icon: "chart",
  },
  {
    title: "Product Design",
    text: "Clear, simple app and dashboard interfaces your users enjoy using.",
    icon: "phone",
  },
  {
    title: "Support & Care",
    text: "Ongoing updates and quick help so your site and campaigns keep performing.",
    icon: "shield",
  },
];

const stats = [
  { value: "1,200+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "350+", label: "Happy businesses" },
  { value: "12", label: "Years of experience" },
];

const reasons = [
  "A dedicated team for every project",
  "Clear pricing with no hidden fees",
  "Weekly progress updates",
  "Free support for 30 days after launch",
];

const steps = [
  {
    title: "Tell us your goals",
    text: "Share what you want to achieve and who your customers are.",
  },
  {
    title: "Get a clear plan",
    text: "We send a timeline, scope and price within two business days.",
  },
  {
    title: "We design and build",
    text: "You review each stage and share feedback along the way.",
  },
  {
    title: "Launch and grow",
    text: "We launch your project and keep improving it with real data.",
  },
];

const testimonials = [
  {
    name: "Sarah Khan",
    role: "Founder, Bloom Cafe",
    text: "Our repeat customers went up by a third in three months. The loyalty program they designed is simple and people love it.",
  },
  {
    name: "Daniel Moore",
    role: "Marketing Lead, Northwind",
    text: "They understood our brand from the first call. The new website is faster and our enquiries doubled.",
  },
  {
    name: "Ayesha Malik",
    role: "CEO, Craftly",
    text: "Professional, quick and easy to work with. We got everything on time and within budget.",
  },
];

const plans = [
  {
    name: "Starter",
    monthly: 49,
    yearly: 39,
    text: "For small businesses getting started.",
    features: ["1 project at a time", "Brand starter kit", "Email support"],
  },
  {
    name: "Growth",
    monthly: 129,
    yearly: 99,
    text: "For teams that want steady results.",
    features: [
      "3 projects at a time",
      "Website and marketing design",
      "Weekly progress calls",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Scale",
    monthly: 299,
    yearly: 249,
    text: "For companies with bigger plans.",
    features: [
      "Unlimited projects",
      "Dedicated design team",
      "Loyalty program setup",
      "24/7 support",
    ],
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most websites and brand projects take between 3 and 6 weeks, depending on size. We confirm the timeline in your plan.",
  },
  {
    q: "Can I change my plan later?",
    a: "Yes. You can upgrade or downgrade at any time and we adjust your next invoice.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. Most of our clients are small and growing businesses, and our Starter plan is built for them.",
  },
  {
    q: "What happens after launch?",
    a: "You get 30 days of free support, and you can continue with a care plan for updates and improvements.",
  },
];

/* ---------- Small helpers ---------- */
const iconPaths: Record<string, ReactNode> = {
  star: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" />,
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phoneCall: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function SectionHead({ title, text }: { title: string; text: string }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

/* ---------- App ---------- */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="page">
      {/* ---------- Header ---------- */}
      <header className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          Design<span>AGENCY</span>
        </a>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`bars ${menuOpen ? "open" : ""}`} />
        </button>

        <div id="main-menu" className={`menu ${menuOpen ? "menu-open" : ""}`}>
          <nav className="nav-links" aria-label="Main">
            <div className="dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => setServicesOpen((o) => !o)}
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  className={`chevron ${servicesOpen ? "flip" : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {servicesOpen && (
                <ul className="dropdown-menu">
                  {services.slice(0, 4).map((s) => (
                    <li key={s.title}>
                      <a href="#services" onClick={closeMenu}>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a href="#about" className="nav-link" onClick={closeMenu}>
              About Us
            </a>
            <a href="#pricing" className="nav-link" onClick={closeMenu}>
              Pricing
            </a>
            <a href="#contact" className="nav-link" onClick={closeMenu}>
              Contact Us
            </a>
          </nav>

          <div className="nav-actions">
            <button className="btn btn-outline">Login</button>
            <button className="btn btn-solid">Register</button>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <main>
        <section id="home" className="hero">
          <div className="hero-text">
            <h1>Increase Your Customers Loyalty and Satisfaction</h1>
            <p>
              We help businesses like yours earn more customers, standout from
              competitors, make more money
            </p>
            <a href="#pricing" className="btn btn-solid btn-lg">
              Get Started
            </a>
          </div>

          <div className="hero-visual">
            <img
              src={heroImg}
              alt="Smiling woman holding a laptop"
              className="hero-img"
            />
          </div>
        </section>

        {/* ---------- Brands strip ---------- */}
        <section className="brands" aria-label="Trusted by">
          {brands.map((b) => (
            <span key={b.name} className={`brand ${b.className}`}>
              {b.name}
            </span>
          ))}
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="section section-white">
          <SectionHead
            title="Everything you need to grow"
            text="From your first logo to your next campaign, we handle the design work so you can focus on your customers."
          />
          <div className="grid grid-3">
            {services.map((s, i) => (
              <article key={s.title} className="card">
                <span className={`icon-badge ${i % 3 === 1 ? "orange" : ""}`}>
                  <Icon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a href="#contact" className="card-link">
                  Learn more
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="section section-mint">
          <div className="about">
            <div className="about-text">
              <h2>A team that cares about your results</h2>
              <p>
                We are a small studio of designers, developers and marketers.
                For over a decade we have helped businesses look better, reach
                more people and keep the customers they win.
              </p>
              <ul className="checklist">
                {reasons.map((r) => (
                  <li key={r}>
                    <span className="tick">
                      <Icon name="check" size={14} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-solid btn-lg">
                Talk to our team
              </a>
            </div>

            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Process ---------- */}
        <section id="process" className="section section-white">
          <SectionHead
            title="How we work together"
            text="A simple process, so you always know what happens next."
          />
          <ol className="grid grid-4 steps">
            {steps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-number">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section id="testimonials" className="section section-light">
          <SectionHead
            title="What our clients say"
            text="Businesses of every size trust us with their brand."
          />
          <div className="grid grid-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card testimonial">
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  <span className="avatar">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---------- Pricing ---------- */}
        <section id="pricing" className="section section-mint">
          <SectionHead
            title="Simple, honest pricing"
            text="Pick a plan that fits today. Change it whenever you need."
          />

          <div className="toggle" role="group" aria-label="Billing period">
            <button
              className={!yearly ? "active" : ""}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              className={yearly ? "active" : ""}
              onClick={() => setYearly(true)}
            >
              Yearly
              <em>Save 20%</em>
            </button>
          </div>

          <div className="grid grid-3 pricing">
            {plans.map((p) => (
              <article
                key={p.name}
                className={`card plan ${p.featured ? "plan-featured" : ""}`}
              >
                {p.featured && <span className="plan-tag">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="plan-text">{p.text}</p>
                <p className="price">
                  <strong>${yearly ? p.yearly : p.monthly}</strong>
                  <span>/ month</span>
                </p>
                <ul className="checklist">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="tick">
                        <Icon name="check" size={14} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn btn-lg ${
                    p.featured ? "btn-light" : "btn-solid"
                  }`}
                >
                  Choose {p.name}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="section section-white">
          <SectionHead
            title="Frequently asked questions"
            text="Can't find your answer? Send us a message and we'll reply within a day."
          />
          <div className="faq">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`faq-item ${open ? "open" : ""}`}>
                  <button
                    className="faq-question"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    {f.q}
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                  {open && <p className="faq-answer">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="cta-wrap">
          <div className="cta">
            <div>
              <h2>Ready to win more loyal customers?</h2>
              <p>Book a free 30-minute call and get a plan for your business.</p>
            </div>
            <a href="#contact" className="btn btn-light btn-lg">
              Book a free call
            </a>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer id="contact" className="footer">
        <div className="footer-grid">
          <div className="footer-about">
            <a href="#home" className="logo logo-light">
              Design<span>AGENCY</span>
            </a>
            <p>
              We help businesses earn more customers, stand out from
              competitors and make more money.
            </p>
            <ul className="contact-list">
              <li>
                <Icon name="mail" size={18} /> hello@designagency.com
              </li>
              <li>
                <Icon name="phoneCall" size={18} /> +92 300 1234567
              </li>
              <li>
                <Icon name="pin" size={18} /> Karachi, Pakistan
              </li>
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#process">How we work</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="newsletter">
            <h4>Get tips in your inbox</h4>
            <p>One short email a month. No spam.</p>
            {subscribed ? (
              <p className="subscribed" role="status">
                Thanks! You are subscribed.
              </p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-solid" type="submit">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DesignAGENCY. All rights reserved.</span>
          <span className="footer-legal">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Service</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
