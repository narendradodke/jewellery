import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/mockData";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];

  if (!product) {
    return {
      title: "Jewellery Not Found | LUXORA",
    };
  }

  const title = `Buy ${product.name} | LUXORA`;
  const description = `${product.description} Crafted in ${product.metal} with certified ${product.stone}. Complimentary white-glove insured delivery.`;
  const primaryImage = product.images[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [primaryImage],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];

  if (!product) {
    notFound();
  }

  // Google Shopping & Rich Snippets JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku || product.id,
    brand: {
      "@type": "Brand",
      name: "LUXORA",
    },
    offers: {
      "@type": "Offer",
      url: `https://luxora.com/product/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "LUXORA Haute Joaillerie",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data for Google Shopping / SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
