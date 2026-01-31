import Link from "next/link";
import { getAllProducts } from "@/lib/content";

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
      {children}
      <div className="footer">
        <div className="container">
          © {new Date().getFullYear()} Nova Jewlery · Quiet luxury, modern elegance.
        </div>
      </div>
    </>
  );
}

export default function Home({ featured }) {
  return (
    <Layout>
      <div className="container hero">
        <div className="heroGrid">
          <div>
            <div className="kicker">Fine jewellery · modern elegance</div>
            <h1 className="heroTitle">Pieces made to feel effortless — and look unforgettable.</h1>
            <p className="heroText">
              Nova Jewlery is built around refined forms, premium finishes, and quiet luxury.
              Update products, images and text anytime via the admin editor.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" href="/shop">Shop all</Link>
              <Link className="btn" href="/collections/finger-rings">Explore rings</Link>
              <Link className="btn" href="/collections/necklaces">Explore necklaces</Link>
            </div>
          </div>

          <div className="heroCard">
            <img src="/images/placeholder.jpg" alt="Nova Jewlery hero" />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div className="kicker">Featured</div>
            <h2 style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif", margin: "6px 0 0" }}>Signature pieces</h2>
          </div>
          <Link className="btn" href="/shop">View all</Link>
        </div>

        <div className="container" style={{ marginTop: 22 }}>
          <div className="grid">
            {featured.map((p) => (
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
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const all = getAllProducts();
  const featured = all.filter((p) => p.featured).slice(0, 6);
  return { props: { featured } };
}
