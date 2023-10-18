<script setup lang="ts">
import CheckMark from '../../../../../icons/Checkmark.vue';
import { ref } from 'vue';
import katex from 'katex';

let selectedStatus = ref(false);

// function toggle() {
//   selectedStatus = !selectedStatus;
// }

</script>
<template>
  <div class="option" :class="{ selected: selectedStatus }"
    v-on:click="(selectedStatus = !selectedStatus) && (console.log(selectedStatus))">
    <div class="option-text">
      <span v-html="katex.renderToString(`\\frac{d}{dx}(\\frac12)`)"></span>
    </div>
    <div class="option-icon">
      <CheckMark />
    </div>
  </div>
</template>
<style lang="scss" scoped>
$color-accent: 223;
$color-sat: 16%;
$blog-width: 600px;

@function primary_color($b) {
  @return hsl($color-accent, $color-sat, $b);
}

.option {
  cursor: pointer;
  color: white;
  width: 95%;
  height: 90%;
  background-color: primary_color(9%);
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .option-text {
    flex-grow: 1;
  }

  .option-icon {
    fill: primary_color(25%);
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: primary_color(10%);
    padding: 8px;
    border-radius: 7px;
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    background-color: primary_color(12%);

    .option-icon {
      fill: hsl(115, 41%, 30%);
      background-color: hsl(115, 31%, 15%);
    }
  }

  &:active {
    .option-icon {
      transform: scale(0.92);

      fill: hsl(115, 81%, 60%);
      background-color: hsl(115, 55%, 20%);
    }
  }

  &.selected {
    background-color: primary_color(13%);

    .option-icon {
      fill: hsl(115, 81%, 60%);
      background-color: hsl(115, 55%, 20%);
    }
  }
}
</style>