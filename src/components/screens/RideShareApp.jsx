/*
RideShareApp.jsx
Single-file React (JSX) demo of a mobile-friendly ride-sharing UI using Tailwind CSS and React-Leaflet (OpenStreetMap).

This file fixes a runtime error related to coordinates handling in the `driftTowards` helper.
The previous implementation assumed `from` and `to` were always valid arrays. If either was
`undefined` or not an array the code could throw (e.g. "Cannot read property '0' of undefined").

What's changed (summary):
- Added robust coordinate validation helpers (isCoord, toCoord) and fallbacks.
- Made randomNearby and generateMockDrivers defensive against bad inputs.
- Made driftTowards return a safe coordinate and handle invalid input without throwing.
- Made DriverPanel.randomizePositions robust when the drivers array is unexpectedly empty.
- Added console warnings so invalid coordinate states are easier to debug.

Setup (Vite recommended):
1) Create app:
   npm create vite@latest rideshare -- --template react
   cd rideshare
2) Install deps:
   npm install react-leaflet leaflet uuid
3) Install Tailwind CSS (per Tailwind docs) or use quick setup:
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   // then configure tailwind.config.js content paths and add @tailwind directives to src/index.css
4) Add Leaflet CSS import in src/main.jsx or index.css:
   import 'leaflet/dist/leaflet.css';
5) Replace App.jsx with this file's content (save as src/App.jsx) and run:
   npm run dev

Notes: This is a frontend-only demo. To add real realtime and routing, connect to a backend (Socket.IO, WebSocket) and use a routing service like OpenRouteService / GraphHopper to calculate real routes.
*/

import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";

// Safe icon setup (guard against environments where prototype isn't present)
if (L && L.Icon && L.Icon.Default && L.Icon.Default.prototype) {
  try {
    // Only delete if present
    if (L.Icon.Default.prototype._getIconUrl)
      delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    });
  } catch (err) {
    // non-fatal in many bundlers
    // eslint-disable-next-line no-console
    console.warn("Leaflet icon setup failed (non-fatal):", err);
  }
}

// ---------- Safe coordinate helpers ----------
function isCoord(c) {
  return (
    Array.isArray(c) &&
    c.length >= 2 &&
    isFinite(Number(c[0])) &&
    isFinite(Number(c[1]))
  );
}

function toCoord(c, fallback = null) {
  if (isCoord(c)) return [Number(c[0]), Number(c[1])];
  return fallback;
}

// ---------- Mock data & utilities ----------
const DEFAULT_CENTER = [-9.4438, 147.1803]; // Port Moresby-ish fallback

const randomNearby = (lat, lng, meters = 800) => {
  // guard inputs
  const baseLat = Number.isFinite(Number(lat))
    ? Number(lat)
    : DEFAULT_CENTER[0];
  const baseLng = Number.isFinite(Number(lng))
    ? Number(lng)
    : DEFAULT_CENTER[1];

  // rough conversion: ~111111 meters per degree latitude
  const dLat = (Math.random() - 0.5) * (meters / 111111);
  const dLng =
    (Math.random() - 0.5) *
    (meters / (111111 * Math.cos(baseLat * (Math.PI / 180)) || 1));
  return [baseLat + dLat, baseLng + dLng];
};

const haversine = (a, b) => {
  const ac = toCoord(a, null);
  const bc = toCoord(b, null);
  if (!ac || !bc) return Infinity; // can't compute distance
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371e3; // meters
  const dLat = toRad(bc[0] - ac[0]);
  const dLon = toRad(bc[1] - ac[1]);
  const lat1 = toRad(ac[0]);
  const lat2 = toRad(bc[0]);
  const s =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  return R * c;
};

// Robust driftTowards — will never throw; returns a safe coordinate array
function driftTowards(from, to, step = 0.0005) {
  const fc = toCoord(from, null);
  const tc = toCoord(to, null);

  // If either is invalid, prefer returning a sensible coordinate (from -> to or fallback)
  if (!fc && !tc) {
    // nothing to do — return fallback center
    // eslint-disable-next-line no-console
    console.warn(
      "driftTowards received invalid from and to, returning DEFAULT_CENTER"
    );
    return [...DEFAULT_CENTER];
  }
  if (!fc) {
    // from missing: start at target (no movement)
    // eslint-disable-next-line no-console
    console.warn("driftTowards: from invalid, using target as position");
    return [...tc];
  }
  if (!tc) {
    // to missing: stay at from
    // eslint-disable-next-line no-console
    console.warn("driftTowards: to invalid, returning from");
    return [...fc];
  }

  // clamp step to [0,1]
  const s = Math.max(0, Math.min(1, Number(step) || 0.0005));
  const lat = fc[0] + (tc[0] - fc[0]) * s;
  const lng = fc[1] + (tc[1] - fc[1]) * s;
  // return numbers (not NaN)
  if (!isFinite(lat) || !isFinite(lng)) {
    // eslint-disable-next-line no-console
    console.warn(
      "driftTowards computed non-finite coordinate, falling back to from"
    );
    return [...fc];
  }
  return [lat, lng];
}

// ---------- Map click handler component ----------
function LocationSelector({ onPick }) {
  useMapEvents({
    click(e) {
      if (!e || !e.latlng) return;
      const { lat, lng } = e.latlng;
      onPick([lat, lng]);
    },
  });
  return null;
}

// ---------- Main app ----------
export default function RideShareApp() {
  // map center falls back to a sample city (Port Moresby-ish)
  const [center] = useState(DEFAULT_CENTER);
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [stage, setStage] = useState("idle"); // idle, requested, matched, enroute
  const [rides, setRides] = useState([]);
  const [myRide, setMyRide] = useState(null);
  const [drivers, setDrivers] = useState(() => generateMockDrivers(center, 6));
  const [view, setView] = useState("rider"); // rider | driver
  const mapRef = useRef();

  // simulate drivers moving slightly over time toward targets
  useEffect(() => {
    const t = setInterval(() => {
      setDrivers((prev) =>
        (prev || []).map((d) => {
          try {
            const from = toCoord(d.pos, d.pos || DEFAULT_CENTER);
            const to = toCoord(d.target, d.target || d.pos || DEFAULT_CENTER);
            const newPos = driftTowards(from, to, 0.0004);
            return { ...d, pos: newPos };
          } catch (err) {
            // fail-safe: keep existing
            // eslint-disable-next-line no-console
            console.warn("Error updating driver pos:", err);
            return d;
          }
        })
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // listen for matched ride (simple mock: nearest driver accepts after a few seconds)
  useEffect(() => {
    if (stage === "requested" && myRide) {
      const free = (drivers || []).filter((d) => !d.busy && isCoord(d.pos));
      if (free.length === 0) return;
      const nearest = [...free].sort(
        (a, b) =>
          haversine(a.pos, myRide.pickup) - haversine(b.pos, myRide.pickup)
      )[0];
      const t = setTimeout(() => {
        setDrivers((prev) =>
          (prev || []).map((d) =>
            d.id === nearest.id
              ? { ...d, busy: true, target: myRide.pickup }
              : d
          )
        );
        setMyRide((r) => ({
          ...r,
          driverId: nearest.id,
          status: "driver_assigned",
        }));
        setStage("matched");
      }, 1500 + Math.random() * 1500);
      return () => clearTimeout(t);
    }
  }, [stage, myRide, drivers]);

  // simulate driver pickup and progress
  useEffect(() => {
    if (!myRide || !myRide.driverId) return;
    const driver = (drivers || []).find((d) => d.id === myRide.driverId);
    if (!driver) return;

    if (myRide.status === "driver_assigned") {
      // when driver reaches pickup (within 30m), update status
      const t = setInterval(() => {
        const dnow = (drivers || []).find((dd) => dd.id === myRide.driverId);
        if (!dnow || !isCoord(dnow.pos) || !isCoord(myRide.pickup)) return;
        const dist = haversine(dnow.pos, myRide.pickup);
        if (dist < 40) {
          setMyRide((r) => ({ ...r, status: "picked_up" }));
          // set driver target to dropoff
          setDrivers((prev) =>
            (prev || []).map((d) =>
              d.id === myRide.driverId ? { ...d, target: myRide.dropoff } : d
            )
          );
        }
      }, 1000);
      return () => clearInterval(t);
    }

    if (myRide.status === "picked_up") {
      const t = setInterval(() => {
        const dnow = (drivers || []).find((dd) => dd.id === myRide.driverId);
        if (!dnow || !isCoord(dnow.pos) || !isCoord(myRide.dropoff)) return;
        const dist = haversine(dnow.pos, myRide.dropoff);
        if (dist < 40) {
          setMyRide((r) => ({ ...r, status: "completed" }));
          setStage("idle");
          // free driver
          setDrivers((prev) =>
            (prev || []).map((d) =>
              d.id === myRide.driverId ? { ...d, busy: false, target: null } : d
            )
          );
        }
      }, 1000);
      return () => clearInterval(t);
    }
  }, [myRide, drivers]);

  function handleMapPick(pos) {
    if (!isCoord(pos)) return;
    if (!pickup) setPickup(pos);
    else if (!dropoff) setDropoff(pos);
    else {
      setPickup(pos);
      setDropoff(null);
    }
  }

  function requestRide() {
    if (!pickup || !dropoff)
      return alert("Tap the map to set pickup and dropoff");
    const ride = {
      id: uuidv4(),
      pickup,
      dropoff,
      status: "searching",
      createdAt: Date.now(),
    };
    setMyRide(ride);
    setStage("requested");
  }

  function cancelRide() {
    if (!myRide) return;
    if (myRide.driverId) {
      setDrivers((prev) =>
        (prev || []).map((d) =>
          d.id === myRide.driverId ? { ...d, busy: false, target: null } : d
        )
      );
    }
    setMyRide(null);
    setStage("idle");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white shadow-sm p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md"
            onClick={() => setView((v) => (v === "rider" ? "driver" : "rider"))}
          >
            <span className="text-sm font-medium">
              Switch to {view === "rider" ? "Driver" : "Rider"} view
            </span>
          </button>
        </div>
        <div className="text-xs text-gray-500">Demo — mobile-friendly</div>
      </div>

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Map pane */}
        <section className="flex-1 h-[60vh] md:h-auto md:min-h-screen">
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(m) => (mapRef.current = m)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LocationSelector onPick={handleMapPick} />

            {pickup && isCoord(pickup) && (
              <Marker position={pickup}>
                <Popup>Pickup</Popup>
              </Marker>
            )}
            {dropoff && isCoord(dropoff) && (
              <Marker position={dropoff}>
                <Popup>Dropoff</Popup>
              </Marker>
            )}

            {(drivers || []).map((d) =>
              isCoord(d.pos) ? (
                <Marker key={d.id} position={d.pos}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-xs">{d.car}</div>
                      <div className="text-xs">
                        {d.busy ? "On a job" : "Available"}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}

            {myRide && isCoord(myRide.pickup) && isCoord(myRide.dropoff) && (
              <Polyline
                positions={[myRide.pickup, myRide.dropoff]}
                dashArray="6"
              />
            )}
          </MapContainer>
        </section>

        {/* Control pane */}
        <aside className="bg-white md:w-96 p-4 border-t md:border-t-0 md:border-l">
          {view === "rider" ? (
            <RiderPanel
              pickup={pickup}
              dropoff={dropoff}
              onClear={() => {
                setPickup(null);
                setDropoff(null);
              }}
              onRequest={requestRide}
              stage={stage}
              myRide={myRide}
              onCancel={cancelRide}
            />
          ) : (
            <DriverPanel drivers={drivers} setDrivers={setDrivers} />
          )}

          <div className="mt-6 text-xs text-gray-500">
            Tip: Tap the map to set pickup, then tap again to set dropoff.
            Mobile-first layout.
          </div>
        </aside>
      </main>
    </div>
  );
}

// ---------- Rider panel component ----------
function RiderPanel({
  pickup,
  dropoff,
  onClear,
  onRequest,
  stage,
  myRide,
  onCancel,
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Request a ride</h2>

      <div className="mt-3 space-y-3">
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-xs text-gray-500">Pickup</div>
          <div className="font-medium">
            {pickup
              ? `${Number(pickup[0]).toFixed(5)}, ${Number(pickup[1]).toFixed(
                  5
                )}`
              : "Tap map to choose"}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-xs text-gray-500">Dropoff</div>
          <div className="font-medium">
            {dropoff
              ? `${Number(dropoff[0]).toFixed(5)}, ${Number(dropoff[1]).toFixed(
                  5
                )}`
              : "Tap map to choose"}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            className="flex-1 py-2 px-3 rounded-md bg-blue-600 text-white"
            onClick={onRequest}
            disabled={!pickup || !dropoff || stage !== "idle"}
          >
            {stage === "idle"
              ? "Request Ride"
              : stage === "requested"
              ? "Searching..."
              : stage === "matched"
              ? "Driver assigned"
              : "In progress"}
          </button>
          <button className="py-2 px-3 rounded-md border" onClick={onClear}>
            Clear
          </button>
        </div>

        {myRide && (
          <div className="mt-3 p-3 bg-green-50 rounded-md">
            <div className="text-sm">
              Ride status: <span className="font-medium">{myRide.status}</span>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Driver: {myRide.driverId || "Waiting for driver..."}
            </div>
            <div className="mt-3 flex space-x-2">
              <button
                className="px-3 py-1 rounded-md border"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Driver panel (simple simulator controls) ----------
function DriverPanel({ drivers, setDrivers }) {
  function randomizePositions() {
    setDrivers((prev) => {
      const source =
        prev && prev.length > 0 && isCoord(prev[0].pos)
          ? prev[0].pos
          : DEFAULT_CENTER;
      return (prev || []).map((d) => ({
        ...d,
        pos: randomNearby(source[0], source[1], 5000),
      }));
    });
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Driver dashboard (sim)</h2>
      <div className="mt-3 space-y-2">
        <div className="text-sm text-gray-600">Drivers in area:</div>
        <div className="space-y-2 mt-2">
          {(drivers || []).map((d) => (
            <div
              key={d.id}
              className="p-2 rounded-md bg-gray-50 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-gray-500">{d.car}</div>
              </div>
              <div className="text-xs text-gray-500">
                {d.busy ? "Busy" : "Free"}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 mt-3">
          <button
            className="px-3 py-2 rounded-md bg-blue-600 text-white"
            onClick={randomizePositions}
          >
            Randomize
          </button>
          <button
            className="px-3 py-2 rounded-md border"
            onClick={() =>
              setDrivers((prev) =>
                (prev || []).map((d) => ({ ...d, busy: false }))
              )
            }
          >
            Reset busy
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Helpers to generate mock drivers ----------
function generateMockDrivers(center, n = 5) {
  const c =
    Array.isArray(center) && center.length >= 2 ? center : DEFAULT_CENTER;
  const [lat, lng] = c;
  const names = ["Aeta", "Bena", "Cadi", "Dalu", "Ena", "Fero", "Gina"];
  const cars = [
    "Toyota Vios",
    "Honda City",
    "Nissan Almera",
    "Mitsubishi Lancer",
    "Mazda 2",
  ];
  return new Array(n).fill(0).map((_, i) => ({
    id: `drv-${i}`,
    name: names[i % names.length],
    car: cars[i % cars.length],
    pos: randomNearby(lat, lng, 3000),
    busy: false,
    target: null,
  }));
}
