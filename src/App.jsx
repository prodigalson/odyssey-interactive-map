import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const stops = [
  [
    "troy",
    "Troy",
    "The war is over",
    "Hisarlik, Türkiye",
    "Before Book I",
    "High",
    84,
    19,
    "Ancient City of Troy Hisarlik Turkey",
    "Odysseus leaves the ruined city with twelve ships, carrying victory - and the choices that will keep him from home for ten years.",
  ],
  [
    "ismarus",
    "Ismarus",
    "The Cicones",
    "Thracian coast, Greece",
    "Book IX",
    "Probable",
    88,
    29,
    "Maroneia archaeological site Greece",
    "A raid turns costly when the crew refuses to leave. The Cicones counterattack at dawn; six men from every ship are lost.",
  ],
  [
    "maleas",
    "Cape Maleas",
    "The storm",
    "Laconia, Greece",
    "Book IX",
    "High",
    65,
    61,
    "Cape Maleas Greece",
    "Within sight of home, a north wind drives the fleet past Cythera and into the unknown - the hinge of the entire voyage.",
  ],
  [
    "djerba",
    "Djerba",
    "The Lotus-Eaters",
    "Tunisia",
    "Book IX",
    "Traditional",
    28,
    88,
    "Djerba Tunisia island",
    "The lotus offers a gentler danger: forgetting. Odysseus drags his entranced scouts back to the ships and orders an immediate departure.",
  ],
  [
    "aci",
    "Aci Trezza",
    "The Cyclops",
    "Sicily, Italy",
    "Book IX",
    "Strong",
    42,
    73,
    "Faraglioni Aci Trezza Sicily",
    "Beneath Etna, “Nobody” blinds Polyphemus and escapes under the bellies of sheep. A proud shout at sea brings Poseidon’s curse.",
  ],
  [
    "aeolian",
    "Aeolian Islands",
    "Keeper of the winds",
    "Sicily, Italy",
    "Book X",
    "Strong",
    40,
    61,
    "Aeolian Islands Italy",
    "Aeolus bottles every hostile wind. Ithaca appears on the horizon, but the crew opens the bag and the released storm hurls them back.",
  ],
  [
    "circeo",
    "Monte Circeo",
    "Circe’s island",
    "Lazio, Italy",
    "Book X",
    "Strong",
    32,
    43,
    "Monte Circeo Italy",
    "On the wooded promontory, Circe turns men into swine. Hermes gives Odysseus the herb moly; enchantment becomes a year of refuge.",
  ],
  [
    "avernus",
    "Lake Avernus",
    "The Underworld",
    "Cumae, Italy",
    "Book XI",
    "Traditional",
    30,
    47,
    "Lake Avernus Pozzuoli Italy",
    "At the smoking western edge of the Greek world, Odysseus calls up the dead and learns from Tiresias what the road home will demand.",
  ],
  [
    "ligalli",
    "Li Galli",
    "The Sirens",
    "Amalfi Coast, Italy",
    "Book XII",
    "Strongest",
    34,
    50,
    "Li Galli islands Positano Italy",
    "Wax seals every sailor’s ears. Bound to the mast, Odysseus alone hears the Sirens promise all the knowledge in the world.",
  ],
  [
    "messina",
    "Strait of Messina",
    "Scylla & Charybdis",
    "Italy",
    "Book XII",
    "Near-certain",
    42,
    70,
    "Strait of Messina Scilla Italy",
    "Between the rock and the whirlpool, Odysseus chooses the lesser catastrophe. Scylla takes six men as the ship races through.",
  ],
  [
    "sicily",
    "Sicily",
    "Cattle of the Sun",
    "Italy",
    "Book XII",
    "Consensus",
    37,
    72,
    "Valley of the Temples Agrigento Sicily",
    "Storm-bound on Thrinacia, the starving crew kills Helios’ sacred cattle. Zeus answers with a thunderbolt; Odysseus alone survives.",
  ],
  [
    "gozo",
    "Gozo",
    "Calypso’s island",
    "Malta",
    "Books V–VII",
    "Disputed",
    37,
    84,
    "Gozo Malta coast",
    "For seven years Calypso keeps Odysseus at the “navel of the sea.” He refuses immortality, builds a raft, and chooses home.",
  ],
  [
    "corfu",
    "Corfu",
    "The Phaeacians",
    "Ionian Sea, Greece",
    "Books VI–VIII",
    "Mainstream",
    57,
    38,
    "Paleokastritsa Corfu Greece",
    "Shipwrecked and naked, Odysseus meets Nausicaa. In Scheria he finally tells his own story, and is carried home asleep.",
  ],
  [
    "ithaca",
    "Ithaca region",
    "The homecoming",
    "Ithaki & Kefalonia, Greece",
    "Books XIII–XXIV",
    "Composite view",
    59,
    49,
    "Ithaca Greece island",
    "Disguised as a beggar, the wanderer enters his own hall. The bow, the contest, and Penelope’s rooted bed bring recognition at last.",
  ],
].map((s, i) => ({
  id: s[0],
  place: s[1],
  myth: s[2],
  modern: s[3],
  book: s[4],
  confidence: s[5],
  x: s[6],
  y: s[7],
  query: s[8],
  text: s[9],
  n: [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
    "XIII",
    "XIV",
  ][i],
}));

const appendix = [
  [
    "The Sirens",
    "Li Galli",
    [
      "Cape Pelorum, northeast Sicily",
      "Sirenum scopuli near Sorrento",
      "Capri and its rocks",
    ],
    "Li Galli has the longest tradition and evidence of a Greek or Roman sanctuary.",
  ],
  [
    "Thrinacia",
    "Sicily",
    ["Acragas / Agrigento", "Trapani, western Sicily", "Favignana"],
    "Sicily has held the broad consensus since antiquity; the exact landfall remains open.",
  ],
  [
    "Ogygia",
    "Gozo",
    [
      "No fixed location",
      "Gibraltar or an island off Hispania",
      "Gavdos",
      "Malta",
      "An island near Cádiz",
      "Sardinia or Corsica",
    ],
    "Homer may intend placeless remoteness. Gozo is used as a strong modern tradition, not a certainty.",
  ],
  [
    "Scheria",
    "Corfu",
    ["A fictional composite island"],
    "Corfu is the mainstream identification: fertile, wealthy, and the last island before the homeward crossing.",
  ],
  [
    "Ithaca",
    "Ithaca–Kefalonia region",
    [
      "Modern Ithaki alone",
      "Lefkada",
      "Southeast Kefalonia / Paliki",
      "Thyamus Peninsula",
    ],
    "The composite view reflects scholarly caution and possible Bronze Age coastline changes.",
  ],
];

const coordinates = {
  troy: [39.9575, 26.2389],
  ismarus: [40.88, 25.51],
  maleas: [36.444, 23.198],
  djerba: [33.807, 10.845],
  aci: [37.563, 15.161],
  aeolian: [38.533, 14.9],
  circeo: [41.235, 13.063],
  avernus: [40.838, 14.075],
  ligalli: [40.58, 14.433],
  messina: [38.25, 15.63],
  sicily: [37.29, 13.585],
  gozo: [36.044, 14.25],
  corfu: [39.624, 19.922],
  ithaca: [38.428, 20.678],
};

const key =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  import.meta.env.GOOGLE_MAPS_API_KEY;
let gp;
function loadPlaces() {
  if (!key) return Promise.reject();
  if (window.google?.maps?.places) return Promise.resolve();
  if (gp) return gp;
  gp = new Promise((ok, no) => {
    const cb = `odysseyPlaces${Date.now()}`;
    window[cb] = () => {
      ok();
      delete window[cb];
    };
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&loading=async&v=weekly&callback=${cb}`;
    s.async = true;
    s.onerror = no;
    document.head.appendChild(s);
  });
  return gp;
}
function Compass() {
  return (
    <svg viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="21" />
      <path d="m29 19-8 2-2 8 8-2 2-8Z" />
      <path d="M24 3v5M24 40v5M3 24h5M40 24h5" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M14 6l6 6-6 6" />
    </svg>
  );
}
function Photos({ stop, cache, setCache }) {
  const r = cache[stop.id];
  useEffect(() => {
    if (r || !key) return;
    let live = true;
    loadPlaces()
      .then(async () => {
        const { Place } = await window.google.maps.importLibrary("places");
        const { places } = await Place.searchByText({
          textQuery: stop.query,
          fields: ["displayName", "formattedAddress", "photos"],
          maxResultCount: 1,
          language: "en",
        });
        if (!live) return;
        const place = places?.[0];
        if (!place) {
          setCache((c) => ({ ...c, [stop.id]: { status: "error" } }));
          return;
        }
        const photos = (place.photos || []).slice(0, 3).map((photo) => ({
          src: photo.getURI({ maxWidth: 1800, maxHeight: 1200 }),
          credit: (photo.authorAttributions || [])
            .map((author) => author.displayName)
            .filter(Boolean)
            .join(", "),
        }));
        setCache((c) => ({
          ...c,
          [stop.id]: {
            status: "ready",
            photos,
            name: place.displayName,
          },
        }));
      })
      .catch(
        () =>
          live && setCache((c) => ({ ...c, [stop.id]: { status: "error" } })),
      );
    return () => {
      live = false;
    };
  }, [stop, r, setCache]);
  if (!key)
    return (
      <div className="photo-empty">
        <span>PLACE PHOTOGRAPHY</span>
        <strong>{stop.modern}</strong>
        <small>
          Add VITE_GOOGLE_MAPS_API_KEY to load high-resolution Places imagery.
        </small>
      </div>
    );
  if (!r || r.status === "loading")
    return (
      <div className="photo-skeleton">
        <i />
        <i />
        <i />
      </div>
    );
  if (r.status === "error" || !r.photos?.length)
    return (
      <div className="photo-empty">
        <span>NO PHOTOS RETURNED</span>
        <strong>{stop.modern}</strong>
      </div>
    );
  return (
    <div className="photo-grid">
      {r.photos.map((p, i) => (
        <figure className={i === 0 ? "hero-photo" : ""} key={p.src}>
          <img src={p.src} alt={`${r.name || stop.place} from Google Places`} />
          {p.credit && <figcaption>{p.credit}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
function Panel({ stop, onClose, onNext, cache, setCache }) {
  return (
    <aside className="detail-panel">
      <div className="panel-grab" />
      <button className="panel-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <Photos stop={stop} cache={cache} setCache={setCache} />
      <div className="panel-body">
        <div className="panel-kicker">
          <span>STOP {stop.n}</span>
          <i>{stop.confidence}</i>
        </div>
        <h2>{stop.place}</h2>
        <p className="myth-name">{stop.myth}</p>
        <div className="place-meta">
          <span>
            <b>MODERN PLACE</b>
            {stop.modern}
          </span>
          <span>
            <b>IN THE POEM</b>
            {stop.book}
          </span>
        </div>
        <p className="place-story">{stop.text}</p>
        <button className="next-stop" onClick={onNext}>
          Continue the voyage <Arrow />
        </button>
        <p className="photo-source">
          Photography is requested live from Google Places. Locations are
          scholarly identifications, not established fact.
        </p>
      </div>
    </aside>
  );
}
function Map({ active, setActive }) {
  const elementRef = useRef(null);
  const mapRef = useRef(null);
  const routeLayerRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current || mapRef.current) return;
    const map = L.map(elementRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      minZoom: 3,
      maxZoom: 13,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.fitBounds(L.latLngBounds(Object.values(coordinates)), {
      padding: [34, 34],
    });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    routeLayerRef.current?.remove();
    const group = L.layerGroup().addTo(map);
    const route = stops.map((stop) => coordinates[stop.id]);
    L.polyline(route, {
      color: "white",
      weight: 7,
      opacity: 0.86,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(group);
    L.polyline(route, {
      color: "#b75535",
      weight: 3,
      opacity: 0.96,
      dashArray: "9 8",
      lineCap: "round",
      lineJoin: "round",
    }).addTo(group);
    stops.forEach((stop, index) => {
      const selected = active?.id === stop.id;
      const icon = L.divIcon({
        className: "odyssey-marker-wrap",
        html: `<span class="odyssey-marker${selected ? " is-active" : ""}" aria-hidden="true">${index + 1}</span>`,
        iconSize: selected ? [42, 42] : [34, 34],
        iconAnchor: selected ? [21, 21] : [17, 17],
      });
      L.marker(coordinates[stop.id], {
        icon,
        title: `${index + 1}. ${stop.place} - ${stop.myth}`,
        keyboard: true,
      })
        .bindTooltip(`${index + 1}. ${stop.place}`, {
          direction: "top",
          offset: [0, -18],
          className: "odyssey-tooltip",
        })
        .on("click", () => setActive(stop))
        .addTo(group);
    });
    routeLayerRef.current = group;
    window.setTimeout(() => map.invalidateSize(), 260);
    if (active) {
      map.flyTo(coordinates[active.id], Math.max(map.getZoom(), 7), {
        duration: 0.9,
      });
    }
    return () => group.remove();
  }, [active, setActive]);

  return (
    <div className="map-shell">
      <div className="map-toolbar">
        <span>MODERN MEDITERRANEAN · HISTORICAL ROUTE</span>
        <span className="map-hint">DRAG TO EXPLORE · +/− TO ZOOM</span>
      </div>
      <div className="map-viewport">
        <div
          ref={elementRef}
          className="real-map"
          role="application"
          aria-label="Modern interactive map of Odysseus’ route across the Mediterranean"
        />
        <div className="map-legend">
          <span>
            <i />
            Primary route
          </span>
          <span>
            <b>14</b> locations
          </span>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [active, setActive] = useState(null),
    [photos, setPhotos] = useState({}),
    [playing, setPlaying] = useState(false);
  const timer = useRef();
  const playIndex = useRef(0);
  useEffect(() => {
    if (!playing) {
      clearInterval(timer.current);
      return;
    }
    timer.current = setInterval(() => {
      playIndex.current = (playIndex.current + 1) % stops.length;
      setActive(stops[playIndex.current]);
    }, 3200);
    return () => clearInterval(timer.current);
  }, [playing]);
  const togglePlay = () => {
    if (!playing) {
      playIndex.current = active
        ? stops.findIndex((stop) => stop.id === active.id)
        : 0;
      setActive(stops[playIndex.current]);
    }
    setPlaying((current) => !current);
  };
  const begin = () => {
    setActive(stops[0]);
    setTimeout(
      () =>
        document
          .querySelector("#journey")
          ?.scrollIntoView({ behavior: "smooth" }),
      20,
    );
  };
  const next = () =>
    setActive(
      stops[(stops.findIndex((s) => s.id === active.id) + 1) % stops.length],
    );
  return (
    <main id="top">
      <header>
        <a className="brand" href="#top">
          <Compass />
          <span>
            ODYSSEY<small>AN INTERACTIVE VOYAGE</small>
          </span>
        </a>
        <nav>
          <a href="#journey">Journey</a>
          <a href="#appendix">Disputed places</a>
        </nav>
        <button className="begin" onClick={begin}>
          Start at Troy <Arrow />
        </button>
      </header>
      <section className="journey" id="journey">
        <div className="section-head">
          <div>
            <span className="section-no">01</span>
            <p className="eyebrow">THE LONG WAY HOME</p>
            <h2>Follow the voyage</h2>
          </div>
          <div className="journey-controls">
            <button
              className={playing ? "playing" : ""}
              onClick={togglePlay}
            >
              {playing ? "■ Pause journey" : "▶ Play journey"}
            </button>
            <p>Tap a numbered place to enter the story.</p>
          </div>
        </div>
        <div className={`experience ${active ? "has-panel" : ""}`}>
          <Map
            active={active}
            setActive={(s) => {
              setPlaying(false);
              setActive(s);
            }}
          />
          {active && (
            <Panel
              stop={active}
              onClose={() => setActive(null)}
              onNext={next}
              cache={photos}
              setCache={setPhotos}
            />
          )}
        </div>
        <div className="route-strip">
          {stops.map((s, i) => (
            <button
              key={s.id}
              className={active?.id === s.id ? "active" : ""}
              onClick={() => {
                setPlaying(false);
                setActive(s);
              }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{s.place}</b>
              <small>{s.myth}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="appendix" id="appendix">
        <div className="section-head">
          <div>
            <span className="section-no">02</span>
            <p className="eyebrow">THE SCHOLAR’S MARGIN</p>
            <h2>Other possible worlds</h2>
          </div>
          <p>Every confident pin hides a centuries-old argument.</p>
        </div>
        <div className="appendix-grid">
          {appendix.map((x, i) => (
            <details key={x[0]}>
              <summary>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <small>{x[1]} shown on map</small>
                  <h3>{x[0]}</h3>
                </div>
                <b>＋</b>
              </summary>
              <div className="appendix-body">
                <p>{x[3]}</p>
                <h4>OTHER IDENTIFICATIONS</h4>
                {x[2].map((o) => (
                  <span key={o}>↳ {o}</span>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
      <footer>
        <div className="brand light">
          <Compass />
          <span>
            ODYSSEY<small>AN INTERACTIVE VOYAGE</small>
          </span>
        </div>
        <p>
          Top-choice route from the supplied research.
          <br />
          Images © their Google Places contributors.
        </p>
        <a href="#top">Return to Troy ↑</a>
      </footer>
    </main>
  );
}
export default App;
