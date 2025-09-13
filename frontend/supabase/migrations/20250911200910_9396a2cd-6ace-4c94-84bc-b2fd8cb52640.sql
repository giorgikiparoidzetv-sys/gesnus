-- Create products table with comprehensive fields
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_ka TEXT NOT NULL,
  short_description_en TEXT NOT NULL,
  short_description_ka TEXT NOT NULL,
  long_description_en TEXT NOT NULL,
  long_description_ka TEXT NOT NULL,
  brand TEXT NOT NULL,
  strength TEXT NOT NULL,
  nicotine_mg NUMERIC(4,2) NOT NULL,
  flavor_tags TEXT[] DEFAULT '{}',
  price NUMERIC(10,2) NOT NULL,
  sale_price NUMERIC(10,2),
  currency TEXT NOT NULL DEFAULT 'GEL',
  stock INTEGER NOT NULL DEFAULT 0,
  sku TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  category TEXT NOT NULL DEFAULT 'Portion Snus',
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.0,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (products should be viewable by everyone)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_strength ON public.products(strength);
CREATE INDEX idx_products_featured ON public.products(featured);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_flavor_tags ON public.products USING GIN(flavor_tags);

-- Insert the existing 8 products first
INSERT INTO public.products (
  slug, name_en, name_ka, short_description_en, short_description_ka, 
  long_description_en, long_description_ka, brand, strength, nicotine_mg, 
  flavor_tags, price, sale_price, sku, image_url, featured, rating
) VALUES 
('general-white-portion', 'General White Portion', 'ჯენერალ ვაითი პორშენ', 
 'Classic Swedish snus with traditional tobacco flavor', 'კლასიკური შვედური სნუსი ტრადიციული თამბაქოს გემოთ',
 'General White is the original white portion snus that started it all. Made with high-quality tobacco and a balanced blend of spices.', 
 'ჯენერალ ვაითი არის ორიგინალური თეთრი პორშენი სნუსი რომელმაც ყველაფერი დაიწყო. დამზადებული მაღალი ხარისხის თამბაქოთ.',
 'General', 'Regular', 8.5, ARRAY['tobacco', 'bergamot'], 4.99, 6.99, 'GEN-WP-001', '/assets/general-white.jpg', true, 5.0),

('siberia-white-dry', 'Siberia White Dry', 'სიბირია ვაითი დრაი', 
 'Extra strong snus with intense mint flavor', 'ძალიან ძლიერი სნუსი ინტენსიური პიტნის გემოთ',
 'Siberia White Dry delivers an extreme nicotine experience with refreshing mint. For experienced users only.',
 'სიბირია ვაითი დრაი იძლევა ექსტრემალურ ნიკოტინს განცდას მაგრივებელი პიტნით. მხოლოდ გამოცდილი მომხმარებლებისთვის.',
 'Siberia', 'Extra Strong', 43.0, ARRAY['mint', 'menthol'], 5.49, NULL, 'SIB-WD-001', '/assets/siberia.jpg', true, 4.0),

('goteborg-rape-white', 'Göteborg Rapé White', 'გოტებორგ რაპე ვაითი', 
 'Traditional Swedish snus with juniper and lavender', 'ტრადიციული შვედური სნუსი ღია და ლავანდით',
 'A classic recipe dating back to 1919, featuring juniper berries and lavender for a unique aromatic experience.',
 '1919 წლიდან მოყოლებული კლასიკური რეცეპტი, რომელიც შეიცავს ღიას კენკრებსა და ლავანდას უნიკალური არომატისთვის.',
 'Göteborg Rapé', 'Regular', 8.0, ARRAY['juniper', 'lavender', 'tobacco'], 4.79, NULL, 'GR-W-001', '/assets/goteborg-rape.jpg', true, 5.0),

('odens-cold-dry', 'Odens Cold Dry', 'ოდენს კოლდ დრაი', 
 'Refreshing mint snus with cooling sensation', 'მაგრივებელი პიტნის სნუსი გამაგრილებელი სენსაციით',
 'Odens Cold Dry provides a refreshing mint experience with a pleasant cooling effect. Perfect for mint lovers.',
 'ოდენს კოლდ დრაი იძლევა მაგრივებელ პიტნის გამოცდილებას სასიამოვნო გამაგრილებელი ეფექტით.',
 'Odens', 'Strong', 14.0, ARRAY['mint', 'menthol'], 3.99, 4.99, 'OD-CD-001', '/assets/odens.jpg', true, 4.0),

('skruf-super-white', 'Skruf Super White', 'სკრუფ სუპერ ვაითი', 
 'Premium white snus with balanced tobacco taste', 'პრემიუმ თეთრი სნუსი დაბალანსებული თამბაქოს გემოთ',
 'Skruf Super White offers a refined tobacco experience with hints of citrus and herbs in a comfortable white portion.',
 'სკრუფ სუპერ ვაითი გთავაზობთ დახვეწილ თამბაქოს გამოცდილებას ციტრუსისა და ბალახეულების ნაზი ნოტებით.',
 'Skruf', 'Strong', 11.0, ARRAY['tobacco', 'citrus', 'herbs'], 5.99, NULL, 'SKR-SW-001', '/assets/general-white.jpg', false, 5.0),

('thunder-frosted', 'Thunder Frosted', 'ზანდერ ფროსტედ', 
 'Cool mint snus with icy freshness', 'ცივი პიტნის სნუსი ყინულისებური სიახლით',
 'Thunder Frosted delivers an icy mint blast that awakens your senses. A favorite among mint enthusiasts.',
 'ზანდერ ფროსტედ იძლევა ყინულისებურ პიტნის აფეთქებას რომელიც აღვიძებს თქვენს გრძნობებს.',
 'Thunder', 'Regular', 9.5, ARRAY['mint', 'menthol'], 4.29, NULL, 'THU-FR-001', '/assets/siberia.jpg', false, 4.0),

('general-mini-mint', 'General Mini Mint', 'ჯენერალ მინი პიტნა', 
 'Compact mint portions for discrete use', 'კომპაქტური პიტნის პორციები დისკრეტული გამოყენებისთვის',
 'General Mini Mint features smaller portions with a refreshing mint flavor, perfect for beginners or discrete use.',
 'ჯენერალ მინი პიტნას აქვს მცირე პორციები მაგრივებელი პიტნის გემოთ, იდეალურია დამწყებებისთვის.',
 'General', 'Light', 6.0, ARRAY['mint', 'tobacco'], 4.49, NULL, 'GEN-MM-001', '/assets/general-white.jpg', false, 4.0),

('odens-double-mint', 'Odens Double Mint', 'ოდენს დაბლ მინტ', 
 'Extra mint flavor for maximum freshness', 'ძალიან პიტნის გემო მაქსიმალური სიახლისთვის',
 'Odens Double Mint packs twice the mint punch with an intense cooling effect that lasts throughout the experience.',
 'ოდენს დაბლ მინტ შეიცავს ორმაგ პიტნის დარტყმას ინტენსიური გამაგრილებელი ეფექტით.',
 'Odens', 'Strong', 12.0, ARRAY['mint', 'menthol'], 4.19, 5.19, 'OD-DM-001', '/assets/odens.jpg', false, 4.0);