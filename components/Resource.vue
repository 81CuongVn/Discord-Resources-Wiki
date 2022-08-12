<template>
  <h2>{{ resource.title }}</h2>
  <p>{{ translation?.description || resource.description }}</p>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { Resource, ResourceTranslation } from "../common/resource";

const props = defineProps<{
  resource: Resource;
}>();
const i18n = useI18n();

i18n.locale.value = "de";

// TODO: don't fetch if locale is "en"
const { data: translation } = await useAsyncData(
  `resource-translation-${props.resource._path}`,
  () =>
    queryContent<ResourceTranslation>(
      "_i18n",
      i18n.locale.value,
      props.resource._path!
    ).findOne()
);
</script>
