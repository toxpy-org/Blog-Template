<script setup lang="ts">
import Option from "./SingleOption.vue";
import { ref } from 'vue';

interface Props {
  answer_index: number,
  answers: Array<string>,
  cb: () => void
}

defineProps<Props>();

const obj = ref<{ selected: null | number, answer_given: boolean }>({ selected: null, answer_given: false });

</script>

<template>
  <div class="options">
    <Option v-for="a, i in answers" :qref="obj" :cb="cb" :answer_index="answer_index" :html="(a as any)" :id="(i)" />
  </div>
</template>

<style scoped lang="scss">
$color-accent: 223;
$color-sat: 16%;
$blog-width: 600px;

@function primary_color($b) {
  @return hsl($color-accent, $color-sat, $b);
}

.options {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  gap: 10px;
  padding: 10px;
  align-items: center;
}
</style>