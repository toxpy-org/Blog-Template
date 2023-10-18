<script lang="ts">
  import katex from "katex";
  import { onMount } from "svelte";

  let data: HTMLDivElement;
  export let equation: string;

  onMount(() => {
    try {
      katex.render(equation, data, {
        displayMode: true,
      });
    } catch (e) {
      console.log(e);
    }
  });
</script>

<div bind:this={data} class="katex-container center">
  <slot />
</div>

<style lang="scss">
  :global(.katex-container > span) {
    font-size: 20px !important;
  }

  :global(.tag) {
    display: none;
  }
</style>
