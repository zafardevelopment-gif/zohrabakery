-- Seed existing cake catalog into zb_cakes.
-- Safe to re-run: uses ON CONFLICT to upsert by id.

insert into public.zb_cakes (id, name, category, description, image, featured, sizes)
values
  ('tiramisu-cake', 'Tiramisu Cake', 'Specialty', 'Classic Italian-inspired layers with a coffee-kissed finish and a light mascarpone cream. (Sample pricing — update in admin panel.)', '/images/cakes/untitled-1783440499747.jpg', true, '[{"label":"0.5 kg","price":450},{"label":"1 kg","price":850}]'::jsonb),
  ('velvet-cake', 'Velvet Cake', 'Classic', 'Rich, blush-red velvet sponge with silky cream cheese frosting. (Sample pricing — update in admin panel.)', '/images/cakes/velvet.svg', true, '[{"label":"0.5 kg","price":400},{"label":"1 kg","price":750},{"label":"1.5 kg","price":1100}]'::jsonb),
  ('strawberry-cake', 'Strawberry Cake', 'Fresh Fruit', 'Soft vanilla sponge layered with fresh strawberry compote and cream. (Sample pricing — update in admin panel.)', '/images/cakes/strawberry.svg', true, '[{"label":"0.5 kg","price":380},{"label":"1 kg","price":700}]'::jsonb),
  ('rasmalai-cake', 'Rasmalai Cake', 'Fusion', 'A homely fusion of soft rasmalai and cream sponge — a Zohra Bakery favourite. (Sample pricing — update in admin panel.)', '/images/cakes/rasmalai.svg', true, '[{"label":"0.5 kg","price":420},{"label":"1 kg","price":800}]'::jsonb),
  ('chocolate-cake', 'Chocolate Cake', 'Classic', 'Deep, moist chocolate sponge with silky chocolate ganache. A timeless favourite. (Sample pricing — update in admin panel.)', '/images/cakes/chocolate.svg', true, '[{"label":"0.5 kg","price":380},{"label":"1 kg","price":700},{"label":"1.5 kg","price":1000},{"label":"2 kg","price":1300}]'::jsonb),
  ('cheese-cake', 'Cheese Cake', 'Specialty', 'Creamy, melt-in-the-mouth cheesecake baked fresh to order. (Sample pricing — update in admin panel.)', '/images/cakes/cheesecake.svg', false, '[{"label":"0.5 kg","price":500},{"label":"1 kg","price":950}]'::jsonb),
  ('honey-bell-cake', 'Honey Bell Cake', 'Specialty', 'Delicate honey-soaked sponge layers with a light, fluffy cream. (Sample pricing — update in admin panel.)', '/images/cakes/honey-bell.svg', false, '[{"label":"0.5 kg","price":420},{"label":"1 kg","price":780}]'::jsonb),
  ('mousse-jar-cake', 'Mousse Jar Cake', 'Jars', 'Individual jars layered with soft cake crumbs and rich mousse — perfect for small celebrations. (Sample pricing — update in admin panel.)', '/images/cakes/mousse-jar.svg', false, '[{"label":"1 jar","price":120},{"label":"Box of 4","price":440}]'::jsonb),
  ('fresh-fruit-cake', 'Fresh Fruit Cake', 'Fresh Fruit', 'Light vanilla sponge topped with a colourful medley of seasonal fresh fruits. (Sample pricing — update in admin panel.)', '/images/cakes/fresh-fruit.svg', false, '[{"label":"0.5 kg","price":420},{"label":"1 kg","price":800}]'::jsonb),
  ('cookies', 'Cookies', 'Cookies', 'Freshly baked, homemade cookies — soft in the centre, golden at the edges. (Sample pricing — update in admin panel.)', '/images/cakes/cookies.svg', false, '[{"label":"250 g box","price":150},{"label":"500 g box","price":280}]'::jsonb)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  image = excluded.image,
  featured = excluded.featured,
  sizes = excluded.sizes,
  updated_at = now();
