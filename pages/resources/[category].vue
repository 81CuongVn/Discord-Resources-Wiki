<template>
  <Resource v-for="resource in resources" :resource="resource"></Resource>
</template>

<script setup lang="ts">
import Resource from "../../components/Resource.vue";

const route = useRoute();

const resources = await queryContent(route.fullPath).find();
</script>
