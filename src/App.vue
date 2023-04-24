<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <a class="skip" href="#main">Back</a>
  <main id="#main">
    <RouterView />
  </main>
</template>
