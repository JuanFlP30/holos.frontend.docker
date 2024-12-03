<script setup>

console.log(route('api.routes'));
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>

  {{ route('api.routes') }}
</template>
