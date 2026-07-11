<template>
  <section class="bg-emerald-50 px-6 py-16 lg:px-12">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div class="max-w-2xl space-y-8">
        <div class="inline-flex items-center gap-3 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
          <span class="h-2 w-2 rounded-full bg-emerald-600"></span>
          Discover Kenya with ROMARA
        </div>
        <div class="space-y-6">
          <h1 class="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Unforgettable safari experiences across Kenya.
          </h1>
          <p class="max-w-xl text-lg leading-8 text-slate-700">
            Travel deeper with curated safaris, local guides, and seamless support from inquiry to return.
          </p>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row">
          <button class="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
            Book a Safari
          </button>
          <button class="inline-flex items-center justify-center rounded-full border border-slate-950 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            Request a Quote
          </button>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p class="text-3xl font-bold text-slate-950">150+</p>
            <p class="mt-2 text-sm text-slate-600">Safaris booked</p>
          </div>
          <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p class="text-3xl font-bold text-slate-950">24/7</p>
            <p class="mt-2 text-sm text-slate-600">Support available</p>
          </div>
        </div>
      </div>
      <div class="relative">
        <div class="aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
            alt="Safari vehicle in Kenya"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="absolute bottom-6 left-6 rounded-3xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur">
          <p class="text-sm uppercase tracking-[0.24em] text-emerald-700">Featured route</p>
          <p class="mt-2 text-lg font-semibold text-slate-950">Maasai Mara & Amboseli</p>
        </div>
      </div>
    </div>
  </section>
</template>
