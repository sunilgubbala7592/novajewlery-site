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
      <div className="container">{children}</div>
      <div className="footer">
        <div className="container">© {new Date().getFullYear()} Nova Jewlery</div>
      </div>
    </>
  );
}

export default function Shop({ products }) {
  return (
    <Layout>
      <div className="hero" style={{ paddingBottom: 30, paddingTop: 44 }}>
        <div className="kicker">Shop</div>
        <h1 className="heroTitle" style={{ fontSize: 44 }}>All jewellery</h1>
        <p className="heroText">Edit products, categories, images and text at <span className="pill">/admin</span>.</p>
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

export async function getStaticProps() {
  const products = getAllProducts();
  return { props: { products } };
}
