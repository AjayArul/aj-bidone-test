<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/button/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import { user } from '$lib/stores/user';
  import { BookOpen, UserCircle } from 'svelte-heros';

  const WARNING_INVALID_UNAME_OR_PASS = 'Invalid User Name or password'
  const ERROR_SOMETHING_WRONG = 'Something went wrong. Try again later.'
  const WARNING_INVALID_PASS = 'Please enter a valid Password'
  const WARNING_INVALID_UNAME = 'Please enter a valid User Name'

  let userInput = {
    userName: '',
    password: '',
  };

  let error = {
    userName: '',
    password: '',
  };

  let errors = '';

  const validate = (): boolean => {
    error = {
      ...{
        userName: '',
        password: '',
      },
    };
    let valid = true;

    if (!userInput.userName || userInput.userName !== 'Admin') {
      error.userName = WARNING_INVALID_UNAME;
      valid = false;
    }

    if (!userInput.password || userInput.password !== 'admin123') {
      error.password = WARNING_INVALID_PASS;
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      if (userInput.userName === 'Admin' && userInput.password === 'admin123') {
        user.set({
          isAuthenticated: true,
          token: null,
          role: 'admin',
          userName: userInput.userName,
        });
        localStorage.setItem("user", JSON.stringify({ role: 'admin', userName: 'Admin' }));
        goto('/articles');
      } else {
        errors = WARNING_INVALID_UNAME_OR_PASS;
      }
    } catch (e) {
      errors = ERROR_SOMETHING_WRONG;
    }
  };
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
        class="hover-scale flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3 font-bold text-gray-900 transition"
      >
        <BookOpen class="h-5 w-5" /> Articles
      </a>
      <a
        href="https://ajayarul.com"
        target="_blank"
        class="hover-scale flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-bold text-gray-900 transition"
      >
        <UserCircle class="h-5 w-5" /> My Profile
      </a>
    </div>
  </div>
  <!-- login -->
  {#if !$user?.isAuthenticated}
    <div class="justify-top flex min-h-screen flex-col items-center px-4 py-12">
      <div class="w-full max-w-[480px]">
        <div class="rounded-2xl border border-gray-200 bg-white/25 p-6 shadow-sm sm:p-8">
          <h1 class="mb-2 text-center text-3xl font-semibold text-amber-500">Sign in</h1>
          <p>Login is required to edit or modify the Articles.</p>
          <form class="mt-12 space-y-6 text-left">
            <div>
              <div class="relative flex items-center">
                <Input
                  name="userName"
                  className="w-full"
                  label="User name : Admin"
                  type="text"
                  placeholder="User Name"
                  error={error?.userName || ''}
                  bind:value={userInput.userName}
                />
              </div>
            </div>
            <div>
              <div class="relative flex items-center">
                <Input
                  name="password"
                  type="password"
                  className="w-full"
                  label="Password: admin123"
                  placeholder="Password"
                  error={error?.password || ''}
                  bind:value={userInput.password}
                />
              </div>
            </div>
            {#if errors}
              <p class="mt-1 text-sm text-red-500">{errors}</p>
            {/if}
            <div class="!mt-8">
              <Button
                variant="primary"
                type="button"
                className="w-full"
                on:click={() => handleLogin()}>Sign in</Button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
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
