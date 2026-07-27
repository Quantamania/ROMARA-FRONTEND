<script setup lang="ts">
interface Experience {
  name: string
  description: string
  image: string
  href: string
}

const experiences: Experience[] = [
  {
    name: 'Maasai Mara Safari',
    description: 'Explore the world-famous Maasai Mara.',
    image: '/src/assets/images/booking/maasai-mara-safari.jpg',
    href: '/safari-packages/3-day-maasai-mara-safari',
  },
  {
    name: 'Diani Beach Holiday',
    description: "Relax on Kenya's beautiful white sandy beaches.",
    image: '/src/assets/images/booking/diani-beach-holiday.jpg',
    href: '/destinations/diani-beach',
  },
  {
    name: 'Mount Kenya Hiking',
    description: "Adventure awaits on Africa's second highest peak.",
    image: '/src/assets/images/booking/mount-kenya-hiking.jpg',
    href: '/destinations',
  },
]
</script>

<template>
  <div class="bg-white shadow-xl p-6 border-romara-green-dark border-t-4 rounded-2xl">
    <div class="flex items-center gap-2 mb-4">
      <div class="bg-romara-green-dark rounded w-8 h-1"></div>
      <p class="font-heading font-bold text-romara-green-dark text-lg">Popular Experiences</p>
    </div>

    <div class="space-y-4 mt-4">
      <a v-for="experience in experiences" :key="experience.name" :href="experience.href" class="group flex gap-4 hover:bg-romara-green-dark/5 hover:shadow-md p-3 rounded-xl transition-all duration-200">
        <div class="relative rounded-lg overflow-hidden shrink-0">
          <img :src="experience.image" :alt="experience.name" class="w-20 h-16 object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
          <div class="absolute inset-0 bg-romara-green-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        <div class="flex flex-col justify-center min-w-0">
          <p class="font-bold text-romara-green-dark group-hover:text-romara-green text-sm transition-colors">{{ experience.name }}</p>
          <p class="mt-1 text-romara-ink/60 text-xs leading-relaxed">{{ experience.description }}</p>
        </div>
      </a>
    </div>

    <a
      href="/safari-packages"
      class="group inline-flex items-center gap-2 mt-6 font-semibold text-romara-green-dark hover:text-romara-green text-sm transition-colors"
    >
      Explore All Packages
      <span class="transition-transform group-hover:translate-x-1 transform">→</span>
    </a>
  </div>
</template>