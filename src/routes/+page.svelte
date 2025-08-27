<script>
  import { BookOpen, UserCircle } from 'svelte-heros';
</script>

<!-- Home page -->
<div class="px-4 py-16 text-center sm:px-8 lg:px-16">
  <div class="mx-auto max-w-4xl">
    <h1 class="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
      Welcome to <span class="gradient-text">BidOne Code test</span>
    </h1>
    <p class="mx-auto mb-10 max-w-4xl text-xl text-gray-300 sm:text-2xl">
      I'm Ajay, building an internal tool for content editors to manage a list of articles.
    </p>
    <div class="flex flex-col justify-center gap-4 sm:flex-row">
      <a
        href="/articles"
        class="hover-scale flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3 font-bold text-gray-900 transition hover:bg-amber-600"
      >
        <BookOpen class="h-5 w-5" /> Articles
      </a>
      <a
        href="https://ajayarul.com"
        target="_blank"
        class="hover-scale flex items-center justify-center gap-2 rounded-full bg-gray-700 px-8 py-3 font-bold text-white transition hover:bg-gray-600"
      >
        <UserCircle class="h-5 w-5" /> My Profile
      </a>
    </div>
  </div>
</div>

<style>
  .gradient-text {
    background: linear-gradient(90deg, #f59e0b, #ef4444);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hover-scale {
    transition: transform 0.3s ease;
  }

  .hover-scale:hover {
    transform: scale(1.05);
  }
</style>
