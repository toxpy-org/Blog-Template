<template>
  <div class="options">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
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