-- Update Supabase auth configuration for new domain
-- This updates the site_url and additional redirect URLs for the new domain
UPDATE auth.config 
SET site_url = 'https://gegesnusavs.com'
WHERE TRUE;

-- Note: The additional_redirect_urls will need to be updated in the Supabase dashboard
-- to include both https://gegesnusavs.com and any staging URLs