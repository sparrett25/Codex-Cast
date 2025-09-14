// /utils/trips.js
export function getTrips() {
  try { return JSON.parse(localStorage.getItem("cast:trips") || "[]"); }
  catch { return []; }
}
export function saveTrips(trips) {
  localStorage.setItem("cast:trips", JSON.stringify(trips));
}
export function getTrip(id) {
  const all = getTrips();
  return id ? all.find(t => t.id === id) : all[0];
}
export function upsertTripFields(id, fields) {
  const all = getTrips();
  const idx = all.findIndex(t => t.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], ...fields };
  saveTrips(all);
  return all[idx];
}
export function formatWindow(trip) {
  const start = new Date(trip.when);
  const end   = new Date(start.getTime() + (trip.durationHours || 0) * 3600_000);
  const f = d => d.toLocaleString(undefined, { month:"short", day:"2-digit", hour:"2-digit", minute:"2-digit" });
  return `${f(start)} → ${end.toLocaleTimeString(undefined, { hour:"2-digit", minute:"2-digit" })}`;
}
