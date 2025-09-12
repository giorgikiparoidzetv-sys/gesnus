import { Helmet } from "react-helmet-async";
import { useTranslation } from "@/hooks/useTranslation.tsx";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = "snus, tobacco pouches, nicotine pouches, premium snus, online shop",
  image = "/opengraph-image.png",
  url 
}: SEOHeadProps) => {
  const { t, language } = useTranslation();
  
  const siteTitle = title || t("meta.title");
  const siteDescription = description || t("meta.description");
  const canonicalUrl = url || "https://gegesnusavs.com/";

  return (
    <Helmet>
      <html lang={language} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GeSnus" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`https://gegesnusavs.com${image}`} />
      <meta property="og:locale" content={language === "ka" ? "ka_GE" : "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@gegesnusavs" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={`https://gegesnusavs.com${image}`} />
    </Helmet>
  );
};

export default SEOHead;