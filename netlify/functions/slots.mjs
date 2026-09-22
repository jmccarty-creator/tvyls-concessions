import { getStore } from "@netlify/blobs";

const KEY = "fall2026";
const CAP = 3;
const VALID = /^[0-5]-([0-2]|setup|early|late|close)$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

async function read(store) {
  const data = await store.get(KEY, { type: "json" });
  return data && typeof data === "object" && data.slots ? data : { slots: {} };
}

export default async (req) => {
  const store = getStore("tvyls-concessions");

  if (req.method === "GET") {
    return json(await read(store));
  }

  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_json" }, 400);
  }

  const key = String(body.key || "");
  if (!VALID.test(key)) return json({ error: "bad_slot" }, 400);

  const state = await read(store);
  const list = state.slots[key] || [];

  if (body.action === "add") {
    const name = String(body.name || "").trim().slice(0, 60);
    if (!name) return json({ error: "no_name" }, 400);
    if (list.length >= CAP) return json(state);
    list.push({ n: name });
    state.slots[key] = list;
  } else if (body.action === "remove") {
    const i = Number(body.index);
    if (!Number.isInteger(i) || !list[i]) return json(state);
    if (body.name && list[i].n !== String(body.name)) return json(state);
    list.splice(i, 1);
    if (list.length) state.slots[key] = list;
    else delete state.slots[key];
  } else {
    return json({ error: "bad_action" }, 400);
  }

  await store.setJSON(KEY, state);
  return json(state);
};
