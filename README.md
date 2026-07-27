# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).



ROMARA Admin Panel
CMS for non-developer ROMARA staff - manage tours, bookings, blog, testimonials, promotions, and enquiries without touching Supabase Studio.
Design plan
Color - warm/earthy safari palette:
    - sand-100 #F4EDE2 - page background
    - sand-300 #D8C9B3 - borders
    - ink #2B2118 - primary text
    - terracotta #C2593B - primary accent, CTAs
    - safari-green #3F5D45 - success/confirmed states
    - ochre #C89B3C - pending/highlight states
Type - Fraunces (display, headings - warm serif with character) paired with Public Sans (UI/body - legible at small sizes for data-dense screens). Add both via Google Fonts or self-host:
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
Layout - persistent left sidebar (desktop) collapsing to a slide-in drawer (mobile), chosen because it scales cleanly as more CMS sections get added later (Hotels, Car Hire, per the contract's �5 scalability list) without needing a nav redesign.
Signature element - status badges styled as a rotated passport-stamp (dotted circular border) instead of generic colored pills - the one deliberate flourish, tying the CMS chrome back to the travel subject.
Folder structure - drop into romara-frontend
romara-frontend/
??? src/
?   ??? admin/
?       ??? layouts/
?       ?   ??? AdminLayout.vue
?       ??? components/
?       ?   ??? AdminSidebar.vue
?       ?   ??? DataTable.vue       # responsive: table desktop, cards mobile
?       ?   ??? StatusStamp.vue     # the passport-stamp badge
?       ?   ??? SlideOver.vue       # drawer for quick-edit forms
?       ??? composables/
?       ?   ??? useAdminAuth.ts
?       ??? router/
?       ?   ??? adminRoutes.ts
?       ??? views/
?           ??? AdminLogin.vue
?           ??? DashboardHome.vue
?           ??? TourPackagesView.vue    # list (full-page CRUD pattern)
?           ??? TourPackageForm.vue     # dedicated create/edit page
?           ??? BookingsView.vue        # status triage
?           ??? EnquiriesView.vue       # status triage + drawer detail
?           ??? BlogView.vue            # list + drawer form
?           ??? TestimonialsView.vue    # list + drawer form
?           ??? PromotionsView.vue      # list + drawer form
??? tailwind.config.js           # merge tailwind.config.admin.js's `extend` block in
??? ...
Integration steps
    1. Copy the src/admin/ folder into your existing romara-frontend/src/.
    2. Merge tailwind.config.admin.js into your existing tailwind.config.js - add its theme.extend.colors and theme.extend.fontFamily entries alongside whatever the public site already defines. Don't replace the file; merge it.
    3. Add the fonts (Fraunces + Public Sans) to your index.html <head>.
    4. Wire the admin routes into your main router (src/router/index.ts or wherever your createRouter call lives):
       import { adminRoutes, adminAuthGuard } from '@/admin/router/adminRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...existingRoutes,
    ...adminRoutes,
  ],
})

router.beforeEach(adminAuthGuard)
    5. Apply the Supabase migration in supabase-migrations/00004_admin_and_enquiries.sql - copy it into your romara-supabase/supabase/migrations/ folder and run:
       supabase db reset
       This adds the profiles table (with is_admin), the enquiries table, and the admin-only RLS policies the panel's forms rely on for write access.
    6. Create the tour-images storage bucket if you haven't already (Storage ? New Bucket ? tour-images, public) - the tour package form uploads directly to it.
    7. Make your first admin user. After someone signs up through Supabase Auth (or you create them manually in the dashboard), run in the SQL editor:
       update profiles set is_admin = true where id = '<their auth.users id>';
       If the profiles row doesn't exist yet for that user, insert it first:
       insert into profiles (id, full_name, is_admin) values ('<user id>', 'Staff name', true);
    8. Visit /admin/login and sign in with that account.
What's intentionally left to fill in
    - TourPackageForm.vue is the only full CRUD example built to completion; BlogView, TestimonialsView, and PromotionsView follow the same drawer pattern and are fully working, just lighter on validation - extend as needed.
    - No image cropping/compression on upload yet (contract �10 wants optimized images) - consider adding client-side resize before the Supabase Storage upload call.
    - Enquiry email notifications aren't wired - pairs well with the Edge Function idea discussed earlier for mpesa (a small notify-enquiry function using Resend would close this).
