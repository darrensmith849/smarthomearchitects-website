import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultationCta, ProductCollection } from "../../components";
import { getProduct, products } from "../../data";
import { CategoryTemplate } from "../../page-templates";
import { ProductTelemetry } from "../../ProductTelemetry";
import { categoryPages, getCategoryPage } from "../../site-map";
import { AxisProductExperience } from "../../AxisProductExperience";
import { AtlasProductPage } from "../../AtlasProductPage";
import { AuraProductPage } from "../../AuraProductPage";
import { VeilProductPage } from "../../VeilProductPage";

export function generateStaticParams() {
  return [...products.map((product) => ({ slug: product.slug })), ...categoryPages.map((page) => ({ slug: page.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  const category = getCategoryPage(slug);
  if (!product && category) return { title: category.title, description: category.intro };
  if (!product) return {};

  return {
    title: `${product.name} · ${product.category}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const category = getCategoryPage(slug);
  if (!product && category) return <CategoryTemplate page={category} />;
  if (!product) notFound();
  if (product.slug === "atlas") return <AtlasProductPage product={product} />;
  if (product.slug === "aura") return <AuraProductPage product={product} />;
  if (product.slug === "veil") return <VeilProductPage product={product} />;

  return (
    <>
      <section className="product-detail-hero">
        <div className="product-detail-copy">
          <div className="breadcrumb"><Link href="/products">Collection</Link><span>/</span><span>{product.category}</span></div>
          <p className="eyebrow">Studio series · {product.number}</p>
          <h1>{product.name}</h1>
          <h2>{product.line}</h2>
          <p>{product.longDescription}</p>
          <Link className="button button-dark" href="/contact">Specify {product.name} <span>↗</span></Link>
        </div>
        <div className="product-detail-image">
          <img decoding="async" src={product.image} alt={`${product.name} ${product.category}`} />
          <ProductTelemetry slug={product.slug} number={product.number} name={product.name} />
          <div className="image-corner-meta"><span>{product.category}</span><span>{product.dimensions}</span></div>
        </div>
      </section>

      <section className="product-highlights">
        {product.highlights.map((item) => (
          <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
        ))}
      </section>

      {product.slug === "axis" ? <AxisProductExperience product={product} /> : <>
        <section className="feature-story section-pad">
          <div className="section-label"><span>01</span><span>Why it belongs</span></div>
          <div className="feature-story-head">
            <p className="eyebrow">Designed for lived experience</p>
            <h2>{product.line}</h2>
          </div>
          <div className="feature-columns">
            {product.features.map((feature, index) => (
              <article key={feature.title}>
                <span>0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="finish-section section-pad">
          <div className="finish-copy">
            <p className="eyebrow">Material palette</p>
            <h2>Made to sit<br />with the room.</h2>
            <p>We sample every visible finish against the interior material board under the project lighting before final sign-off.</p>
          </div>
          <div className="finish-product">
            <img loading="lazy" decoding="async" src={product.image} alt={`${product.name} in its studio finish`} />
          </div>
          <div className="finish-list">
            {product.finishes.map((finish) => (
              <div key={finish.name}><i style={{ background: finish.color }} /><span>{finish.name}</span></div>
            ))}
          </div>
        </section>
      </>}

      <section className="spec-section section-pad">
        <div className="spec-intro">
          <div className="section-label"><span>{product.slug === "axis" ? "05" : "02"}</span><span>Technical detail</span></div>
          <h2>Every millimetre,<br />accounted for.</h2>
          <p>Indicative studio-series specifications. Final engineering is confirmed for each project, region and integration set.</p>
        </div>
        <div className="spec-table">
          {product.specifications.map((spec) => (
            <div className="spec-row" key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>
          ))}
          <div className="spec-row"><span>Commercial</span><strong>{product.startingAt}</strong></div>
          <div className="spec-row"><span>Overall dimensions</span><strong>{product.dimensions}</strong></div>
        </div>
      </section>

      <section className="related-products section-pad">
        <div className="section-head collection-head">
          <div className="section-label"><span>{product.slug === "axis" ? "06" : "03"}</span><span>Explore the system</span></div>
          <h2>Designed together.</h2>
        </div>
        <ProductCollection compact />
      </section>

      <ConsultationCta />
    </>
  );
}
