-- Insert 28 additional products (products 23-50) to reach 50 total products
INSERT INTO public.products (
  id, slug, name_en, name_ka, short_description_en, short_description_ka, 
  long_description_en, long_description_ka, brand, strength, nicotine_mg, 
  flavor_tags, price, currency, stock, sku, image_url, featured, category,
  seo_title, seo_description, og_image, created_at, updated_at
) VALUES 
-- Product 23 - Thunder X White Portion (Featured)
(
  gen_random_uuid(), 'thunder-x-white-portion', 'Thunder X White Portion', 'თანდერ ხ ვაიტ პორშენ',
  'Powerful white portion snus with intense tobacco flavor and extra strength', 'ძლიერი ვაიტ პორშენ სნუსი ინტენსიური თუთუნის გემოთ და დამატებითი სიძლიერით',
  'Thunder X White Portion delivers an intense snus experience with powerful tobacco character and extra strength. The white portion format provides clean taste delivery and minimal drip, making it perfect for experienced users seeking maximum impact.', 
  'თანდერ ხ ვაიტ პორშენ იძლევა ინტენსიურ სნუს გამოცდილებას ძლიერი თუთუნის ხასიათით და დამატებითი სიძლიერით. ვაიტ პორშენ ფორმატი უზრუნველყოფს სუფთა გემოს მიწოდებას.',
  'Thunder', 'Extra Strong', 16.0, ARRAY['tobacco', 'intense', 'strong'], 6.49, 'GEL', 45, 'THX-WP-001', 'src/assets/product-23.jpg', true, 'Portion Snus',
  'Thunder X White Portion - Extra Strong Snus | Premium Quality', 'Experience the power of Thunder X White Portion snus with intense tobacco flavor and extra strength. Perfect for experienced users.', 'src/assets/product-23.jpg', now(), now()
),

-- Product 24 - Skruf Super White Slim (Featured)
(
  gen_random_uuid(), 'skruf-super-white-slim', 'Skruf Super White Slim', 'სკრუფ სუპერ ვაიტ სლიმ',
  'Premium Swedish slim white snus with refined tobacco taste', 'პრემიუმ შვედური სლიმ ვაიტ სნუსი დახვეწილი თუთუნის გემოთ',
  'Skruf Super White Slim represents the finest in Swedish snus craftsmanship. This premium white portion offers a perfectly balanced tobacco flavor in a comfortable slim format that fits discreetly under the lip.', 
  'სკრუფ სუპერ ვაიტ სლიმ წარმოადგენს შვედური სნუს ხელოსნობის საუკეთესო ნიმუშს. ეს პრემიუმ ვაიტ პორშენ გთავაზობთ იდეალურად დაბალანსებულ თუთუნის გემოს კომფორტულ სლიმ ფორმატში.',
  'Skruf', 'Regular', 8.5, ARRAY['tobacco', 'balanced', 'premium'], 5.99, 'GEL', 67, 'SKF-SWS-002', 'src/assets/product-24.jpg', true, 'Portion Snus',
  'Skruf Super White Slim - Premium Swedish Snus | Refined Taste', 'Discover Skruf Super White Slim snus with refined tobacco taste and premium Swedish quality. Perfect balance and comfort.', 'src/assets/product-24.jpg', now(), now()
),

-- Product 25 - Lundgrens Norrland (using existing image)
(
  gen_random_uuid(), 'lundgrens-norrland', 'Lundgrens Norrland', 'ლუნდგრენს ნორლენდ',
  'Traditional Swedish snus with juniper and forest berry notes', 'ტრადიციული შვედური სნუსი ღიაჟღიის და ტყის კენკროვნების ნოტებით',
  'Lundgrens Norrland captures the essence of northern Sweden with its unique blend of juniper and wild forest berries. This traditional snus offers a distinctive flavor profile that reflects the pristine wilderness of Norrland.', 
  'ლუნდგრენს ნორლენდი იჭერს ჩრდილოეთ შვედეთის არსს თავისი უნიკალური ღიაჟღიისა და ველური ტყის კენკროვნების ნარევით.',
  'Lundgrens', 'Regular', 8.0, ARRAY['juniper', 'berries', 'traditional'], 4.89, 'GEL', 52, 'LDG-NOR-003', 'src/assets/product-25.jpg', false, 'Portion Snus',
  'Lundgrens Norrland - Traditional Swedish Snus with Juniper', 'Experience Lundgrens Norrland snus with unique juniper and forest berry flavors. Traditional Swedish quality.', 'src/assets/product-25.jpg', now(), now()
),

-- Product 26 - XQS Pipe Candy
(
  gen_random_uuid(), 'xqs-pipe-candy', 'XQS Pipe Candy', 'იქსქუს ფაიპ კენდი',
  'Sweet candy-flavored nicotine pouches with playful taste', 'ტკბილი კანფეტის გემოვნების ნიკოტინის ჩანთები სახალისო გემოთ',
  'XQS Pipe Candy brings a playful twist to nicotine pouches with its sweet candy flavor reminiscent of childhood treats. These tobacco-free pouches deliver satisfaction with a fun, nostalgic taste experience.', 
  'იქსქუს ფაიფ კენდი მოაქვს სახალისო ნაკლისი ნიკოტინის ჩანთებში თავისი ტკბილი კანფეტის გემოთ, რომელიც გვახსენებს ბავშვობის ლაკომებს.',
  'XQS', 'Regular', 6.0, ARRAY['candy', 'sweet', 'playful'], 4.29, 'GEL', 38, 'XQS-PC-004', 'src/assets/product-26.jpg', false, 'Nicotine Pouches',
  'XQS Pipe Candy - Sweet Nicotine Pouches | Fun Flavor', 'Enjoy XQS Pipe Candy nicotine pouches with sweet candy flavor. Tobacco-free and playfully delicious.', 'src/assets/product-26.jpg', now(), now()
),

-- Product 27 - Velo Ice Cool Mint (Featured)
(
  gen_random_uuid(), 'velo-ice-cool-mint', 'Velo Ice Cool Mint', 'ველო აისი კულ მინტი',
  'Refreshing mint nicotine pouches with cooling sensation', 'გამაგრილებელი მინტის ნიკოტინის ჩანთები გაცივების სენსაციით',
  'Velo Ice Cool Mint delivers an intensely refreshing experience with its icy mint flavor and cooling sensation. These premium nicotine pouches provide long-lasting freshness and satisfaction without tobacco.', 
  'ველო აისი კულ მინტი იძლევა ინტენსიურად გამაგრილებელ გამოცდილებას თავისი ყინულოვანი მინტის გემოთ და გაცივების სენსაციით.',
  'Velo', 'Strong', 10.0, ARRAY['mint', 'cooling', 'fresh'], 5.49, 'GEL', 73, 'VLO-ICM-005', 'src/assets/product-27.jpg', true, 'Nicotine Pouches',
  'Velo Ice Cool Mint - Refreshing Nicotine Pouches | Cooling Effect', 'Experience Velo Ice Cool Mint nicotine pouches with intense cooling sensation. Premium quality and long-lasting freshness.', 'src/assets/product-27.jpg', now(), now()
),

-- Product 28 - ZYN Cool Mint
(
  gen_random_uuid(), 'zyn-cool-mint', 'ZYN Cool Mint', 'ზინ კულ მინტი',
  'Premium nicotine pouches with smooth mint flavor', 'პრემიუმ ნიკოტინის ჩანთები რბილი მინტის გემოთ',
  'ZYN Cool Mint offers a smooth and refreshing mint experience in a premium nicotine pouch format. Made with high-quality ingredients, these pouches provide consistent flavor and satisfaction.', 
  'ზინ კულ მინტი გთავაზობთ რბილ და გამაგრილებელ მინტის გამოცდილებას პრემიუმ ნიკოტინის ჩანთის ფორმატში.',
  'ZYN', 'Regular', 6.0, ARRAY['mint', 'smooth', 'premium'], 4.99, 'GEL', 89, 'ZYN-CM-006', 'src/assets/product-28.jpg', false, 'Nicotine Pouches',
  'ZYN Cool Mint - Premium Nicotine Pouches | Smooth Mint', 'Discover ZYN Cool Mint nicotine pouches with smooth mint flavor. Premium quality and consistent satisfaction.', 'src/assets/product-28.jpg', now(), now()
),

-- Product 29 - Lundgrens Skåne White (Featured)
(
  gen_random_uuid(), 'lundgrens-skane-white', 'Lundgrens Skåne White', 'ლუნდგრენს სკონე ვაიტ',
  'Classic Swedish white portion with traditional tobacco character', 'კლასიკური შვედური ვაიტ პორშენ ტრადიციული თუთუნის ხასიათით',
  'Lundgrens Skåne White represents the classic Swedish snus tradition with its authentic tobacco flavor and white portion format. This time-tested recipe delivers the genuine Swedish snus experience.', 
  'ლუნდგრენს სკონე ვაიტი წარმოადგენს კლასიკურ შვედურ სნუს ტრადიციას თავისი ავთენტური თუთუნის გემოთ და ვაიტ პორშენ ფორმატით.',
  'Lundgrens', 'Regular', 8.0, ARRAY['tobacco', 'classic', 'traditional'], 4.79, 'GEL', 61, 'LDG-SW-007', 'src/assets/product-29.jpg', true, 'Portion Snus',
  'Lundgrens Skåne White - Classic Swedish Snus | Traditional Flavor', 'Experience Lundgrens Skåne White with authentic Swedish tobacco flavor. Classic tradition in white portion format.', 'src/assets/product-29.jpg', now(), now()
),

-- Product 30 - Catch Eucalyptus White Mini
(
  gen_random_uuid(), 'catch-eucalyptus-white-mini', 'Catch Eucalyptus White Mini', 'კეჩ ევკალიპტი ვაიტ მინი',
  'Fresh eucalyptus snus in convenient mini format', 'ახალი ევკალიპტის სნუსი კომფორტულ მინი ფორმატში',
  'Catch Eucalyptus White Mini combines the refreshing taste of eucalyptus with the convenience of mini portions. This white snus delivers a clean, fresh experience that awakens the senses.', 
  'კეჩ ევკალიპტი ვაიტ მინი აერთებს ევკალიპტის გამაგრილებელ გემოს მინი პორციების კომფორტთან.',
  'Catch', 'Regular', 8.0, ARRAY['eucalyptus', 'fresh', 'mini'], 4.39, 'GEL', 44, 'CTC-EWM-008', 'src/assets/product-30.jpg', false, 'Portion Snus',
  'Catch Eucalyptus White Mini - Fresh Snus | Mini Format', 'Enjoy Catch Eucalyptus White Mini with refreshing eucalyptus flavor in convenient mini portions.', 'src/assets/product-30.jpg', now(), now()
),

-- Product 31 - Odens Creamy Wintergreen (using existing image)
(
  gen_random_uuid(), 'odens-creamy-wintergreen', 'Odens Creamy Wintergreen', 'ოდენს კრიმი ვინტერგრინ',
  'Smooth wintergreen snus with creamy undertones', 'რბილი ვინტერგრინის სნუსი კრემისფერი ქვეტონებით',
  'Odens Creamy Wintergreen offers a unique take on the classic wintergreen flavor with added creamy smoothness. This snus provides a comfortable and satisfying experience with its distinctive taste profile.', 
  'ოდენს კრიმი ვინტერგრინი გთავაზობთ უნიკალურ მიდგომას კლასიკურ ვინტერგრინის გემოზე დამატებული კრემისფერი სიმშვიდით.',
  'Odens', 'Regular', 8.0, ARRAY['wintergreen', 'creamy', 'smooth'], 4.59, 'GEL', 57, 'ODN-CW-009', 'src/assets/product-31.jpg', false, 'Portion Snus',
  'Odens Creamy Wintergreen - Smooth Snus | Unique Flavor', 'Discover Odens Creamy Wintergreen with unique wintergreen and creamy flavor combination.', 'src/assets/product-31.jpg', now(), now()
),

-- Product 32 - Loop Jalapeño Lime Strong
(
  gen_random_uuid(), 'loop-jalapeno-lime-strong', 'Loop Jalapeño Lime Strong', 'ლუპ ჟალაპენო ლაიმ სტრონგ',
  'Spicy jalapeño and zesty lime nicotine pouches', 'ცხარე ჟალაპენოსა და ცისფერი ლაიმის ნიკოტინის ჩანთები',
  'Loop Jalapeño Lime Strong delivers an exciting flavor adventure with the perfect balance of spicy jalapeño heat and zesty lime freshness. These strong nicotine pouches offer a unique taste experience for adventurous users.', 
  'ლუპ ჟალაპენო ლაიმ სტრონგი იძლევა ამაღელვებელ გემოვნურ თავგადასავალს ცხარე ჟალაპენოსა და ცისფერი ლაიმის სისუფთავის სრულყოფილი ბალანსით.',
  'Loop', 'Strong', 12.0, ARRAY['jalapeño', 'lime', 'spicy'], 5.89, 'GEL', 36, 'LOP-JLS-010', 'src/assets/product-32.jpg', false, 'Nicotine Pouches',
  'Loop Jalapeño Lime Strong - Spicy Nicotine Pouches | Bold Flavor', 'Experience Loop Jalapeño Lime Strong with exciting spicy jalapeño and lime flavor combination.', 'src/assets/product-32.jpg', now(), now()
),

-- Product 33 - Kapten White Original
(
  gen_random_uuid(), 'kapten-white-original', 'Kapten White Original', 'კაპტენ ვაიტ ორიჯინალ',
  'Traditional Swedish snus with authentic tobacco taste', 'ტრადიციული შვედური სნუსი ავთენტური თუთუნის გემოთ',
  'Kapten White Original honors the Swedish snus tradition with its authentic tobacco character and white portion format. This classic snus delivers the genuine taste that snus enthusiasts have appreciated for generations.', 
  'კაპტენ ვაიტ ორიჯინალი პატივს სცემს შვედურ სნუს ტრადიციას თავისი ავთენტური თუთუნის ხასიათით და ვაიტ პორშენ ფორმატით.',
  'Kapten', 'Regular', 8.0, ARRAY['tobacco', 'traditional', 'authentic'], 4.69, 'GEL', 48, 'KPT-WO-011', 'src/assets/product-33.jpg', false, 'Portion Snus',
  'Kapten White Original - Traditional Swedish Snus | Authentic Taste', 'Discover Kapten White Original with traditional Swedish tobacco flavor and authentic snus experience.', 'src/assets/product-33.jpg', now(), now()
),

-- Product 34 - Pablo Ice Cold Extra Strong (Featured)
(
  gen_random_uuid(), 'pablo-ice-cold-extra-strong', 'Pablo Ice Cold Extra Strong', 'პაბლო აისი კოლდ ექსტრა სტრონგ',
  'Extreme strength nicotine pouches with icy cooling effect', 'უკიდურესად ძლიერი ნიკოტინის ჩანთები ყინულოვანი გაცივების ეფექტით',
  'Pablo Ice Cold Extra Strong is designed for users seeking maximum strength and intense cooling sensation. These extreme nicotine pouches deliver powerful satisfaction with an icy blast that awakens all senses.', 
  'პაბლო აისი კოლდ ექსტრა სტრონგი შექმნილია მაქსიმალური სიძლიერისა და ინტენსიური გაცივების სენსაციის მაძიებელი მომხმარებლებისთვის.',
  'Pablo', 'Extra Strong', 30.0, ARRAY['ice', 'extreme', 'cooling'], 7.99, 'GEL', 29, 'PBL-ICES-012', 'src/assets/product-34.jpg', true, 'Nicotine Pouches',
  'Pablo Ice Cold Extra Strong - Extreme Nicotine Pouches | Maximum Strength', 'Experience Pablo Ice Cold Extra Strong with extreme strength and intense cooling sensation. For experienced users only.', 'src/assets/product-34.jpg', now(), now()
),

-- Product 35 - Lyft Berry Frost
(
  gen_random_uuid(), 'lyft-berry-frost', 'Lyft Berry Frost', 'ლიფტ ბერი ფროსტ',
  'Mixed berry nicotine pouches with cooling sensation', 'შერეული კენკროვნების ნიკოტინის ჩანთები გაცივების სენსაციით',
  'Lyft Berry Frost combines the sweetness of mixed berries with a refreshing cooling sensation. These nicotine pouches deliver a fruity and invigorating experience that s perfect for any time of day.', 
  'ლიფტ ბერი ფროსტი აერთებს შერეული კენკროვნების სიტკბოს გამაგრილებელ გაცივების სენსაციასთან.',
  'Lyft', 'Regular', 8.0, ARRAY['berry', 'frost', 'fruity'], 4.79, 'GEL', 65, 'LFT-BF-013', 'src/assets/product-35.jpg', false, 'Nicotine Pouches',
  'Lyft Berry Frost - Fruity Nicotine Pouches | Berry Cooling', 'Enjoy Lyft Berry Frost with mixed berry flavor and refreshing cooling sensation.', 'src/assets/product-35.jpg', now(), now()
),

-- Product 36 - ON! Citrus 8mg
(
  gen_random_uuid(), 'on-citrus-8mg', 'ON! Citrus 8mg', 'ონ! ციტრუსი 8მგ',
  'Zesty citrus nicotine pouches with moderate strength', 'ცისფერი ციტრუსის ნიკოტინის ჩანთები ზომიერი სიძლიერით',
  'ON! Citrus 8mg offers a bright and zesty citrus flavor in a moderate strength nicotine pouch. Perfect for users who enjoy fruity flavors with a balanced nicotine delivery.', 
  'ონ! ციტრუსი 8მგ გთავაზობთ ნათელ და ცისფერ ციტრუსის გემოს ზომიერი სიძლიერის ნიკოტინის ჩანთში.',
  'ON!', 'Regular', 8.0, ARRAY['citrus', 'zesty', 'fruity'], 4.19, 'GEL', 71, 'ON-CIT-014', 'src/assets/product-36.jpg', false, 'Nicotine Pouches',
  'ON! Citrus 8mg - Zesty Nicotine Pouches | Citrus Flavor', 'Discover ON! Citrus 8mg with bright citrus flavor and moderate strength nicotine delivery.', 'src/assets/product-36.jpg', now(), now()
),

-- Product 37 - G.4 Blue Mint Slim White
(
  gen_random_uuid(), 'g4-blue-mint-slim-white', 'G.4 Blue Mint Slim White', 'ჯი.4 ბლუ მინტ სლიმ ვაიტ',
  'Premium slim white snus with refreshing mint flavor', 'პრემიუმ სლიმ ვაიტ სნუსი გამაგრილებელი მინტის გემოთ',
  'G.4 Blue Mint Slim White represents premium Swedish snus craftsmanship with its refreshing mint flavor and comfortable slim format. This white portion delivers consistent satisfaction with elegant design.', 
  'ჯი.4 ბლუ მინტ სლიმ ვაიტი წარმოადგენს პრემიუმ შვედურ სნუს ხელოსნობას თავისი გამაგრილებელი მინტის გემოთ და კომფორტული სლიმ ფორმატით.',
  'G.4', 'Regular', 8.0, ARRAY['mint', 'premium', 'slim'], 5.29, 'GEL', 42, 'G4-BMS-015', 'src/assets/product-37.jpg', false, 'Portion Snus',
  'G.4 Blue Mint Slim White - Premium Mint Snus | Slim Format', 'Experience G.4 Blue Mint Slim White with refreshing mint flavor and premium Swedish quality.', 'src/assets/product-37.jpg', now(), now()
),

-- Product 38 - Ace Eucalyptus Extra Strong
(
  gen_random_uuid(), 'ace-eucalyptus-extra-strong', 'Ace Eucalyptus Extra Strong', 'ეისი ევკალიპტი ექსტრა სტრონგ',
  'Strong eucalyptus nicotine pouches with intense freshness', 'ძლიერი ევკალიპტის ნიკოტინის ჩანთები ინტენსიური სისუფთავით',
  'Ace Eucalyptus Extra Strong delivers powerful eucalyptus flavor with extra strength nicotine content. These pouches provide an intensely fresh and invigorating experience for users seeking strong satisfaction.', 
  'ეისი ევკალიპტი ექსტრა სტრონგი იძლევა ძლიერ ევკალიპტის გემოს ექსტრა სიძლიერის ნიკოტინის შემცველობით.',
  'Ace', 'Extra Strong', 16.0, ARRAY['eucalyptus', 'strong', 'fresh'], 6.19, 'GEL', 33, 'ACE-EES-016', 'src/assets/product-38.jpg', false, 'Nicotine Pouches',
  'Ace Eucalyptus Extra Strong - Powerful Nicotine Pouches | Intense Freshness', 'Experience Ace Eucalyptus Extra Strong with powerful eucalyptus flavor and extra strength nicotine.', 'src/assets/product-38.jpg', now(), now()
),

-- Product 39 - General Mint (using existing image)
(
  gen_random_uuid(), 'general-mint', 'General Mint', 'ჯენერალ მინტი',
  'Classic General snus with refreshing mint flavor', 'კლასიკური ჯენერალ სნუსი გამაგრილებელი მინტის გემოთ',
  'General Mint combines the legendary General tobacco character with refreshing mint flavor. This classic Swedish snus offers the perfect balance of traditional taste and cool freshness.', 
  'ჯენერალ მინტი აერთებს ლეგენდარულ ჯენერალ თუთუნის ხასიათს გამაგრილებელ მინტის გემოსთან.',
  'General', 'Regular', 8.0, ARRAY['mint', 'classic', 'refreshing'], 4.99, 'GEL', 76, 'GEN-MNT-017', 'src/assets/product-39.jpg', false, 'Portion Snus',
  'General Mint - Classic Swedish Snus | Mint Freshness', 'Discover General Mint with classic Swedish tobacco and refreshing mint flavor combination.', 'src/assets/product-39.jpg', now(), now()
),

-- Product 40 - Killa Cold Mint Extra Strong (Featured)
(
  gen_random_uuid(), 'killa-cold-mint-extra-strong', 'Killa Cold Mint Extra Strong', 'კილა კოლდ მინტ ექსტრა სტრონგ',
  'Extreme strength nicotine pouches with intense mint cooling', 'უკიდურესად ძლიერი ნიკოტინის ჩანთები ინტენსიური მინტის გაცივებით',
  'Killa Cold Mint Extra Strong is designed for experienced users seeking maximum strength and intense mint cooling. These extreme nicotine pouches deliver powerful satisfaction with an icy mint blast.', 
  'კილა კოლდ მინტ ექსტრა სტრონგი შექმნილია გამოცდილი მომხმარებლებისთვის, რომლებიც ეძებენ მაქსიმალურ სიძლიერეს და ინტენსიურ მინტის გაცივებას.',
  'Killa', 'Extra Strong', 25.0, ARRAY['mint', 'extreme', 'cooling'], 7.49, 'GEL', 27, 'KLA-CMES-018', 'src/assets/product-40.jpg', true, 'Nicotine Pouches',
  'Killa Cold Mint Extra Strong - Extreme Nicotine Pouches | Intense Mint', 'Experience Killa Cold Mint Extra Strong with extreme strength and intense mint cooling sensation.', 'src/assets/product-40.jpg', now(), now()
),

-- Product 41 - White Fox Full Charge
(
  gen_random_uuid(), 'white-fox-full-charge', 'White Fox Full Charge', 'ვაიტ ფოქს ფულ ჩარჯ',
  'Maximum strength nicotine pouches with mint flavor', 'მაქსიმალური სიძლიერის ნიკოტინის ჩანთები მინტის გემოთ',
  'White Fox Full Charge delivers maximum strength nicotine with refreshing mint flavor. These premium pouches are designed for experienced users who demand the highest nicotine content and superior quality.', 
  'ვაიტ ფოქს ფულ ჩარჯი იძლევა მაქსიმალური სიძლიერის ნიკოტინს გამაგრილებელი მინტის გემოთ.',
  'White Fox', 'Extra Strong', 28.0, ARRAY['mint', 'maximum', 'premium'], 8.49, 'GEL', 24, 'WFX-FC-019', 'src/assets/product-41.jpg', false, 'Nicotine Pouches',
  'White Fox Full Charge - Maximum Strength Nicotine Pouches | Premium Quality', 'Experience White Fox Full Charge with maximum strength nicotine and refreshing mint flavor.', 'src/assets/product-41.jpg', now(), now()
),

-- Product 42 - Iceberg Watermelon Medium
(
  gen_random_uuid(), 'iceberg-watermelon-medium', 'Iceberg Watermelon Medium', 'აისბერგ საზღვრისპირა ზომიერი',
  'Sweet watermelon nicotine pouches with moderate strength', 'ტკბილი საზღვრისპირა ნიკოტინის ჩანთები ზომიერი სიძლიერით',
  'Iceberg Watermelon Medium offers a sweet and refreshing watermelon flavor in a perfectly balanced nicotine pouch. Ideal for users who enjoy fruity flavors with moderate strength delivery.', 
  'აისბერგ საზღვრისპირა ზომიერი გთავაზობთ ტკბილ და გამაგრილებელ საზღვრისპირა გემოს იდეალურად დაბალანსებულ ნიკოტინის ჩანთში.',
  'Iceberg', 'Regular', 6.0, ARRAY['watermelon', 'sweet', 'fruity'], 4.59, 'GEL', 54, 'ICB-WM-020', 'src/assets/product-42.jpg', false, 'Nicotine Pouches',
  'Iceberg Watermelon Medium - Sweet Nicotine Pouches | Watermelon Flavor', 'Enjoy Iceberg Watermelon Medium with sweet watermelon flavor and moderate strength nicotine.', 'src/assets/product-42.jpg', now(), now()
),

-- Product 43 - Volt Frosted Apple Strong
(
  gen_random_uuid(), 'volt-frosted-apple-strong', 'Volt Frosted Apple Strong', 'ვოლტ ყინულოვანი ვაშლი სტრონგ',
  'Crisp apple nicotine pouches with cooling effect', 'კრისპი ვაშლის ნიკოტინის ჩანთები გაცივების ეფექტით',
  'Volt Frosted Apple Strong combines the crisp taste of fresh apples with a cooling frost effect. These strong nicotine pouches deliver a refreshing and invigorating experience with fruity satisfaction.', 
  'ვოლტ ყინულოვანი ვაშლი სტრონგი აერთებს ახალი ვაშლის კრისპ გემოს გაცივების ყინულოვან ეფექტთან.',
  'Volt', 'Strong', 11.0, ARRAY['apple', 'frost', 'crisp'], 5.79, 'GEL', 39, 'VLT-FAS-021', 'src/assets/product-43.jpg', false, 'Nicotine Pouches',
  'Volt Frosted Apple Strong - Apple Nicotine Pouches | Cooling Effect', 'Experience Volt Frosted Apple Strong with crisp apple flavor and refreshing cooling sensation.', 'src/assets/product-43.jpg', now(), now()
),

-- Product 44 - Corvus Blackcurrant Strong
(
  gen_random_uuid(), 'corvus-blackcurrant-strong', 'Corvus Blackcurrant Strong', 'კორვუს შავი მოცხარი სტრონგ',
  'Rich blackcurrant snus with strong tobacco base', 'მდიდარი შავი მოცხარის სნუსი ძლიერი თუთუნის ბაზით',
  'Corvus Blackcurrant Strong offers a unique combination of rich blackcurrant flavor with strong Swedish tobacco. This premium snus delivers an intense and satisfying experience with its distinctive taste profile.', 
  'კორვუს შავი მოცხარი სტრონგი გთავაზობთ მდიდარი შავი მოცხარის გემოს უნიკალურ კომბინაციას ძლიერ შვედურ თუთუნთან.',
  'Corvus', 'Strong', 12.0, ARRAY['blackcurrant', 'rich', 'tobacco'], 5.99, 'GEL', 31, 'CRV-BCS-022', 'src/assets/product-44.jpg', false, 'Portion Snus',
  'Corvus Blackcurrant Strong - Rich Blackcurrant Snus | Premium Quality', 'Discover Corvus Blackcurrant Strong with rich blackcurrant flavor and strong Swedish tobacco.', 'src/assets/product-44.jpg', now(), now()
),

-- Product 45 - General G.3 Extra Strong (using existing image)
(
  gen_random_uuid(), 'general-g3-extra-strong', 'General G.3 Extra Strong', 'ჯენერალ ჯი.3 ექსტრა სტრონგ',
  'Extra strong version of classic General snus', 'კლასიკური ჯენერალ სნუსის ექსტრა ძლიერი ვერსია',
  'General G.3 Extra Strong delivers the classic General tobacco character with enhanced strength. This premium snus maintains the legendary General flavor profile while providing extra satisfaction for experienced users.', 
  'ჯენერალ ჯი.3 ექსტრა სტრონგი იძლევა კლასიკურ ჯენერალ თუთუნის ხასიათს გაძლიერებული სიძლიერით.',
  'General', 'Extra Strong', 14.0, ARRAY['tobacco', 'classic', 'strong'], 6.29, 'GEL', 41, 'GEN-G3ES-023', 'src/assets/product-45.jpg', false, 'Portion Snus',
  'General G.3 Extra Strong - Classic Swedish Snus | Enhanced Strength', 'Experience General G.3 Extra Strong with classic General flavor and enhanced strength for experienced users.', 'src/assets/product-45.jpg', now(), now()
),

-- Product 46 - Skruf Polar Slim Fresh White (using existing image)
(
  gen_random_uuid(), 'skruf-polar-slim-fresh-white', 'Skruf Polar Slim Fresh White', 'სკრუფ პოლარ სლიმ ფრეშ ვაიტ',
  'Fresh polar flavor in comfortable slim white format', 'ახალი პოლარული გემო კომფორტულ სლიმ ვაიტ ფორმატში',
  'Skruf Polar Slim Fresh White delivers an arctic-fresh experience with its unique polar flavor profile. The slim white format provides comfort and discretion while delivering refreshing satisfaction.', 
  'სკრუფ პოლარ სლიმ ფრეშ ვაიტი იძლევა არქტიკულად ახალ გამოცდილებას თავისი უნიკალური პოლარული გემოს პროფილით.',
  'Skruf', 'Regular', 8.0, ARRAY['polar', 'fresh', 'arctic'], 5.49, 'GEL', 58, 'SKF-PSFW-024', 'src/assets/product-46.jpg', false, 'Portion Snus',
  'Skruf Polar Slim Fresh White - Arctic Fresh Snus | Slim Format', 'Discover Skruf Polar Slim Fresh White with unique polar flavor and comfortable slim format.', 'src/assets/product-46.jpg', now(), now()
),

-- Product 47 - Klint Honeymelon Slim White (Featured)
(
  gen_random_uuid(), 'klint-honeymelon-slim-white', 'Klint Honeymelon Slim White', 'კლინტ თოვლისფერი ნიახური სლიმ ვაიტ',
  'Sweet honeydew melon nicotine pouches in slim format', 'ტკბილი თოვლისფერი ნიახურის ნიკოტინის ჩანთები სლიმ ფორმატში',
  'Klint Honeymelon Slim White offers a delightfully sweet honeydew melon flavor in a comfortable slim white format. These premium nicotine pouches provide a refreshing and fruity experience with exceptional quality.', 
  'კლინტ თოვლისფერი ნიახური სლიმ ვაიტი გთავაზობთ საოცრად ტკბილ თოვლისფერი ნიახურის გემოს კომფორტულ სლიმ ვაიტ ფორმატში.',
  'Klint', 'Regular', 8.0, ARRAY['melon', 'sweet', 'fruity'], 4.89, 'GEL', 46, 'KLN-HMS-025', 'src/assets/product-47.jpg', true, 'Nicotine Pouches',
  'Klint Honeymelon Slim White - Sweet Melon Nicotine Pouches | Premium Quality', 'Enjoy Klint Honeymelon Slim White with delightful honeydew melon flavor and premium quality.', 'src/assets/product-47.jpg', now(), now()
),

-- Product 48 - RITE Cola Strong
(
  gen_random_uuid(), 'rite-cola-strong', 'RITE Cola Strong', 'რაიტ კოლა სტრონგ',
  'Classic cola flavored nicotine pouches with strong delivery', 'კლასიკური კოლას გემოვნების ნიკოტინის ჩანთები ძლიერი მიწოდებით',
  'RITE Cola Strong brings the nostalgic taste of classic cola to nicotine pouches with strong delivery. These unique pouches offer a refreshing alternative to traditional flavors with authentic cola taste.', 
  'რაიტ კოლა სტრონგი მოაქვს კლასიკური კოლას ნოსტალგიური გემო ნიკოტინის ჩანთებში ძლიერი მიწოდებით.',
  'RITE', 'Strong', 10.0, ARRAY['cola', 'classic', 'nostalgic'], 5.39, 'GEL', 37, 'RTE-CS-026', 'src/assets/product-48.jpg', false, 'Nicotine Pouches',
  'RITE Cola Strong - Classic Cola Nicotine Pouches | Nostalgic Flavor', 'Experience RITE Cola Strong with authentic cola flavor and strong nicotine delivery.', 'src/assets/product-48.jpg', now(), now()
),

-- Product 49 - Zone X Cold Blast Extra Strong (Featured)
(
  gen_random_uuid(), 'zone-x-cold-blast-extra-strong', 'Zone X Cold Blast Extra Strong', 'ზონ ხ კოლდ ბლასტ ექსტრა სტრონგ',
  'Extreme cooling nicotine pouches with maximum strength', 'უკიდურესი გაცივების ნიკოტინის ჩანთები მაქსიმალური სიძლიერით',
  'Zone X Cold Blast Extra Strong delivers the ultimate cooling experience with maximum strength nicotine content. These extreme pouches provide an intense blast of cold sensation combined with powerful satisfaction.', 
  'ზონ ხ კოლდ ბლასტ ექსტრა სტრონგი იძლევა უაღრესად გაცივების გამოცდილებას მაქსიმალური სიძლიერის ნიკოტინის შემცველობით.',
  'Zone X', 'Extra Strong', 20.0, ARRAY['cooling', 'extreme', 'blast'], 7.19, 'GEL', 22, 'ZNX-CBES-027', 'src/assets/product-49.jpg', true, 'Nicotine Pouches',
  'Zone X Cold Blast Extra Strong - Extreme Cooling Pouches | Maximum Strength', 'Experience Zone X Cold Blast Extra Strong with ultimate cooling sensation and maximum strength nicotine.', 'src/assets/product-49.jpg', now(), now()
),

-- Product 50 - Nordic Spirit Elderflower Slim White
(
  gen_random_uuid(), 'nordic-spirit-elderflower-slim-white', 'Nordic Spirit Elderflower Slim White', 'ნორდიკ სპირიტ ელდერფლაუერ სლიმ ვაიტ',
  'Elegant elderflower nicotine pouches in premium slim format', 'ელეგანტური ელდერფლაუერის ნიკოტინის ჩანთები პრემიუმ სლიმ ფორმატში',
  'Nordic Spirit Elderflower Slim White offers an elegant and sophisticated elderflower flavor in a premium slim white format. These high-quality nicotine pouches provide a refined taste experience with Scandinavian excellence.', 
  'ნორდიკ სპირიტ ელდერფლაუერ სლიმ ვაიტი გთავაზობთ ელეგანტურ და დახვეწილ ელდერფლაუერის გემოს პრემიუმ სლიმ ვაიტ ფორმატში.',
  'Nordic Spirit', 'Regular', 9.0, ARRAY['elderflower', 'elegant', 'premium'], 5.69, 'GEL', 63, 'NSP-ESW-028', 'src/assets/product-50.jpg', false, 'Nicotine Pouches',
  'Nordic Spirit Elderflower Slim White - Elegant Nicotine Pouches | Premium Quality', 'Discover Nordic Spirit Elderflower Slim White with sophisticated elderflower flavor and premium Scandinavian quality.', 'src/assets/product-50.jpg', now(), now()
);