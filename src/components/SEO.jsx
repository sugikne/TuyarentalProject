import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ 
  title = "Tuya Rental Nusa Penida | Tour Mobil & Sewa Motor Penida", 
  description = "Paket Tour Mobil Private AC & Sewa Motor Harian Nusa Penida terlengkap. Termasuk supir, bensin, tiket boat, helm SNI, dan bantuan darurat 24 jam. Book now!",
  keywords = "nusa penida tour package, sewa motor nusa penida, paket tour mobil nusa penida, nusa penida car rental with driver, kelingking beach tour, diamond beach nusa penida, tuya rental nusa penida, tour nusa penida murah, motorbike rental nusa penida, private tour nusa penida",
  image = "/img/east.jpg",
  url = "https://tuyarentalnusapenida.com",
  type = "website"
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language ? i18n.language.substring(0, 2).toLowerCase() : 'en';
  const locale = lang === 'id' ? 'id_ID' : 'en_US';

  const defaultTitle = lang === 'id' 
    ? "Tuya Rental Nusa Penida | Tour Mobil & Sewa Motor Harian" 
    : "Tuya Rental Nusa Penida | Private Car Tour & Scooter Rental";

  const defaultDesc = lang === 'id'
    ? "Layanan resmi Paket Tour Mobil AC Private, Tour Motor Riding, & Sewa Motor Harian di Nusa Penida Bali. Termasuk supir lokal, BBM, tiket kapal fastboat, helm SNI, & antar jemput pelabuhan."
    : "Official Private AC Car Tours, Guided Motorbike Riding Tours, & Daily Scooter Rentals in Nusa Penida Bali. Includes local driver, fuel, fastboat tickets, SNI helmets & harbor transfers.";

  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalImage = image.startsWith('http') ? image : `${url}${image}`;

  // Rich JSON-LD Structured Data for Google & AI Search Indexing (Schema.org)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${url}/#agency`,
      "name": "Tuya Rental Nusa Penida",
      "alternateName": ["Tuya Tour & Rental Nusa Penida", "Nusa Penida Motor Trip"],
      "image": finalImage,
      "url": url,
      "telephone": "+6285737872793",
      "priceRange": "$$",
      "description": finalDesc,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sanur Harbor / Toya Pakeh Harbor",
        "addressLocality": "Nusa Penida",
        "addressRegion": "Bali",
        "postalCode": "80771",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -8.6738,
        "longitude": 115.4411
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "06:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://www.instagram.com/tuyarentalnusapenida",
        "https://www.facebook.com/tuyarentalnusapenida"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What tour packages are available in Nusa Penida with Tuya Rental?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tuya Rental offers 3 main services: 1) West Side Private Car Tour (Kelingking, Broken Beach, Angel's Billabong, Crystal Bay), 2) East Side Private Car Tour (Diamond Beach, Atuh Beach, Thousand Islands Treehouse, Giri Putri), 3) Guided Motorbike Riding Tours & Independent Scooter Rentals."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a private car tour or motor rental in Nusa Penida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can easily book online via website or direct WhatsApp to +6285737872793. No deposit is required in advance; pay upon arrival at the harbor."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in the Nusa Penida Car Tour package?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All car tour packages include a private air-conditioned car, experienced local driver/photographer, petrol/BBM, return fastboat tickets from Sanur Harbor, entrance fees to all destinations, and lunch."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price of renting a scooter in Nusa Penida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Motorbike rentals start from IDR 100,000 / day for Honda Scoopy and IDR 150,000 / day for Honda Vario 125cc. Includes 2 SNI helmets, raincoats, full tank starting fuel, and free delivery to Toya Pakeh / Banjar Nyuh harbor."
          }
        }
      ]
    }
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Tuya Rental Nusa Penida" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content={lang} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Tuya Rental Nusa Penida" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDesc} />
      <meta property="twitter:image" content={finalImage} />

      {/* AI & Search Engine Rich Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
