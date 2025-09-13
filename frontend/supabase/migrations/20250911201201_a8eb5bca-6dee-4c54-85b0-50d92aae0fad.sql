-- Insert 42 additional products to reach total of 50
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

-- Velo products (modern brand)
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

-- Zyn products (popular US brand)
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

-- Knox products (premium Swedish)
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

-- Catch products (modern flavors)
('catch-eucalyptus-white', 'Catch Eucalyptus White', 'კეჩი ევკალიპტუსი ვაითი', 
 'Refreshing eucalyptus with herbal notes', 'მაგრივებელი ევკალიპტუსი ბალახოვანი ნოტებით',
 'Catch Eucalyptus White offers a unique herbal experience with the fresh, clean taste of eucalyptus leaves.', 
 'კეჩი ევკალიპტუსი ვაითი გთავაზობთ უნიკალურ ბალახოვან გამოცდილებას ევკალიპტუსის ფოთლების ახალი, სუფთა გემოთ.',
 'Catch', 'Regular', 9.5, ARRAY['eucalyptus', 'herbal'], 6.29, NULL, 'CAT-EW-001', '/assets/product-17.jpg', false, 4.2, 140),

('catch-licorice-white', 'Catch Licorice White', 'კეჩი ლიკორისი ვაითი', 
 'Sweet licorice with anise flavor', 'ტკბილი ლიკორისი ანისონის გემოთ',
 'For licorice lovers, Catch Licorice White delivers an authentic sweet anise experience in white portion format.', 
 'ლიკორისის მოყვარულებისთვის, კეჩი ლიკორისი ვაითი იძლევა ავთენტურ ტკბილ ანისონის გამოცდილებას თეთრი პორშენის ფორმატში.',
 'Catch', 'Light', 7.0, ARRAY['licorice', 'anise', 'sweet'], 5.89, 6.89, 'CAT-LW-001', '/assets/product-18.jpg', false, 3.9, 95),

-- Kaliber products (strong Swedish)
('kaliber-plus-white-portion', 'Kaliber+ White Portion', 'კალიბერ+ ვაითი პორშენ', 
 'Extra strong white portion for experienced users', 'ძალიან ძლიერი თეთრი პორშენი გამოცდილი მომხმარებლებისთვის',
 'Kaliber+ delivers maximum nicotine strength in a comfortable white portion format for the most experienced users.', 
 'კალიბერ+ იძლევა მაქსიმალურ ნიკოტინის სიძლიერეს კომფორტული თეთრი პორშენის ფორმატში ყველაზე გამოცდილი მომხმარებლებისთვის.',
 'Kaliber', 'Extra Strong', 45.0, ARRAY['tobacco'], 8.49, NULL, 'KAL-PWP-001', '/assets/product-19.jpg', false, 4.7, 60),

-- White Fox products (all-white nicotine pouches)
('white-fox-full-charge', 'White Fox Full Charge', 'ვაითი ფოქსი ფულ ჩარჯი', 
 'Maximum strength mint with intense kick', 'მაქსიმალური სიძლიერის პიტნა ინტენსიური დარტყმით',
 'White Fox Full Charge delivers an extreme nicotine experience with powerful mint for the ultimate rush.', 
 'ვაითი ფოქსი ფულ ჩარჯი იძლევა ექსტრემალურ ნიკოტინის გამოცდილებას ძლიერი პიტნით ულტიმატური რაშისთვის.',
 'White Fox', 'Extra Strong', 16.0, ARRAY['mint', 'menthol'], 7.99, NULL, 'WF-FC-001', '/assets/product-20.jpg', true, 4.4, 75),

-- Loop products (innovative flavors)
('loop-jalapeño-lime', 'LOOP Jalapeño Lime', 'ლუპი ჰალაპენიო ლაიმი', 
 'Spicy jalapeño with zesty lime twist', 'ცხარე ჰალაპენიო ღია ლაიმის მოხვევით',
 'Experience bold flavors with LOOP Jalapeño Lime - a daring combination of heat and citrus freshness.', 
 'იგრძენით მამაცი გემოები ლუპი ჰალაპენიო ლაიმით - თამამი კომბინაცია სიცხისა და ციტრუსის სიახლისა.',
 'LOOP', 'Regular', 9.4, ARRAY['jalapeño', 'lime', 'spicy'], 6.79, NULL, 'LOOP-JL-001', '/assets/product-21.jpg', false, 3.7, 100),

('loop-red-chili-melon', 'LOOP Red Chili Melon', 'ლუპი რედ ჩილი მელონი', 
 'Sweet melon with red chili heat', 'ტკბილი ნესვი წითელი ჩილის სიცხით',
 'LOOP Red Chili Melon combines the sweetness of ripe melon with a surprising kick of red chili spice.', 
 'ლუპი რედ ჩილი მელონი აერთიანებს მწიფე ნესვის სიტკბოს წითელი ჩილის სანელებლის გასაოცარ დარტყმასთან.',
 'LOOP', 'Light', 6.8, ARRAY['melon', 'chili', 'sweet'], 6.99, NULL, 'LOOP-RCM-001', '/assets/product-22.jpg', false, 3.6, 85),

-- More premium brands
('ace-eucalyptus-white', 'ACE Eucalyptus White', 'ეისი ევკალიპტუსი ვაითი', 
 'Pure eucalyptus with medicinal freshness', 'სუფთა ევკალიპტუსი სამკურნალო სიახლით',
 'ACE Eucalyptus White provides a clean, medicinal freshness with the natural healing properties of eucalyptus.', 
 'ეისი ევკალიპტუსი ვაითი იძლევა სუფთა, სამკურნალო სიახლეს ევკალიპტუსის ბუნებრივი განმკურნებელი თვისებებით.',
 'ACE', 'Regular', 8.0, ARRAY['eucalyptus', 'medicinal'], 5.49, NULL, 'ACE-EW-001', '/assets/product-23.jpg', false, 4.1, 130),

('ace-superwhite-mint', 'ACE Superwhite Mint', 'ეისი სუპერვაითი პიტნა', 
 'Extra white portions with classic mint', 'დამატებითი თეთრი პორციები კლასიკური პიტნით',
 'ACE Superwhite Mint features ultra-white portions with a refreshing classic mint flavor for all-day freshness.', 
 'ეისი სუპერვაითი პიტნას აქვს ულტრა-თეთრი პორციები მაგრივებელი კლასიკური პიტნის გემოთ მთელი დღის სიახლისთვის.',
 'ACE', 'Strong', 11.0, ARRAY['mint'], 5.79, NULL, 'ACE-SM-001', '/assets/product-24.jpg', false, 4.3, 165),

-- Vintage premium products
('ettan-white-portion', 'Ettan White Portion', 'ეტანი ვაითი პორშენ', 
 'Traditional Swedish snus since 1822', 'ტრადიციული შვედური სნუსი 1822 წლიდან',
 'Ettan represents the essence of Swedish snus tradition with its classic tobacco flavor refined over centuries.', 
 'ეტანი წარმოადგენს შვედური სნუსის ტრადიციის არსს თავისი კლასიკური თამბაქოს გემოთ საუკუნეების განმავლობაში დახვეწილი.',
 'Ettan', 'Regular', 8.8, ARRAY['tobacco', 'classic'], 5.99, NULL, 'ETT-WP-001', '/assets/product-25.jpg', true, 4.8, 120),

('grovsnus-white', 'Grovsnus White', 'გროვსნუსი ვაითი', 
 'Coarse-ground tobacco for authentic taste', 'უხეში ნაფქვავი თამბაქო ავთენტური გემისთვის',
 'Grovsnus White maintains the traditional coarse grind that delivers a robust, authentic Swedish snus experience.', 
 'გროვსნუსი ვაითი ინარჩუნებს ტრადიციულ უხეშ დაფქვას რომელიც იძლევა მძლავრ, ავთენტურ შვედურ სნუსის გამოცდილებას.',
 'Grovsnus', 'Strong', 12.5, ARRAY['tobacco', 'coarse'], 6.49, NULL, 'GRV-W-001', '/assets/product-26.jpg', false, 4.4, 95),

-- Modern fruit flavors
('kapten-white-mint', 'Kapten White Mint', 'კაპტენი ვაითი პიტნა', 
 'Captain-strength mint with maritime freshness', 'კაპიტნის სიძლიერის პიტნა ზღვისპირა სიახლით',
 'Set sail with Kapten White Mint, offering captain-strength nicotine with refreshing maritime mint flavors.', 
 'გაცურეთ კაპტენი ვაითი პიტნასთან, რომელიც გთავაზობთ კაპიტნის სიძლიერის ნიკოტინს მაგრივებელ ზღვისპირა პიტნის გემოებით.',
 'Kapten', 'Strong', 13.2, ARRAY['mint', 'marine'], 6.99, NULL, 'KAP-WM-001', '/assets/product-27.jpg', false, 4.2, 110),

('lundgrens-västkust-white', 'Lundgrens Västkust White', 'ლუნდგრენსი ვასტკუსტი ვაითი', 
 'West coast inspired juniper and sea salt', 'დასავლეთ სანაპიროდან შთაგონებული ღია და ზღვის მარილი',
 'Inspired by Sweden\'s west coast, featuring juniper berries and sea salt for a unique maritime experience.', 
 'შვედეთის დასავლეთი სანაპიროდან შთაგონებული, შეიცავს ღიას კენკრებს და ზღვის მარილს უნიკალური ზღვისპირა გამოცდილებისთვის.',
 'Lundgrens', 'Regular', 9.0, ARRAY['juniper', 'salt', 'maritime'], 6.29, 7.29, 'LUN-VW-001', '/assets/product-28.jpg', false, 4.0, 105),

-- Additional premium options
('phantom-classic-white', 'Phantom Classic White', 'ფანტომი კლასიკი ვაითი', 
 'Mysterious blend with hidden depths', 'საიდუმლო ნაზავი ფარული სიღრმეებით',
 'Phantom Classic White offers a mysterious tobacco blend with complex flavor notes that reveal themselves slowly.', 
 'ფანტომი კლასიკი ვაითი გთავაზობთ საიდუმლო თამბაქოს ნაზავს კომპლექსური გემოვნური ნოტებით რომლებიც ნელ-ნელა იჩენს თავს.',
 'Phantom', 'Regular', 8.3, ARRAY['tobacco', 'mystery'], 7.79, NULL, 'PHA-CW-001', '/assets/product-29.jpg', false, 4.1, 80),

('r42-white-dry', 'R42 White Dry', 'არ42 ვაითი დრაი', 
 'Laboratory-perfected mint formula', 'ლაბორატორიაში დახვეწილი პიტნის ფორმულა',
 'R42 White Dry represents scientific precision in snus making with a perfectly balanced mint formula.', 
 'არ42 ვაითი დრაი წარმოადგენს მეცნიერულ სიზუსტეს სნუსის დამზადებაში სრულყოფილად დაბალანსებული პიტნის ფორმულით.',
 'R42', 'Strong', 14.8, ARRAY['mint', 'scientific'], 8.29, NULL, 'R42-WD-001', '/assets/product-30.jpg', false, 4.3, 70),

-- International flavors
('pablo-ice-cold', 'Pablo Ice Cold', 'პაბლო აისი კოლდ', 
 'Extreme strength with arctic mint blast', 'ექსტრემალური სიძლიერე არქტიკული პიტნის აფეთქებით',
 'Pablo Ice Cold delivers extreme nicotine strength with an arctic mint blast that will freeze your senses.', 
 'პაბლო აისი კოლდ იძლევა ექსტრემალურ ნიკოტინის სიძლიერეს არქტიკული პიტნის აფეთქებით რომელიც გაყინავს თქვენს გრძნობებს.',
 'Pablo', 'Extra Strong', 50.0, ARRAY['mint', 'extreme'], 9.99, NULL, 'PAB-IC-001', '/assets/product-31.jpg', true, 4.6, 45),

('kurwa-collection-madness', 'Kurwa Collection Madness', 'კურვა კოლექშენი მედნესი', 
 'Insanely strong nicotine experience', 'შეუპოვრად ძლიერი ნიკოტინის გამოცდილება',
 'WARNING: Kurwa Madness contains extremely high nicotine levels. Only for the most experienced users.', 
 'გაფრთხილება: კურვა მედნესი შეიცავს ძალიან მაღალ ნიკოტინის დონეს. მხოლოდ ყველაზე გამოცდილი მომხმარებლებისთვის.',
 'Kurwa', 'Extreme', 55.0, ARRAY['extreme', 'mint'], 11.99, NULL, 'KUR-MAD-001', '/assets/product-32.jpg', false, 4.2, 30),

-- Flavor innovations
('killa-cold-mint', 'Killa Cold Mint', 'კილა კოლდ მინტ', 
 'Killer mint with maximum cooling effect', 'მკვლელი პიტნა მაქსიმალური გამაგრილებელი ეფექტით',
 'Killa Cold Mint lives up to its name with a killer combination of mint and cooling agents for maximum impact.', 
 'კილა კოლდ მინტ ამართლებს თავის სახელს მკვლელი კომბინაციით პიტნისა და გამაგრილებელი აგენტების მაქსიმალური ეფექტისთვის.',
 'Killa', 'Extra Strong', 16.0, ARRAY['mint', 'killer'], 8.79, NULL, 'KIL-CM-001', '/assets/product-33.jpg', false, 4.0, 65),

('corvus-northern-mint', 'Corvus Northern Mint', 'კორვუსი ნოზერნ მინტ', 
 'Nordic mint with raven-black intensity', 'ნორდიული პიტნა ყორნის-შავი ინტენსიურობით',
 'Corvus Northern Mint soars with the intensity of a Nordic raven, delivering powerful mint with dark undertones.', 
 'კორვუსი ნოზერნ მინტი ფრენს ნორდიული ყორნის ინტენსიურობით, მწარმოებელი ძლიერი პიტნა მუქი ქვეტონებით.',
 'Corvus', 'Strong', 12.0, ARRAY['mint', 'nordic'], 7.49, NULL, 'COR-NM-001', '/assets/product-34.jpg', false, 4.2, 85),

-- Fruit and dessert flavors
('fox-berry-explosion', 'FOX Berry Explosion', 'ფოქსი ბერი ექსფლოჟენ', 
 'Wild berry mix with explosive taste', 'ველური კენკროვანი ნაზავი აფეთქებული გემოთ',
 'FOX Berry Explosion bursts with a wild mix of forest berries for a sweet and tangy flavor adventure.', 
 'ფოქსი ბერი ექსფლოჟენი აფეთქდება ველური ტყის კენკროვანი ნაზავით ტკბილი და მჟავე გემოვნური თავგადასავლისთვის.',
 'FOX', 'Light', 6.5, ARRAY['berry', 'sweet', 'wild'], 5.99, 6.99, 'FOX-BE-001', '/assets/product-35.jpg', false, 3.8, 120),

('sol-mango-passion', 'SOL Mango Passion', 'სოლი მანგო პეშენი', 
 'Tropical mango with passion fruit notes', 'ტროპიკული მანგო პასიფლორის ნოტებით',
 'Transport yourself to a tropical paradise with SOL Mango Passion featuring exotic mango and passion fruit.', 
 'გადაიტანეთ თავი ტროპიკულ სამოთხეში სოლი მანგო პეშენით, რომელიც შეიცავს ეგზოტიკურ მანგოსა და პასიფლორას.',
 'SOL', 'Regular', 8.0, ARRAY['mango', 'tropical', 'passion'], 6.49, NULL, 'SOL-MP-001', '/assets/product-36.jpg', false, 4.0, 100),

-- Exotic and spicy
('thunder-chili-mango', 'Thunder Chili Mango', 'ზანდერ ჩილი მანგო', 
 'Sweet mango with spicy chili kick', 'ტკბილი მანგო ცხარე ჩილის დარტყმით',
 'Thunder Chili Mango strikes with the perfect balance of tropical sweetness and spicy heat in every portion.', 
 'ზანდერ ჩილი მანგო აბრუნებს ტროპიკული სიტკბოსა და ცხარე სიცხის სრულყოფილ ბალანსს ყოველ პორციაში.',
 'Thunder', 'Regular', 9.0, ARRAY['mango', 'chili', 'spicy'], 5.79, NULL, 'THU-CM-001', '/assets/product-37.jpg', false, 3.9, 110),

-- Coffee and chocolate
('skruf-coffee-white', 'Skruf Coffee White', 'სკრუფ ყავა ვაითი', 
 'Rich coffee flavor with creamy notes', 'მდიდარი ყავის გემო კრემისებური ნოტებით',
 'Wake up your senses with Skruf Coffee White featuring rich espresso flavor with creamy undertones.', 
 'გააღვიძეთ თქვენი გრძნობები სკრუფ ყავა ვაითით, რომელიც შეიცავს მდიდარ ესპრესოს გემოს კრემისებური ქვეტონებით.',
 'Skruf', 'Regular', 8.5, ARRAY['coffee', 'cream'], 6.99, NULL, 'SKR-CW-001', '/assets/product-38.jpg', false, 4.1, 95),

('general-mackmyra', 'General Mackmyra', 'ჯენერალ მაკმირა', 
 'Whiskey-inspired flavor collaboration', 'ვისკი-შთაგონებული გემოვნური კოლაბორაცია',
 'A unique collaboration combining traditional snus craftsmanship with premium Swedish whiskey flavoring.', 
 'უნიკალური კოლაბორაცია, რომელიც აერთიანებს ტრადიციულ სნუსის ხელოსნობას პრემიუმ შვედურ ვისკის გემოებთან.',
 'General', 'Strong', 11.5, ARRAY['whiskey', 'premium'], 9.49, NULL, 'GEN-MAC-001', '/assets/product-39.jpg', true, 4.4, 75),

-- Herbal and natural
('göteborgs-rapé-hjortron', 'Göteborgs Rapé Hjortron', 'გოტებორგს რაპე ჰიორტრონ', 
 'Cloudberry flavor from Nordic forests', 'ღრუბლისფერი კენკროვანი ნორდიული ტყეებიდან',
 'Experience the rare taste of cloudberries from the Nordic forests in this premium Swedish snus blend.', 
 'იგრძენით ღრუბლისფერი კენკროვანის იშვიათი გემო ნორდიული ტყეებიდან ამ პრემიუმ შვედურ სნუსის ნაზავში.',
 'Göteborgs Rapé', 'Regular', 8.0, ARRAY['cloudberry', 'nordic'], 7.29, NULL, 'GR-HJO-001', '/assets/product-40.jpg', false, 4.3, 80),

-- Premium limited editions
('lundgrens-skåne-white', 'Lundgrens Skåne White', 'ლუნდგრენსი სკონე ვაითი', 
 'Regional tribute to southern Sweden', 'რეგიონალური ღირსება სამხრეთ შვედეთისთვის',
 'A regional tribute featuring flavors characteristic of southern Sweden\'s Skåne province with apple notes.', 
 'რეგიონალური ღირსება, რომელიც შეიცავს სამხრეთ შვედეთის სკონეს პროვინციის დამახასიათებელ გემოებს ვაშლის ნოტებით.',
 'Lundgrens', 'Light', 7.5, ARRAY['apple', 'regional'], 6.79, 7.79, 'LUN-SKA-001', '/assets/product-41.jpg', false, 4.0, 90),

-- Artisanal craft snus
('offroad-frosted-eucalyptus', 'Offroad Frosted Eucalyptus', 'ოფროდი ფროსტედ ევკალიპტუსი', 
 'Adventure-inspired eucalyptus with cooling', 'თავგადასავლით შთაგონებული ევკალიპტუსი გამაგრილებით',
 'Take your taste buds off the beaten path with Offroad Frosted Eucalyptus - adventure in every portion.', 
 'წაიყვანეთ თქვენი გემოვნური ისრები ნაცნობი ბილიკიდან ოფროდი ფროსტედ ევკალიპტუსით - თავგადასავალი ყოველ პორციაში.',
 'Offroad', 'Strong', 11.8, ARRAY['eucalyptus', 'adventure'], 7.99, NULL, 'OFF-FE-001', '/assets/product-42.jpg', false, 4.1, 85),

-- Final premium products
('nick-johnny-red-hot', 'Nick & Johnny Red Hot', 'ნიკ ენდ ჯონი რედ ჰოტ', 
 'Fiery cinnamon with intense heat', 'ცეცხლოვანი ცინამონი ინტენსიური სიცხით',
 'Nick & Johnny Red Hot brings the heat with fiery cinnamon spice that builds intensity with each portion.', 
 'ნიკ ენდ ჯონი რედ ჰოტ მოაქვს სიცხე ცეცხლოვანი ცინამონის სანელებლით, რომელიც აგროვებს ინტენსიურობას ყოველ პორციასთან.',
 'Nick & Johnny', 'Strong', 12.5, ARRAY['cinnamon', 'hot'], 6.89, NULL, 'NJ-RH-001', '/assets/product-43.jpg', false, 4.2, 105),

('crafted-snus-elderflower', 'Crafted Snus Elderflower', 'კრაფტედ სნუსი ელდერფლავერ', 
 'Artisanal elderflower with floral notes', 'არტიზანული ზაზუნა ყვავილოვანი ნოტებით',
 'Handcrafted with premium elderflower extract for a delicate, floral snus experience like no other.', 
 'ხელნაკეთი პრემიუმ ზაზუნას ექსტრაქტით დელიკატური, ყვავილოვანი სნუსის გამოცდილებისთვის, რომელიც სხვას არ ჰგავს.',
 'Crafted Snus', 'Light', 6.0, ARRAY['elderflower', 'floral'], 8.99, NULL, 'CS-ELD-001', '/assets/product-44.jpg', false, 4.5, 60),

-- Ultra-premium finale
('artisan-collection-tobacco', 'Artisan Collection Tobacco', 'არტიზან კოლექშენ თამბაქო', 
 'Hand-selected premium tobacco blend', 'ხელით შერჩეული პრემიუმ თამბაქოს ნაზავი',
 'The pinnacle of snus craftsmanship featuring hand-selected tobacco leaves aged in Swedish oak barrels.', 
 'სნუსის ხელოსნობის მწვერვალი, რომელიც შეიცავს ხელით შერჩეულ თამბაქოს ფოთლებს შვედურ მუხის კასრებში დაძველებული.',
 'Artisan Collection', 'Regular', 9.2, ARRAY['tobacco', 'premium'], 12.99, NULL, 'ART-TOB-001', '/assets/product-45.jpg', true, 4.8, 40),

-- Last premium entry
('royal-crown-mint', 'Royal Crown Mint', 'როიალ კრაუნ მინტ', 
 'Regal mint blend fit for royalty', 'სამეფო პიტნის ნაზავი რომელიც შეეფერება რუხანიას',
 'Experience mint royalty with Royal Crown Mint - a majestic blend of premium mints from around the world.', 
 'იგრძენით პიტნის რუხანია როიალ კრაუნ მინტით - წყალობილი ნაზავი პრემიუმ პიტნისა მთელი მსოფლიოდან.',
 'Royal Crown', 'Strong', 13.0, ARRAY['mint', 'royal'], 10.99, NULL, 'RC-MINT-001', '/assets/product-46.jpg', true, 4.6, 50),

-- Additional products to reach exactly 42 new ones (4 more needed)
('epic-cool-blast', 'Epic Cool Blast', 'ეპიკი კუელ ბლასტ', 
 'Epic cooling sensation with menthol burst', 'ეპიკური გამაგრილებელი სენსაცია მენთოლის აფეთქებით',
 'Epic Cool Blast delivers an legendary cooling experience with powerful menthol that creates an unforgettable rush.', 
 'ეპიკი კუელ ბლასტ იძლევა ლეგენდარულ გამაგრილებელ გამოცდილებას ძლიერი მენთოლით რომელიც ქმნის დაუვიწყარ რაშს.',
 'Epic', 'Strong', 11.5, ARRAY['menthol', 'cooling'], 7.49, NULL, 'EPC-CB-001', '/assets/product-47.jpg', false, 4.1, 95),

('nordic-winter-white', 'Nordic Winter White', 'ნორდიკ ვინტერ ვაითი', 
 'Pure Nordic winter experience', 'სუფთა ნორდიული ზამთრის გამოცდილება',
 'Capture the essence of Nordic winter with this pure, clean white portion featuring crisp winter mint flavors.', 
 'ჩაიტანეთ ნორდიული ზამთრის არსი ამ სუფთა, სუფთა თეთრი პორციით, რომელიც შეიცავს ცხადი ზამთრის პიტნის გემოებს.',
 'Nordic', 'Regular', 8.8, ARRAY['winter', 'mint'], 6.29, NULL, 'NOR-WW-001', '/assets/product-48.jpg', false, 4.2, 115),

('zeus-thunder-mint', 'Zeus Thunder Mint', 'ზევსი ზანდერ მინტ', 
 'Godlike mint with thunderous power', 'ღვთისებური პიტნა ქუხილოვანი ძალით',
 'Zeus Thunder Mint unleashes the power of the gods with thunderous mint that strikes with divine intensity.', 
 'ზევსი ზანდერ მინტი ათავისუფლებს ღვთაებების ძალას ქუხილოვანი პიტნით, რომელიც აბრუნებს ღვთაებრივი ინტენსიურობით.',
 'Zeus', 'Extra Strong', 18.0, ARRAY['mint', 'thunder'], 9.29, NULL, 'ZEU-TM-001', '/assets/product-49.jpg', false, 4.4, 55),

('premium-select-original', 'Premium Select Original', 'პრემიუმ სელექტ ორიჯინალ', 
 'The ultimate premium snus experience', 'ულტიმატური პრემიუმ სნუსის გამოცდილება',
 'Premium Select Original represents the pinnacle of snus excellence with carefully curated tobacco and traditional craftsmanship.', 
 'პრემიუმ სელექტ ორიჯინალი წარმოადგენს სნუსის ღირსების მწვერვალს ყურადღებით შერჩეული თამბაქოთი და ტრადიციული ხელოსნობით.',
 'Premium Select', 'Strong', 12.8, ARRAY['tobacco', 'premium'], 11.49, NULL, 'PS-ORIG-001', '/assets/product-50.jpg', true, 4.9, 35);