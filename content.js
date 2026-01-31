import fs from "fs";
import path from "path";
import matter from "gray-matter";

const base = process.cwd();

function readDir(dir) {
  const full = path.join(base, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".md"));
}

export function getAllProducts() {
  const files = readDir("content/products");
  const products = files.map((file) => {
    const raw = fs.readFileSync(path.join(base, "content/products", file), "utf8");
    const { data, content } = matter(raw);
    return { ...data, body: content };
  });
  return products.sort((a, b) => (a.title > b.title ? 1 : -1));
}

export function getProductBySlug(slug) {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug) || null;
}

export function getAllCollections() {
  const files = readDir("content/collections");
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(base, "content/collections", file), "utf8");
    const { data, content } = matter(raw);
    return { ...data, body: content };
  });
  return items;
}

export function getCollectionBySlug(slug) {
  const cols = getAllCollections();
  return cols.find((c) => c.slug === slug) || null;
}

export function normalize(s) {
  return String(s || "").trim().toLowerCase();
}
