<template>
  <ResourceVue v-for="resource in resources" :resource="resource"></ResourceVue>
</template>

<script setup lang="ts">
import ResourceVue from "../../components/Resource.vue";
import { Resource } from "../../common/resource";

const route = useRoute();

const { data: resources } = await useAsyncData(
  `category-resources-${route.path}`,
  () => queryContent<Resource>(route.path).find()
);
</script>
