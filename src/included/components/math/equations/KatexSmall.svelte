<script lang="ts">
  import katex from "katex";
  import { onMount } from "svelte";

  let data: HTMLSpanElement;
  export let equation: string;

  onMount(() => {
    try {
      katex.render(equation, data, {
        displayMode: false,
      });
    } catch (e) {
      console.log(e);
    }
  });
</script>

<span>aawaa</span>
<span bind:this={data} class="katex-small-container">
  <slot />
</span>

<style lang="scss">
  :global(.tag) {
    display: none;
  }

  :global(.katex-small-container) {
    display: inline;
  }

  :global(.katex-small-container span) {
    display: inline-flexbox;
  }

  :global(.katex-small-container .katex-html) {
    font-weight: 900;
  }
</style>
