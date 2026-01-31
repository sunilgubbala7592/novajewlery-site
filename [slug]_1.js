import Link from "next/link";
import { getAllCollections, getAllProducts, getCollectionBySlug, normalize } from "@/lib/content";
import { remark } from "remark";
import html from "remark-html";

function Layout({ children }) {
  return (
    <>
      <div className="nav">
        <div className="container navInner">
          <Link className="brand" href="/">
            {/* Replace this with your uploaded logo: put it at public/images/nova-logo.png */}
            <span style={{ color: "var(--accent)" }}>NOVA</span>
            <span style={{ color: "var(--muted)", letterSpacing: "0.22em", fontSize: 11 }}>JEWLERY</span>
          </Link>
          <div className="navLinks">
            <Link href="/shop">Shop</Link>
            <Link href="/collections/necklaces">Necklaces</Link>
            <Link href="/collections/earrings">Earrings</Link>
            <Link href="/collections/finger-rings">Finger Rings</Link>
            <Link href="/collections/pendants">Pendants</Link>
            <Link href="/collections/wristwear">Wristwear</Link>
            <Link href="/collections/accessories">Accessories</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </div>
      <div className="container section" style={{ borderTop: "none" }}>{children}</div>
      <div className="footer">
        <div className="container">© {new Date().getFullYear()} Nova Jewlery</div>
      </div>
    </>
  );
}

export default function CollectionPage({ collection, bodyHtml, products }) {
  return (
    <Layout>
      <div className="hero" style={{ paddingTop: 40 }}>
        <div className="kicker">Collection</div>
        <h1 className="heroTitle" style={{ fontSize: 44 }}>{collection.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>

      <div className="grid" style={{ paddingBottom: 80 }}>
        {products.map((p) => (
          <Link key={p.slug} className="card" href={`/product/${p.slug}`}>
            <img className="cardImg" src={p.coverImage} alt={p.title} />
            <div className="cardBody">
              <h3 className="cardTitle">{p.title}</h3>
              <div className="cardMeta">
                <span className="pill">{p.category}</span>
                <span>${Number(p.price).toFixed(0)} AUD</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const cols = getAllCollections();
  return {
    paths: cols.map((c) => ({ params: { slug: c.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const collection = getCollectionBySlug(params.slug);
  const allProducts = getAllProducts();
  const filtered = allProducts.filter((p) => normalize(p.category) === normalize(collection.title));
  const processed = await remark().use(html).process(collection?.body || "");
  return { props: { collection, bodyHtml: processed.toString(), products: filtered } };
}
