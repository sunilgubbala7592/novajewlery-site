import Link from "next/link";
import { getAllProducts, getProductBySlug } from "@/lib/content";
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

export default function ProductPage({ product, bodyHtml }) {
  if (!product) return null;

  return (
    <Layout>
      <div style={{ marginBottom: 18 }}>
        <Link className="btn" href="/shop">← Back to shop</Link>
      </div>

      <div className="productGrid">
        <div>
          <img
            src={product.coverImage}
            alt={product.title}
            style={{
              borderRadius: 18,
              border: "1px solid var(--line)",
              height: 520,
              width: "100%",
              objectFit: "cover",
              background: "rgba(255,255,255,0.06)"
            }}
          />
          {!!product.gallery?.length && (
            <div className="gallery" style={{ marginTop: 12 }}>
              {product.gallery.slice(0, 6).map((g, i) => (
                <img key={i} src={g.image} alt={`${product.title} ${i + 1}`} />
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <div className="kicker">{product.category}</div>
          <h1 style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif", margin: "8px 0 10px", fontSize: 34 }}>
            {product.title}
          </h1>
          <div style={{ color: "var(--muted)", marginBottom: 14 }}>${Number(product.price).toFixed(0)} AUD</div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn" href="mailto:hello@novajewlery.com?subject=Order%20enquiry">Enquire to order</a>
            <span className="pill">Hand-finished</span>
            <span className="pill">Premium materials</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const products = getAllProducts();
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  const processed = await remark().use(html).process(product?.body || "");
  return {
    props: { product, bodyHtml: processed.toString() }
  };
}
