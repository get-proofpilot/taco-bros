import React, { useMemo, useState } from "react";
import Flame from "lucide-react/dist/esm/icons/flame.js";
import MapPinned from "lucide-react/dist/esm/icons/map-pinned.js";
import MenuIcon from "lucide-react/dist/esm/icons/menu.js";
import Navigation from "lucide-react/dist/esm/icons/navigation.js";
import Phone from "lucide-react/dist/esm/icons/phone.js";
import Star from "lucide-react/dist/esm/icons/star.js";

const phone = "(931) 863-0244";
const phoneHref = "tel:+19318630244";
const address = "5515 S York Hwy, Grimsley, TN 38565";
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=5515%20S%20York%20Hwy%2C%20Grimsley%2C%20TN%2038565";
const facebookUrl = "https://www.facebook.com/profile.php?id=100090795286238";

const menuGroups = {
  tacos: {
    label: "Tacos",
    intro: "Corn tortillas, fresh cilantro, onion, radish, lime, and the protein that makes the mood.",
    items: [
      {
        name: "Original",
        price: "$3.29",
        desc: "Corn tortilla with asada, pollo, tinga, shredded chicken, or birria.",
      },
      {
        name: "Street Tacos",
        price: "$2.49",
        desc: "Small corn tortillas topped with cilantro and onion.",
      },
      {
        name: "QuesaTacos",
        price: "$3.99",
        desc: "Griddled cheese taco with birria, pollo, asada, tinga, or shredded chicken.",
      },
    ],
  },
  favorites: {
    label: "Favorites",
    intro: "The big hitters when you came hungry and you are not trying to behave.",
    items: [
      {
        name: "Burritos",
        price: "$12.99",
        desc: "Flour tortilla with rice, beans, cheese, onion, cilantro, and your protein.",
      },
      {
        name: "Nachos",
        price: "$13.99",
        desc: "Chips with beans, nacho cheese, jack cheese, lettuce, crema, avocado, and more.",
      },
      {
        name: "Quesadillas",
        price: "$9.99",
        desc: "Flour tortilla, melted jack cheese, protein, lettuce, tomato, sour cream, and guac.",
      },
    ],
  },
  bowls: {
    label: "Bowls",
    intro: "Build it your way with rice, beans, toppings, salsa, and a real protein base.",
    items: [
      {
        name: "Build Your Own Bowl",
        price: "$10.99",
        desc: "Choose rice, beans, cheese, sour cream, lettuce, slaw, cilantro, corn, guacamole, salsa, and more.",
      },
      {
        name: "Birria Style",
        price: "+$2.99",
        desc: "Add slow-cooked shredded beef flavor to tacos, favorites, or bowls.",
      },
      {
        name: "Make It A Combo",
        price: "+$4.99",
        desc: "Add beans and rice, small nachos, or chips and salsa with a drink.",
      },
    ],
  },
  sides: {
    label: "Sides",
    intro: "Built for table sharing, solo dipping, and making the basket disappear.",
    items: [
      { name: "Chips + Salsa", price: "$3.29", desc: "Crisp chips with house salsa." },
      { name: "Chips + Bean Dip", price: "$3.99", desc: "Warm dip for the table." },
      { name: "Chips + Cheese", price: "$3.99", desc: "Nacho cheese and shredded cheese." },
      { name: "Chips + Guacamole", price: "$4.99", desc: "Guac with a limey finish." },
      { name: "Beans and Rice", price: "$3.99", desc: "Classic side plate." },
      { name: "Mexican Slaw", price: "$2.99", desc: "Cabbage, cilantro, onion, tomato, jalapeno, lime, and seasoning." },
    ],
  },
  kids: {
    label: "Kids",
    intro: "Smaller plates that still get the Taco Bros treatment.",
    items: [
      {
        name: "Kids Meal",
        price: "$8.99",
        desc: "Bean and cheese burrito, quesadilla, taco, or bowl with a side and drink.",
      },
      {
        name: "Drink",
        price: "$2.99",
        desc: "Fountain drinks and bottled favorites.",
      },
    ],
  },
};

const proteins = ["Asada", "Pollo", "Tinga", "Birria", "Shredded Chicken", "Mexican Slaw"];

const specials = [
  {
    day: "Tuesday",
    title: "Taco Tuesday",
    offer: "$2.25 Street Tacos",
    note: "$1 off beer while the board says so.",
  },
  {
    day: "Thursday",
    title: "QuesaTaco Night",
    offer: "3 for $10",
    note: "The crisp-cheese birria move.",
  },
  {
    day: "Weekend",
    title: "Road-trip fuel",
    offer: "Cold beer + big baskets",
    note: "Specials rotate. Call or check the latest before you roll out.",
  },
  {
    day: "Dessert",
    title: "Dessert drops",
    offer: "Ask what is fresh",
    note: "Cheesecake-style specials show up when the case is stocked.",
  },
];

const iconFeatures = [
  {
    image: "/assets/generated/icon-taco.png",
    label: "Street tacos",
    text: "Cilantro, onion, radish, lime, and the fast lane to happy.",
  },
  {
    image: "/assets/generated/icon-bowl.png",
    label: "Loaded bowls",
    text: "Rice, beans, salsa, guac, crema, and protein stacked your way.",
  },
  {
    image: "/assets/generated/icon-chips.png",
    label: "Chips + dips",
    text: "Salsa, cheese, bean dip, or guac when the table needs crunch.",
  },
  {
    image: "/assets/generated/icon-drinks.png",
    label: "Cold drinks",
    text: "Beer, frozen margaritas, and fountain drinks for the full stop.",
  },
];

const galleryPhotos = [
  {
    src: "/assets/real/facebook-quesatacos-tray.jpg",
    alt: "Taco Bros quesatacos in a takeout tray with lime and dipping cup",
  },
  {
    src: "/assets/real/google-street-tacos.webp",
    alt: "Taco Bros street tacos with lime and radish on red-check paper",
  },
  {
    src: "/assets/real/facebook-nachos.jpg",
    alt: "Taco Bros loaded nachos with jalapenos and crema",
  },
  {
    src: "/assets/real/facebook-quesadilla.jpg",
    alt: "Taco Bros quesadilla with salsa, guacamole, and sour cream",
  },
];

const visitPhotos = [
  {
    src: "/assets/real/facebook-tacos-beer.jpg",
    alt: "Taco Bros tacos with a bottled beer and fried side",
  },
  {
    src: "/assets/real/google-tinga-taco.webp",
    alt: "Taco Bros taco with chips and salsa on checkered paper",
  },
  {
    src: "/assets/real/facebook-tacos-chips.jpg",
    alt: "Taco Bros tacos and colorful chips",
  },
];

const serviceItems = ["Dine in", "Takeout", "Curbside", "Drive-through", "Outdoor seating", "Kids' menu"];

function App() {
  const [activeSpecial, setActiveSpecial] = useState("Tuesday");

  const selectedSpecial = useMemo(
    () => specials.find((item) => item.day === activeSpecial) || specials[0],
    [activeSpecial]
  );

  return (
    <main className="site-shell">
      <Header />

      <section className="hero" id="top">
        <div className="hero-bg" aria-hidden="true">
          <img src="/assets/real/facebook-quesatacos-tray.jpg" alt="" />
        </div>
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <LogoMark className="hero-logo" />
              <div>
                <span>Every day is taco day</span>
                <strong>Grimsley, Tennessee</strong>
              </div>
            </div>
            <h1>Taco Bros</h1>
            <p className="hero-lede">Fresh scratch-made Mexican food with actual small-town heat.</p>
            <p className="hero-support">
              Street tacos, quesatacos, bowls, carne asada fries, cold beer, and
              frozen margaritas built from the real menu board.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={phoneHref}>
                <Phone size={18} aria-hidden="true" />
                Call {phone}
              </a>
              <a className="button button-ghost" href={mapsUrl} target="_blank" rel="noreferrer">
                <Navigation size={18} aria-hidden="true" />
                Get directions
              </a>
            </div>
          </div>

          <div className="hero-showcase" aria-label="Real Taco Bros food photos">
            <article className="showcase-card showcase-main">
              <img src="/assets/real/google-street-tacos.webp" alt="Taco Bros street tacos with lime and radish" />
              <span>Real Taco Bros plate</span>
            </article>
            <article className="showcase-card showcase-small">
              <img src="/assets/real/facebook-quesadilla.jpg" alt="Taco Bros quesadilla with dips" />
              <span>Quesadillas</span>
            </article>
          </div>
        </div>

      </section>

      <section className="feature-band" aria-label="Taco Bros favorites">
        <div className="icon-strip">
          {iconFeatures.map((item) => (
            <IconFeature key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="section-kicker">
          <MenuIcon size={18} aria-hidden="true" />
          Authentic board prices
        </div>
        <div className="menu-board">
          <div className="menu-board-header">
            <div className="section-heading compact">
              <h2>Full Menu</h2>
              <p>
                A proper board-style menu with the real prices, proteins, sides,
                kids plates, and birria-style upgrades all in one place.
              </p>
            </div>
            <LogoMark className="menu-logo" />
          </div>

          <div className="menu-feature-row" aria-label="Real Taco Bros menu photos">
            <article className="menu-photo-chip featured-photo">
              <img src="/assets/real/google-tinga-taco.webp" alt="Taco Bros taco with chips and salsa" />
              <span>Street Tacos</span>
            </article>
            <article className="menu-callout">
              <span>Choose your protein</span>
              <strong>Asada, pollo, tinga, birria, shredded chicken, or Mexican slaw.</strong>
            </article>
            <article className="menu-photo-chip">
              <img src="/assets/real/facebook-nachos.jpg" alt="Taco Bros loaded nachos" />
              <span>Loaded Nachos</span>
            </article>
          </div>

          <div className="menu-categories" aria-label="Taco Bros menu">
            {Object.entries(menuGroups).map(([key, group]) => (
              <MenuCategory key={key} group={group} wide={key === "sides"} />
            ))}
          </div>

          <div className="protein-strip menu-proteins">
            <span>Proteins</span>
            {proteins.map((protein) => (
              <b key={protein}>{protein}</b>
            ))}
            <strong>Combos +$4.99</strong>
          </div>
        </div>
      </section>

      <section className="specials-section section-pad" id="specials">
        <div className="specials-shell">
          <div className="specials-copy">
            <div className="section-kicker light">
              <Flame size={18} aria-hidden="true" />
              Specials board
            </div>
            <h2>Taco Tuesday. QuesaThursday. Bring your appetite.</h2>
            <p>
              The chalkboard moves, but the rhythm is clear: street tacos,
              queso-crisped tacos, cold beer, and surprise dessert drops.
            </p>

            <div className="special-tabs" role="tablist" aria-label="Specials">
              {specials.map((special) => (
                <button
                  key={special.day}
                  className={activeSpecial === special.day ? "special-tab active" : "special-tab"}
                  type="button"
                  onClick={() => setActiveSpecial(special.day)}
                  role="tab"
                  aria-selected={activeSpecial === special.day}
                >
                  {special.day}
                </button>
              ))}
            </div>

            <article className="chalk-card" role="tabpanel">
              <span>{selectedSpecial.title}</span>
              <h3>{selectedSpecial.offer}</h3>
              <p>{selectedSpecial.note}</p>
            </article>

            <div className="special-actions">
              <a className="button button-primary" href={phoneHref}>
                <Phone size={18} aria-hidden="true" />
                Call now
              </a>
              <a className="button button-dark" href={facebookUrl} target="_blank" rel="noreferrer">
                Latest updates
              </a>
            </div>
          </div>

          <div className="vibe-panel">
            <img src="/assets/real/google-quesatacos.webp" alt="Taco Bros quesatacos in a takeout tray" />
            <div className="vibe-tile">
              <img src="/assets/generated/icon-drinks.png" alt="" aria-hidden="true" />
              <span>Fresh salsas</span>
              <span>Cold beer</span>
              <span>Fast takeout</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-inner">
          <div className="section-heading">
            <h2>What people come back for.</h2>
            <p>
              Crispy quesatacos, loaded nachos, street tacos, and cheesy
              quesadillas with the red-check-paper, lime, salsa, and melted
              cheese energy.
            </p>
          </div>
          <div className="proof-stats" aria-label="Restaurant proof points">
            <ProofStat icon={<Star />} label="4.8" text="Guest rating" />
            <ProofStat icon={<MenuIcon />} label="200+" text="Guest reviews" />
          </div>
        </div>
        <div className="photo-wall" aria-label="Real Taco Bros food gallery">
          {galleryPhotos.map((photo) => (
            <article className="photo-card" key={photo.src}>
              <img src={photo.src} alt={photo.alt} />
            </article>
          ))}
        </div>
      </section>

      <section className="visit-section section-pad" id="visit">
        <div className="visit-art" aria-label="More real Taco Bros photos">
          {visitPhotos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} />
          ))}
        </div>
        <div className="visit-grid">
          <div className="visit-copy">
            <div className="section-kicker">
              <MapPinned size={18} aria-hidden="true" />
              Find us
            </div>
            <h2>Visit Taco Bros</h2>
            <p>
              Grab a table, swing through for takeout, or point the car toward
              Grimsley when tacos and a cold drink sound like the correct plan.
            </p>
            <div className="visit-actions">
              <a className="button button-primary" href={phoneHref}>
                <Phone size={18} aria-hidden="true" />
                Call Taco Bros
              </a>
              <a className="button button-ghost light-bg" href={mapsUrl} target="_blank" rel="noreferrer">
                <Navigation size={18} aria-hidden="true" />
                Get directions
              </a>
            </div>
          </div>

          <div className="info-board">
            <InfoRow label="Address" value={address} />
            <InfoRow label="Phone" value={phone} />
            <InfoRow label="Hours" value="Tuesday-Saturday 11 AM-8 PM" />
            <InfoRow label="Closed" value="Sunday and Monday" />
            <div className="service-cloud">
              {serviceItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="header-brand" href="#top" aria-label="Taco Bros home">
        <LogoMark decorative />
        <span>Taco Bros</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#menu">Menu</a>
        <a href="#specials">Specials</a>
        <a href="#visit">Visit</a>
      </nav>
      <a className="header-call" href={phoneHref}>
        <Phone size={16} aria-hidden="true" />
        Call
      </a>
    </header>
  );
}

function LogoMark({ className = "", decorative = false }) {
  return (
    <img
      className={`logo-mark ${className}`.trim()}
      src="/assets/real/taco-bros-logo.jpg"
      alt={decorative ? "" : "Taco Bros logo"}
    />
  );
}

function IconFeature({ image, label, text }) {
  return (
    <article className="icon-feature">
      <img src={image} alt="" aria-hidden="true" />
      <div>
        <strong>{label}</strong>
        <p>{text}</p>
      </div>
    </article>
  );
}

function MenuCategory({ group, wide = false }) {
  return (
    <article className={wide ? "menu-category wide" : "menu-category"}>
      <div className="menu-category-heading">
        <h3>{group.label}</h3>
        <p>{group.intro}</p>
      </div>
      <div className="price-list">
        {group.items.map((item) => (
          <article className="price-row" key={item.name}>
            <div>
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
            </div>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>
    </article>
  );
}

function ProofStat({ icon, label, text }) {
  return (
    <article className="proof-stat">
      <span aria-hidden="true">{icon}</span>
      <strong>{label}</strong>
      <p>{text}</p>
    </article>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <LogoMark decorative />
        <strong>Taco Bros</strong>
      </div>
      <p>{address}</p>
      <div className="footer-links">
        <a href={phoneHref}>Call</a>
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          Directions
        </a>
        <a href={facebookUrl} target="_blank" rel="noreferrer">
          Facebook
        </a>
      </div>
    </footer>
  );
}

export default App;
