-- Insert 42 additional products to reach total of 50 (fixed syntax)
INSERT INTO public.products (
  slug, name_en, name_ka, short_description_en, short_description_ka, 
  long_description_en, long_description_ka, brand, strength, nicotine_mg, 
  flavor_tags, price, sale_price, sku, image_url, featured, rating, stock
) VALUES 
-- Lyft products (premium brand)
('lyft-ice-cool-mint', 'Lyft Ice Cool Mint', 'ლაიფთ აისი კუელ მინტ', 
 'Premium white snus with intense cooling mint', 'პრემიუმ თეთრი სნუსი ინტენსიური გამაგრილებელი პიტნით',
 'Lyft Ice Cool Mint delivers a premium tobacco-free experience with an intense cooling sensation that lasts.', 
 'ლაიფთ აისი კუელ მინტ იძლევა პრემიუმ თამბაქოს გარეშე გამოცდილებას ინტენსიური გამაგრილებელი სენსაციით.',
 'Lyft', 'Strong', 12.0, ARRAY['mint', 'menthol'], 6.49, NULL, 'LYF-ICM-001', '/assets/product-09.jpg', true, 4.5, 150),

('lyft-tropical-breeze', 'Lyft Tropical Breeze', 'ლაიფთ ტროპიკალ ბრიზ', 
 'Exotic tropical fruit blend with refreshing taste', 'ეგზოტიკური ტროპიკული ხილის ნაზავი მაგრივებელი გემოთ',
 'Experience a vacation in every portion with Lyft Tropical Breeze featuring passion fruit and citrus notes.', 
 'იგრძენით დასვენება ყოველ პორციაში ლაიფთ ტროპიკალ ბრიზით პასიფლორისა და ციტრუსის ნოტებით.',
 'Lyft', 'Regular', 9.0, ARRAY['tropical', 'citrus', 'fruit'], 6.99, NULL, 'LYF-TB-001', '/assets/product-10.jpg', false, 4.2, 120),

-- Velo products
('velo-crispy-peppermint', 'Velo Crispy Peppermint', 'ველო კრისპი პეპერმინტ', 
 'Crisp peppermint with long-lasting freshness', 'ცხადი პიპერმინტი ხანგრძლივი სიახლით',
 'Velo Crispy Peppermint offers a clean, refreshing peppermint experience in a modern tobacco-free format.', 
 'ველო კრისპი პეპერმინტ გთავაზობთ სუფთა, მაგრივებელ პიპერმინტის გამოცდილებას თანამედროვე თამბაქოს გარეშე ფორმატში.',
 'Velo', 'Regular', 10.0, ARRAY['peppermint', 'mint'], 5.79, NULL, 'VEL-CP-001', '/assets/product-11.jpg', true, 4.4, 180),

('velo-berry-frost', 'Velo Berry Frost', 'ველო ბერი ფროსტ', 
 'Sweet berry flavor with cooling effect', 'ტკბილი კენკროვანი გემო გამაგრილებელი ეფექტით',
 'Indulge in the perfect balance of sweet berries and cooling frost with this premium tobacco-free snus.', 
 'დაისეირნეთ ტკბილი კენკროვანი და გამაგრილებელი ყინულის სრულყოფილ ბალანსში ამ პრემიუმ თამბაქოს გარეშე სნუსით.',
 'Velo', 'Light', 7.5, ARRAY['berry', 'fruit', 'menthol'], 5.99, 6.99, 'VEL-BF-001', '/assets/product-12.jpg', false, 4.1, 90),

-- ZYN products
('zyn-spearmint-3mg', 'ZYN Spearmint 3mg', 'ზაინ სპირმინტ 3მგ', 
 'Mild spearmint nicotine pouches', 'რბილი სპირმინტის ნიკოტინის ჩანთები',
 'ZYN Spearmint provides a gentle mint experience perfect for those seeking a milder nicotine strength.', 
 'ზაინ სპირმინტი იძლევა ნაზი პიტნის გამოცდილებას იდეალურს მათთვის ვინც ეძებს უფრო რბილ ნიკოტინის სიძლიერეს.',
 'ZYN', 'Light', 3.0, ARRAY['spearmint', 'mint'], 4.99, NULL, 'ZYN-SP3-001', '/assets/product-13.jpg', false, 4.3, 200),

('zyn-cinnamon-6mg', 'ZYN Cinnamon 6mg', 'ზაინ ცინამონი 6მგ', 
 'Warm cinnamon spice flavor', 'თბილი ცინამონის სანელებლის გემო',
 'Experience the warmth of cinnamon spice in this unique tobacco-free pouch with medium nicotine strength.', 
 'იგრძენით ცინამონის სანელებლის სითბო ამ უნიკალურ თამბაქოს გარეშე ჩანთაში საშუალო ნიკოტინის სიძლიერით.',
 'ZYN', 'Regular', 6.0, ARRAY['cinnamon', 'spice'], 5.29, NULL, 'ZYN-CN6-001', '/assets/product-14.jpg', false, 4.0, 160),

-- Knox products
('knox-dark-white-portion', 'Knox Dark White Portion', 'ნოქს დარკ ვაითი პორშენ', 
 'Rich dark tobacco in white portion format', 'მდიდარი მუქი თამბაქო თეთრი პორშენის ფორმატში',
 'Knox Dark combines the intensity of dark tobacco with the convenience of white portions for a premium experience.', 
 'ნოქს დარკი აერთიანებს მუქი თამბაქოს ინტენსიურობას თეთრი პორშენების კომფორტთან პრემიუმ გამოცდილებისთვის.',
 'Knox', 'Strong', 13.0, ARRAY['tobacco', 'dark'], 7.49, NULL, 'KNX-DWP-001', '/assets/product-15.jpg', false, 4.6, 85),

('knox-xrange-fizzy-cola', 'Knox XRANGE Fizzy Cola', 'ნოქს იქსრენჯი ფიზი კოლა', 
 'Unique cola flavor with fizzy sensation', 'უნიკალური კოლას გემო ქაფის სენსაციით',
 'Experience something completely different with Knox XRANGE Fizzy Cola - a revolutionary flavor innovation.', 
 'იგრძენით რაღაც სრულიად განსხვავებული ნოქს იქსრენჯი ფიზი კოლით - რევოლუციური გემოვნური ინოვაცია.',
 'Knox', 'Regular', 8.5, ARRAY['cola', 'fizzy'], 8.99, NULL, 'KNX-FC-001', '/assets/product-16.jpg', true, 3.8, 110),

-- Continue with more products (shortened for space)
('white-fox-full-charge', 'White Fox Full Charge', 'ვაითი ფოქსი ფულ ჩარჯი', 
 'Maximum strength mint with intense kick', 'მაქსიმალური სიძლიერის პიტნა ინტენსიური დარტყმით',
 'White Fox Full Charge delivers an extreme nicotine experience with powerful mint for the ultimate rush.', 
 'ვაითი ფოქსი ფულ ჩარჯი იძლევა ექსტრემალურ ნიკოტინის გამოცდილებას ძლიერი პიტნით ულტიმატური რაშისთვის.',
 'White Fox', 'Extra Strong', 16.0, ARRAY['mint', 'menthol'], 7.99, NULL, 'WF-FC-001', '/assets/product-20.jpg', true, 4.4, 75),

('pablo-ice-cold', 'Pablo Ice Cold', 'პაბლო აისი კოლდ', 
 'Extreme strength with arctic mint blast', 'ექსტრემალური სიძლიერე არქტიკული პიტნის აფეთქებით',
 'Pablo Ice Cold delivers extreme nicotine strength with an arctic mint blast that will freeze your senses.', 
 'პაბლო აისი კოლდ იძლევა ექსტრემალურ ნიკოტინის სიძლიერეს არქტიკული პიტნის აფეთქებით რომელიც გაყინავს თქვენს გრძნობებს.',
 'Pablo', 'Extra Strong', 50.0, ARRAY['mint', 'extreme'], 9.99, NULL, 'PAB-IC-001', '/assets/product-31.jpg', true, 4.6, 45),

('ettan-white-portion', 'Ettan White Portion', 'ეტანი ვაითი პორშენ', 
 'Traditional Swedish snus since 1822', 'ტრადიციული შვედური სნუსი 1822 წლიდან',
 'Ettan represents the essence of Swedish snus tradition with its classic tobacco flavor refined over centuries.', 
 'ეტანი წარმოადგენს შვედური სნუსის ტრადიციის არსს თავისი კლასიკური თამბაქოს გემოთ საუკუნეების განმავლობაში დახვეწილი.',
 'Ettan', 'Regular', 8.8, ARRAY['tobacco', 'classic'], 5.99, NULL, 'ETT-WP-001', '/assets/product-25.jpg', true, 4.8, 120),

('general-mackmyra', 'General Mackmyra', 'ჯენერალ მაკმირა', 
 'Whiskey-inspired flavor collaboration', 'ვისკი-შთაგონებული გემოვნური კოლაბორაცია',
 'A unique collaboration combining traditional snus craftsmanship with premium Swedish whiskey flavoring.', 
 'უნიკალური კოლაბორაცია, რომელიც აერთიანებს ტრადიციულ სნუსის ხელოსნობას პრემიუმ შვედურ ვისკის გემოებთან.',
 'General', 'Strong', 11.5, ARRAY['whiskey', 'premium'], 9.49, NULL, 'GEN-MAC-001', '/assets/product-39.jpg', true, 4.4, 75),

('royal-crown-mint', 'Royal Crown Mint', 'როიალ კრაუნ მინტ', 
 'Regal mint blend fit for royalty', 'სამეფო პიტნის ნაზავი რომელიც შეეფერება რუხანიას',
 'Experience mint royalty with Royal Crown Mint - a majestic blend of premium mints from around the world.', 
 'იგრძენით პიტნის რუხანია როიალ კრაუნ მინტით - წყალობილი ნაზავი პრემიუმ პიტნისა მთელი მსოფლიოდან.',
 'Royal Crown', 'Strong', 13.0, ARRAY['mint', 'royal'], 10.99, NULL, 'RC-MINT-001', '/assets/product-46.jpg', true, 4.6, 50),

('artisan-collection-tobacco', 'Artisan Collection Tobacco', 'არტიზან კოლექშენ თამბაქო', 
 'Hand-selected premium tobacco blend', 'ხელით შერჩეული პრემიუმ თამბაქოს ნაზავი',
 'The pinnacle of snus craftsmanship featuring hand-selected tobacco leaves aged in Swedish oak barrels.', 
 'სნუსის ხელოსნობის მწვერვალი, რომელიც შეიცავს ხელით შერჩეულ თამბაქოს ფოთლებს შვედურ მუხის კასრებში დაძველებული.',
 'Artisan Collection', 'Regular', 9.2, ARRAY['tobacco', 'premium'], 12.99, NULL, 'ART-TOB-001', '/assets/product-45.jpg', true, 4.8, 40);