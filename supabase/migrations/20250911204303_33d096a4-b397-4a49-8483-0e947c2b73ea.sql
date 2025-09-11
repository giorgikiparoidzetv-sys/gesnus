-- Insert 28 additional products (products 23-50) to reach 50 total products with unique slugs
INSERT INTO public.products (
  id, slug, name_en, name_ka, short_description_en, short_description_ka, 
  long_description_en, long_description_ka, brand, strength, nicotine_mg, 
  flavor_tags, price, currency, stock, sku, image_url, featured, category,
  seo_title, seo_description, og_image, created_at, updated_at
) VALUES 
-- Product 23 - Thunder X White Portion (Featured)
(
  gen_random_uuid(), 'thunder-x-white-portion-extreme', 'Thunder X White Portion', 'თანდერ ხ ვაიტ პორშენ',
  'Powerful white portion snus with intense tobacco flavor and extra strength', 'ძლიერი ვაიტ პორშენ სნუსი ინტენსიური თუთუნის გემოთ და დამატებითი სიძლიერით',
  'Thunder X White Portion delivers an intense snus experience with powerful tobacco character and extra strength. The white portion format provides clean taste delivery and minimal drip, making it perfect for experienced users seeking maximum impact.', 
  'თანდერ ხ ვაიტ პორშენ იძლევა ინტენსიურ სნუს გამოცდილებას ძლიერი თუთუნის ხასიათით და დამატებითი სიძლიერით.',
  'Thunder', 'Extra Strong', 16.0, ARRAY['tobacco', 'intense', 'strong'], 6.49, 'GEL', 45, 'THX-WP-001', 'src/assets/product-23.jpg', true, 'Portion Snus',
  'Thunder X White Portion - Extra Strong Snus | Premium Quality', 'Experience the power of Thunder X White Portion snus with intense tobacco flavor and extra strength.', 'src/assets/product-23.jpg', now(), now()
),

-- Product 24 - Skruf Super White Slim Premium (Featured)
(
  gen_random_uuid(), 'skruf-super-white-slim-premium', 'Skruf Super White Slim', 'სკრუფ სუპერ ვაიტ სლიმ',
  'Premium Swedish slim white snus with refined tobacco taste', 'პრემიუმ შვედური სლიმ ვაიტ სნუსი დახვეწილი თუთუნის გემოთ',
  'Skruf Super White Slim represents the finest in Swedish snus craftsmanship. This premium white portion offers a perfectly balanced tobacco flavor in a comfortable slim format.',
  'სკრუფ სუპერ ვაიტ სლიმ წარმოადგენს შვედური სნუს ხელოსნობის საუკეთესო ნიმუშს.',
  'Skruf', 'Regular', 8.5, ARRAY['tobacco', 'balanced', 'premium'], 5.99, 'GEL', 67, 'SKF-SWS-002', 'src/assets/product-24.jpg', true, 'Portion Snus',
  'Skruf Super White Slim - Premium Swedish Snus | Refined Taste', 'Discover Skruf Super White Slim snus with refined tobacco taste and premium Swedish quality.', 'src/assets/product-24.jpg', now(), now()
),

-- Product 25 - XQS Pipe Candy Sweet
(
  gen_random_uuid(), 'xqs-pipe-candy-sweet', 'XQS Pipe Candy', 'იქსქუს ფაიპ კენდი',
  'Sweet candy-flavored nicotine pouches with playful taste', 'ტკბილი კანფეტის გემოვნების ნიკოტინის ჩანთები სახალისო გემოთ',
  'XQS Pipe Candy brings a playful twist to nicotine pouches with its sweet candy flavor reminiscent of childhood treats.', 
  'იქსქუს ფაიფ კენდი მოაქვს სახალისო ნაკლისი ნიკოტინის ჩანთებში თავისი ტკბილი კანფეტის გემოთ.',
  'XQS', 'Regular', 6.0, ARRAY['candy', 'sweet', 'playful'], 4.29, 'GEL', 38, 'XQS-PC-004', 'src/assets/product-26.jpg', false, 'Nicotine Pouches',
  'XQS Pipe Candy - Sweet Nicotine Pouches | Fun Flavor', 'Enjoy XQS Pipe Candy nicotine pouches with sweet candy flavor.', 'src/assets/product-26.jpg', now(), now()
),

-- Product 26 - Velo Ice Cool Mint Premium (Featured)
(
  gen_random_uuid(), 'velo-ice-cool-mint-premium', 'Velo Ice Cool Mint', 'ველო აისი კულ მინტი',
  'Refreshing mint nicotine pouches with cooling sensation', 'გამაგრილებელი მინტის ნიკოტინის ჩანთები გაცივების სენსაციით',
  'Velo Ice Cool Mint delivers an intensely refreshing experience with its icy mint flavor and cooling sensation.', 
  'ველო აისი კულ მინტი იძლევა ინტენსიურად გამაგრილებელ გამოცდილებას თავისი ყინულოვანი მინტის გემოთ.',
  'Velo', 'Strong', 10.0, ARRAY['mint', 'cooling', 'fresh'], 5.49, 'GEL', 73, 'VLO-ICM-005', 'src/assets/product-27.jpg', true, 'Nicotine Pouches',
  'Velo Ice Cool Mint - Refreshing Nicotine Pouches | Cooling Effect', 'Experience Velo Ice Cool Mint nicotine pouches with intense cooling sensation.', 'src/assets/product-27.jpg', now(), now()
),

-- Product 27 - ZYN Cool Mint Smooth
(
  gen_random_uuid(), 'zyn-cool-mint-smooth', 'ZYN Cool Mint', 'ზინ კულ მინტი',
  'Premium nicotine pouches with smooth mint flavor', 'პრემიუმ ნიკოტინის ჩანთები რბილი მინტის გემოთ',
  'ZYN Cool Mint offers a smooth and refreshing mint experience in a premium nicotine pouch format.', 
  'ზინ კულ მინტი გთავაზობთ რბილ და გამაგრილებელ მინტის გამოცდილებას პრემიუმ ნიკოტინის ჩანთის ფორმატში.',
  'ZYN', 'Regular', 6.0, ARRAY['mint', 'smooth', 'premium'], 4.99, 'GEL', 89, 'ZYN-CM-006', 'src/assets/product-28.jpg', false, 'Nicotine Pouches',
  'ZYN Cool Mint - Premium Nicotine Pouches | Smooth Mint', 'Discover ZYN Cool Mint nicotine pouches with smooth mint flavor.', 'src/assets/product-28.jpg', now(), now()
),

-- Product 28 - Lundgrens Skåne White Premium (Featured)
(
  gen_random_uuid(), 'lundgrens-skane-white-premium', 'Lundgrens Skåne White', 'ლუნდგრენს სკონე ვაიტ',
  'Classic Swedish white portion with traditional tobacco character', 'კლასიკური შვედური ვაიტ პორშენ ტრადიციული თუთუნის ხასიათით',
  'Lundgrens Skåne White represents the classic Swedish snus tradition with its authentic tobacco flavor.', 
  'ლუნდგრენს სკონე ვაიტი წარმოადგენს კლასიკურ შვედურ სნუს ტრადიციას.',
  'Lundgrens', 'Regular', 8.0, ARRAY['tobacco', 'classic', 'traditional'], 4.79, 'GEL', 61, 'LDG-SW-007', 'src/assets/product-29.jpg', true, 'Portion Snus',
  'Lundgrens Skåne White - Classic Swedish Snus | Traditional Flavor', 'Experience Lundgrens Skåne White with authentic Swedish tobacco flavor.', 'src/assets/product-29.jpg', now(), now()
),

-- Product 29 - Catch Eucalyptus White Mini Fresh
(
  gen_random_uuid(), 'catch-eucalyptus-white-mini-fresh', 'Catch Eucalyptus White Mini', 'კეჩ ევკალიპტი ვაიტ მინი',
  'Fresh eucalyptus snus in convenient mini format', 'ახალი ევკალიპტის სნუსი კომფორტულ მინი ფორმატში',
  'Catch Eucalyptus White Mini combines the refreshing taste of eucalyptus with the convenience of mini portions.', 
  'კეჩ ევკალიპტი ვაიტ მინი აერთებს ევკალიპტის გამაგრილებელ გემოს მინი პორციების კომფორტთან.',
  'Catch', 'Regular', 8.0, ARRAY['eucalyptus', 'fresh', 'mini'], 4.39, 'GEL', 44, 'CTC-EWM-008', 'src/assets/product-30.jpg', false, 'Portion Snus',
  'Catch Eucalyptus White Mini - Fresh Snus | Mini Format', 'Enjoy Catch Eucalyptus White Mini with refreshing eucalyptus flavor.', 'src/assets/product-30.jpg', now(), now()
),

-- Product 30 - Loop Jalapeño Lime Strong Bold
(
  gen_random_uuid(), 'loop-jalapeno-lime-strong-bold', 'Loop Jalapeño Lime Strong', 'ლუპ ჟალაპენო ლაიმ სტრონგ',
  'Spicy jalapeño and zesty lime nicotine pouches', 'ცხარე ჟალაპენოსა და ცისფერი ლაიმის ნიკოტინის ჩანთები',
  'Loop Jalapeño Lime Strong delivers an exciting flavor adventure with the perfect balance of spicy jalapeño heat and zesty lime freshness.', 
  'ლუპ ჟალაპენო ლაიმ სტრონგი იძლევა ამაღელვებელ გემოვნურ თავგადასავალს.',
  'Loop', 'Strong', 12.0, ARRAY['jalapeño', 'lime', 'spicy'], 5.89, 'GEL', 36, 'LOP-JLS-010', 'src/assets/product-32.jpg', false, 'Nicotine Pouches',
  'Loop Jalapeño Lime Strong - Spicy Nicotine Pouches | Bold Flavor', 'Experience Loop Jalapeño Lime Strong with exciting spicy jalapeño and lime flavor.', 'src/assets/product-32.jpg', now(), now()
),

-- Product 31 - Kapten White Original Classic
(
  gen_random_uuid(), 'kapten-white-original-classic', 'Kapten White Original', 'კაპტენ ვაიტ ორიჯინალ',
  'Traditional Swedish snus with authentic tobacco taste', 'ტრადიციული შვედური სნუსი ავთენტური თუთუნის გემოთ',
  'Kapten White Original honors the Swedish snus tradition with its authentic tobacco character and white portion format.', 
  'კაპტენ ვაიტ ორიჯინალი პატივს სცემს შვედურ სნუს ტრადიციას.',
  'Kapten', 'Regular', 8.0, ARRAY['tobacco', 'traditional', 'authentic'], 4.69, 'GEL', 48, 'KPT-WO-011', 'src/assets/product-33.jpg', false, 'Portion Snus',
  'Kapten White Original - Traditional Swedish Snus | Authentic Taste', 'Discover Kapten White Original with traditional Swedish tobacco flavor.', 'src/assets/product-33.jpg', now(), now()
),

-- Product 32 - Pablo Ice Cold Extra Strong Max (Featured)
(
  gen_random_uuid(), 'pablo-ice-cold-extra-strong-max', 'Pablo Ice Cold Extra Strong', 'პაბლო აისი კოლდ ექსტრა სტრონგ',
  'Extreme strength nicotine pouches with icy cooling effect', 'უკიდურესად ძლიერი ნიკოტინის ჩანთები ყინულოვანი გაცივების ეფექტით',
  'Pablo Ice Cold Extra Strong is designed for users seeking maximum strength and intense cooling sensation.', 
  'პაბლო აისი კოლდ ექსტრა სტრონგი შექმნილია მაქსიმალური სიძლიერისა და ინტენსიური გაცივების სენსაციის მაძიებელი მომხმარებლებისთვის.',
  'Pablo', 'Extra Strong', 30.0, ARRAY['ice', 'extreme', 'cooling'], 7.99, 'GEL', 29, 'PBL-ICES-012', 'src/assets/product-34.jpg', true, 'Nicotine Pouches',
  'Pablo Ice Cold Extra Strong - Extreme Nicotine Pouches | Maximum Strength', 'Experience Pablo Ice Cold Extra Strong with extreme strength and intense cooling.', 'src/assets/product-34.jpg', now(), now()
),

-- Product 33 - Lyft Berry Frost Fresh
(
  gen_random_uuid(), 'lyft-berry-frost-fresh', 'Lyft Berry Frost', 'ლიფტ ბერი ფროსტ',
  'Mixed berry nicotine pouches with cooling sensation', 'შერეული კენკროვნების ნიკოტინის ჩანთები გაცივების სენსაციით',
  'Lyft Berry Frost combines the sweetness of mixed berries with a refreshing cooling sensation.', 
  'ლიფტ ბერი ფროსტი აერთებს შერეული კენკროვნების სიტკბოს გამაგრილებელ გაცივების სენსაციასთან.',
  'Lyft', 'Regular', 8.0, ARRAY['berry', 'frost', 'fruity'], 4.79, 'GEL', 65, 'LFT-BF-013', 'src/assets/product-35.jpg', false, 'Nicotine Pouches',
  'Lyft Berry Frost - Fruity Nicotine Pouches | Berry Cooling', 'Enjoy Lyft Berry Frost with mixed berry flavor and refreshing cooling.', 'src/assets/product-35.jpg', now(), now()
),

-- Product 34 - ON! Citrus 8mg Zesty
(
  gen_random_uuid(), 'on-citrus-8mg-zesty', 'ON! Citrus 8mg', 'ონ! ციტრუსი 8მგ',
  'Zesty citrus nicotine pouches with moderate strength', 'ცისფერი ციტრუსის ნიკოტინის ჩანთები ზომიერი სიძლიერით',
  'ON! Citrus 8mg offers a bright and zesty citrus flavor in a moderate strength nicotine pouch.', 
  'ონ! ციტრუსი 8მგ გთავაზობთ ნათელ და ცისფერ ციტრუსის გემოს.',
  'ON!', 'Regular', 8.0, ARRAY['citrus', 'zesty', 'fruity'], 4.19, 'GEL', 71, 'ON-CIT-014', 'src/assets/product-36.jpg', false, 'Nicotine Pouches',
  'ON! Citrus 8mg - Zesty Nicotine Pouches | Citrus Flavor', 'Discover ON! Citrus 8mg with bright citrus flavor.', 'src/assets/product-36.jpg', now(), now()
),

-- Product 35 - G.4 Blue Mint Slim White Premium
(
  gen_random_uuid(), 'g4-blue-mint-slim-white-premium', 'G.4 Blue Mint Slim White', 'ჯი.4 ბლუ მინტ სლიმ ვაიტ',
  'Premium slim white snus with refreshing mint flavor', 'პრემიუმ სლიმ ვაიტ სნუსი გამაგრილებელი მინტის გემოთ',
  'G.4 Blue Mint Slim White represents premium Swedish snus craftsmanship with its refreshing mint flavor.', 
  'ჯი.4 ბლუ მინტ სლიმ ვაიტი წარმოადგენს პრემიუმ შვედურ სნუს ხელოსნობას.',
  'G.4', 'Regular', 8.0, ARRAY['mint', 'premium', 'slim'], 5.29, 'GEL', 42, 'G4-BMS-015', 'src/assets/product-37.jpg', false, 'Portion Snus',
  'G.4 Blue Mint Slim White - Premium Mint Snus | Slim Format', 'Experience G.4 Blue Mint Slim White with refreshing mint flavor.', 'src/assets/product-37.jpg', now(), now()
),

-- Product 36 - Ace Eucalyptus Extra Strong Fresh
(
  gen_random_uuid(), 'ace-eucalyptus-extra-strong-fresh', 'Ace Eucalyptus Extra Strong', 'ეისი ევკალიპტი ექსტრა სტრონგ',
  'Strong eucalyptus nicotine pouches with intense freshness', 'ძლიერი ევკალიპტის ნიკოტინის ჩანთები ინტენსიური სისუფთავით',
  'Ace Eucalyptus Extra Strong delivers powerful eucalyptus flavor with extra strength nicotine content.', 
  'ეისი ევკალიპტი ექსტრა სტრონგი იძლევა ძლიერ ევკალიპტის გემოს.',
  'Ace', 'Extra Strong', 16.0, ARRAY['eucalyptus', 'strong', 'fresh'], 6.19, 'GEL', 33, 'ACE-EES-016', 'src/assets/product-38.jpg', false, 'Nicotine Pouches',
  'Ace Eucalyptus Extra Strong - Powerful Nicotine Pouches | Intense Freshness', 'Experience Ace Eucalyptus Extra Strong with powerful eucalyptus flavor.', 'src/assets/product-38.jpg', now(), now()
),

-- Product 37 - Killa Cold Mint Extra Strong Intense (Featured)
(
  gen_random_uuid(), 'killa-cold-mint-extra-strong-intense', 'Killa Cold Mint Extra Strong', 'კილა კოლდ მინტ ექსტრა სტრონგ',
  'Extreme strength nicotine pouches with intense mint cooling', 'უკიდურესად ძლიერი ნიკოტინის ჩანთები ინტენსიური მინტის გაცივებით',
  'Killa Cold Mint Extra Strong is designed for experienced users seeking maximum strength and intense mint cooling.', 
  'კილა კოლდ მინტ ექსტრა სტრონგი შექმნილია გამოცდილი მომხმარებლებისთვის.',
  'Killa', 'Extra Strong', 25.0, ARRAY['mint', 'extreme', 'cooling'], 7.49, 'GEL', 27, 'KLA-CMES-018', 'src/assets/product-40.jpg', true, 'Nicotine Pouches',
  'Killa Cold Mint Extra Strong - Extreme Nicotine Pouches | Intense Mint', 'Experience Killa Cold Mint Extra Strong with extreme strength and intense mint cooling.', 'src/assets/product-40.jpg', now(), now()
),

-- Product 38 - White Fox Full Charge Max
(
  gen_random_uuid(), 'white-fox-full-charge-max', 'White Fox Full Charge Max', 'ვაიტ ფოქს ფულ ჩარჯ მაქს',
  'Maximum strength nicotine pouches with mint flavor', 'მაქსიმალური სიძლიერის ნიკოტინის ჩანთები მინტის გემოთ',
  'White Fox Full Charge Max delivers maximum strength nicotine with refreshing mint flavor.', 
  'ვაიტ ფოქს ფულ ჩარჯ მაქსი იძლევა მაქსიმალური სიძლიერის ნიკოტინს.',
  'White Fox', 'Extra Strong', 28.0, ARRAY['mint', 'maximum', 'premium'], 8.49, 'GEL', 24, 'WFX-FC-019', 'src/assets/product-41.jpg', false, 'Nicotine Pouches',
  'White Fox Full Charge Max - Maximum Strength Nicotine Pouches | Premium Quality', 'Experience White Fox Full Charge Max with maximum strength nicotine.', 'src/assets/product-41.jpg', now(), now()
),

-- Product 39 - Iceberg Watermelon Medium Sweet
(
  gen_random_uuid(), 'iceberg-watermelon-medium-sweet', 'Iceberg Watermelon Medium', 'აისბერგ საზღვრისპირა ზომიერი',
  'Sweet watermelon nicotine pouches with moderate strength', 'ტკბილი საზღვრისპირა ნიკოტინის ჩანთები ზომიერი სიძლიერით',
  'Iceberg Watermelon Medium offers a sweet and refreshing watermelon flavor in a perfectly balanced nicotine pouch.', 
  'აისბერგ საზღვრისპირა ზომიერი გთავაზობთ ტკბილ და გამაგრილებელ საზღვრისპირა გემოს.',
  'Iceberg', 'Regular', 6.0, ARRAY['watermelon', 'sweet', 'fruity'], 4.59, 'GEL', 54, 'ICB-WM-020', 'src/assets/product-42.jpg', false, 'Nicotine Pouches',
  'Iceberg Watermelon Medium - Sweet Nicotine Pouches | Watermelon Flavor', 'Enjoy Iceberg Watermelon Medium with sweet watermelon flavor.', 'src/assets/product-42.jpg', now(), now()
),

-- Product 40 - Volt Frosted Apple Strong Cool
(
  gen_random_uuid(), 'volt-frosted-apple-strong-cool', 'Volt Frosted Apple Strong', 'ვოლტ ყინულოვანი ვაშლი სტრონგ',
  'Crisp apple nicotine pouches with cooling effect', 'კრისპი ვაშლის ნიკოტინის ჩანთები გაცივების ეფექტით',
  'Volt Frosted Apple Strong combines the crisp taste of fresh apples with a cooling frost effect.', 
  'ვოლტ ყინულოვანი ვაშლი სტრონგი აერთებს ახალი ვაშლის კრისპ გემოს.',
  'Volt', 'Strong', 11.0, ARRAY['apple', 'frost', 'crisp'], 5.79, 'GEL', 39, 'VLT-FAS-021', 'src/assets/product-43.jpg', false, 'Nicotine Pouches',
  'Volt Frosted Apple Strong - Apple Nicotine Pouches | Cooling Effect', 'Experience Volt Frosted Apple Strong with crisp apple flavor.', 'src/assets/product-43.jpg', now(), now()
),

-- Product 41 - Corvus Blackcurrant Strong Premium
(
  gen_random_uuid(), 'corvus-blackcurrant-strong-premium', 'Corvus Blackcurrant Strong', 'კორვუს შავი მოცხარი სტრონგ',
  'Rich blackcurrant snus with strong tobacco base', 'მდიდარი შავი მოცხარის სნუსი ძლიერი თუთუნის ბაზით',
  'Corvus Blackcurrant Strong offers a unique combination of rich blackcurrant flavor with strong Swedish tobacco.', 
  'კორვუს შავი მოცხარი სტრონგი გთავაზობთ მდიდარი შავი მოცხარის გემოს უნიკალურ კომბინაციას.',
  'Corvus', 'Strong', 12.0, ARRAY['blackcurrant', 'rich', 'tobacco'], 5.99, 'GEL', 31, 'CRV-BCS-022', 'src/assets/product-44.jpg', false, 'Portion Snus',
  'Corvus Blackcurrant Strong - Rich Blackcurrant Snus | Premium Quality', 'Discover Corvus Blackcurrant Strong with rich blackcurrant flavor.', 'src/assets/product-44.jpg', now(), now()
),

-- Product 42 - Klint Honeymelon Slim White Premium (Featured)
(
  gen_random_uuid(), 'klint-honeymelon-slim-white-premium', 'Klint Honeymelon Slim White', 'კლინტ თოვლისფერი ნიახური სლიმ ვაიტ',
  'Sweet honeydew melon nicotine pouches in slim format', 'ტკბილი თოვლისფერი ნიახურის ნიკოტინის ჩანთები სლიმ ფორმატში',
  'Klint Honeymelon Slim White offers a delightfully sweet honeydew melon flavor in a comfortable slim white format.', 
  'კლინტ თოვლისფერი ნიახური სლიმ ვაიტი გთავაზობთ საოცრად ტკბილ თოვლისფერი ნიახურის გემოს.',
  'Klint', 'Regular', 8.0, ARRAY['melon', 'sweet', 'fruity'], 4.89, 'GEL', 46, 'KLN-HMS-025', 'src/assets/product-47.jpg', true, 'Nicotine Pouches',
  'Klint Honeymelon Slim White - Sweet Melon Nicotine Pouches | Premium Quality', 'Enjoy Klint Honeymelon Slim White with delightful honeydew melon flavor.', 'src/assets/product-47.jpg', now(), now()
),

-- Product 43 - RITE Cola Strong Classic
(
  gen_random_uuid(), 'rite-cola-strong-classic', 'RITE Cola Strong', 'რაიტ კოლა სტრონგ',
  'Classic cola flavored nicotine pouches with strong delivery', 'კლასიკური კოლას გემოვნების ნიკოტინის ჩანთები ძლიერი მიწოდებით',
  'RITE Cola Strong brings the nostalgic taste of classic cola to nicotine pouches with strong delivery.', 
  'რაიტ კოლა სტრონგი მოაქვს კლასიკური კოლას ნოსტალგიური გემო.',
  'RITE', 'Strong', 10.0, ARRAY['cola', 'classic', 'nostalgic'], 5.39, 'GEL', 37, 'RTE-CS-026', 'src/assets/product-48.jpg', false, 'Nicotine Pouches',
  'RITE Cola Strong - Classic Cola Nicotine Pouches | Nostalgic Flavor', 'Experience RITE Cola Strong with authentic cola flavor.', 'src/assets/product-48.jpg', now(), now()
),

-- Product 44 - Zone X Cold Blast Extra Strong Ultimate (Featured)
(
  gen_random_uuid(), 'zone-x-cold-blast-extra-strong-ultimate', 'Zone X Cold Blast Extra Strong', 'ზონ ხ კოლდ ბლასტ ექსტრა სტრონგ',
  'Extreme cooling nicotine pouches with maximum strength', 'უკიდურესი გაცივების ნიკოტინის ჩანთები მაქსიმალური სიძლიერით',
  'Zone X Cold Blast Extra Strong delivers the ultimate cooling experience with maximum strength nicotine content.', 
  'ზონ ხ კოლდ ბლასტ ექსტრა სტრონგი იძლევა უაღრესად გაცივების გამოცდილებას.',
  'Zone X', 'Extra Strong', 20.0, ARRAY['cooling', 'extreme', 'blast'], 7.19, 'GEL', 22, 'ZNX-CBES-027', 'src/assets/product-49.jpg', true, 'Nicotine Pouches',
  'Zone X Cold Blast Extra Strong - Extreme Cooling Pouches | Maximum Strength', 'Experience Zone X Cold Blast Extra Strong with ultimate cooling sensation.', 'src/assets/product-49.jpg', now(), now()
),

-- Product 45 - Nordic Spirit Elderflower Slim White Premium
(
  gen_random_uuid(), 'nordic-spirit-elderflower-slim-white-premium', 'Nordic Spirit Elderflower Slim White', 'ნორდიკ სპირიტ ელდერფლაუერ სლიმ ვაიტ',
  'Elegant elderflower nicotine pouches in premium slim format', 'ელეგანტური ელდერფლაუერის ნიკოტინის ჩანთები პრემიუმ სლიმ ფორმატში',
  'Nordic Spirit Elderflower Slim White offers an elegant and sophisticated elderflower flavor in a premium slim white format.', 
  'ნორდიკ სპირიტ ელდერფლაუერ სლიმ ვაიტი გთავაზობთ ელეგანტურ და დახვეწილ ელდერფლაუერის გემოს.',
  'Nordic Spirit', 'Regular', 9.0, ARRAY['elderflower', 'elegant', 'premium'], 5.69, 'GEL', 63, 'NSP-ESW-028', 'src/assets/product-50.jpg', false, 'Nicotine Pouches',
  'Nordic Spirit Elderflower Slim White - Elegant Nicotine Pouches | Premium Quality', 'Discover Nordic Spirit Elderflower Slim White with sophisticated elderflower flavor.', 'src/assets/product-50.jpg', now(), now()
),

-- Additional products to reach 50 total
-- Product 46 - Thunder Frosted Mint Strong
(
  gen_random_uuid(), 'thunder-frosted-mint-strong', 'Thunder Frosted Mint Strong', 'თანდერ ფროსტად მინტ სტრონგ',
  'Intense mint snus with powerful cooling and extra strength', 'ინტენსიური მინტის სნუსი ძლიერი გაცივებითა და დამატებითი სიძლიერით',
  'Thunder Frosted Mint Strong combines intense mint flavor with powerful cooling sensation and extra strength nicotine delivery for experienced users seeking maximum mint impact.',
  'თანდერ ფროსტად მინტ სტრონგი აერთებს ინტენსიურ მინტის გემოს ძლიერ გაცივების სენსაციასთან და დამატებით სიძლიერე ნიკოტინის მიწოდებასთან.',
  'Thunder', 'Strong', 12.0, ARRAY['mint', 'frosted', 'strong'], 6.29, 'GEL', 35, 'THN-FMS-029', 'src/assets/thunder-frosted.jpg', false, 'Portion Snus',
  'Thunder Frosted Mint Strong - Intense Mint Snus | Extra Strength', 'Experience Thunder Frosted Mint Strong with intense mint flavor and powerful cooling sensation.',
  'src/assets/thunder-frosted.jpg', now(), now()
),

-- Product 47 - General G4 Fizzy
(
  gen_random_uuid(), 'general-g4-fizzy', 'General G.4 Fizzy', 'ჯენერალ ჯი.4 ფიზი',
  'Innovative fizzy snus with unique effervescent sensation', 'ინოვაციური ფიზიანი სნუსი უნიკალური გაზიანი სენსაციით',
  'General G.4 Fizzy introduces an innovative snus experience with a unique fizzy sensation that adds excitement to the traditional General tobacco flavor profile.',
  'ჯენერალ ჯი.4 ფიზი წარმოდგენს ინოვაციურ სნუს გამოცდილებას უნიკალური ფიზიანი სენსაციით.',
  'General', 'Regular', 8.5, ARRAY['fizzy', 'innovative', 'tobacco'], 5.79, 'GEL', 42, 'GEN-G4F-030', 'src/assets/general-white.jpg', false, 'Portion Snus',
  'General G.4 Fizzy - Innovative Fizzy Snus | Unique Sensation', 'Discover General G.4 Fizzy with unique effervescent sensation and classic General flavor.',
  'src/assets/general-white.jpg', now(), now()
),

-- Product 48 - Lundgrens Västkusten
(
  gen_random_uuid(), 'lundgrens-vastkusten', 'Lundgrens Västkusten', 'ლუნდგრენს ვესტკუსტენ',
  'Traditional Swedish snus with sea breeze and salt notes', 'ტრადიციული შვედური სნუსი ზღვის ნიავისა და მარილის ნოტებით',
  'Lundgrens Västkusten captures the essence of Sweden\'s west coast with its unique blend of sea breeze and subtle salt notes, creating a distinctive maritime snus experience.',
  'ლუნდგრენს ვესტკუსტენი იჭერს შვედეთის დასავლეთ სანაპიროს არსს თავისი უნიკალური ზღვის ნიავისა და ნაზი მარილის ნოტების ნარევით.',
  'Lundgrens', 'Regular', 8.0, ARRAY['sea breeze', 'salt', 'maritime'], 4.99, 'GEL', 48, 'LDG-VST-031', 'src/assets/goteborg-rape.jpg', false, 'Portion Snus',
  'Lundgrens Västkusten - Maritime Swedish Snus | Sea Breeze Flavor', 'Experience Lundgrens Västkusten with unique sea breeze and salt notes from Sweden\'s west coast.',
  'src/assets/goteborg-rape.jpg', now(), now()
),

-- Product 49 - Odens Vanilla Extreme
(
  gen_random_uuid(), 'odens-vanilla-extreme', 'Odens Vanilla Extreme', 'ოდენს ვანილი ექსტრიმ',
  'Rich vanilla snus with extra strong nicotine delivery', 'მდიდარი ვანილის სნუსი ექსტრა ძლიერი ნიკოტინის მიწოდებით',
  'Odens Vanilla Extreme offers a luxurious vanilla flavor experience combined with extra strong nicotine content for users who appreciate rich, sweet flavors with powerful satisfaction.',
  'ოდენს ვანილი ექსტრიმი გთავაზობთ ძვირფას ვანილის გემოს გამოცდილებას ექსტრა ძლიერ ნიკოტინის შემცველობასთან ერთად.',
  'Odens', 'Extra Strong', 16.0, ARRAY['vanilla', 'sweet', 'extreme'], 6.89, 'GEL', 33, 'ODN-VE-032', 'src/assets/odens.jpg', false, 'Portion Snus',
  'Odens Vanilla Extreme - Rich Vanilla Snus | Extra Strong', 'Discover Odens Vanilla Extreme with luxurious vanilla flavor and extra strong nicotine delivery.',
  'src/assets/odens.jpg', now(), now()
),

-- Product 50 - Skruf Nordic Blue
(
  gen_random_uuid(), 'skruf-nordic-blue', 'Skruf Nordic Blue', 'სკრუფ ნორდიკ ბლუ',
  'Premium Nordic-inspired snus with blueberry and pine notes', 'პრემიუმ ნორდიკული ინსპირირებული სნუსი მოცვის და ფიჭვის ნოტებით',
  'Skruf Nordic Blue embodies the essence of Scandinavian nature with its sophisticated blend of wild blueberry and subtle pine forest notes, creating an authentic Nordic snus experience.',
  'სკრუფ ნორდიკ ბლუ განასახიერებს სკანდინავიური ბუნების არსს თავისი დახვეწილი ველური მოცვისა და ნაზი ფიჭვის ტყის ნოტების ნარევით.',
  'Skruf', 'Regular', 8.5, ARRAY['blueberry', 'pine', 'nordic'], 5.99, 'GEL', 51, 'SKF-NB-033', 'src/assets/siberia.jpg', false, 'Portion Snus',
  'Skruf Nordic Blue - Premium Nordic Snus | Blueberry & Pine', 'Experience Skruf Nordic Blue with authentic Scandinavian blueberry and pine forest flavors.',
  'src/assets/siberia.jpg', now(), now()
);