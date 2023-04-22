<script setup></script>

<template>
  <div class="loader-container d-flex justify-content-center align-items-center">
    <div class="spinner-grow text-primary" role="status"></div>
    <div class="spinner-grow text-primary" role="status"></div>
    <div class="spinner-grow text-primary" role="status"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  height: 1000px;
  @media (max-width: 768px) {
    height: 500px;
  }
}
</style>
