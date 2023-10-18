<script setup lang="ts">
import { onMounted } from "vue";
import * as Desmos from 'desmos';

interface Props {
  calculator: any;
  domain: [number, number],
  range: [number, number]
}

const props = defineProps<Props>();

onMounted(() => {
  var elt = document.getElementById('calculator');
  var calculator = Desmos.GraphingCalculator(elt, {
    "backgroundColor": "red"
  });

  calculator.graphSettings.settingsMenu = false;

  calculator.updateSettings({
    backgroundColor: "#13151b",
    textColor: "#fff",
    settingsMenu: false,
    expressions: false,
    keypad: false,
    // zoomButtons: false,
    // lockViewport: true,
    showGrid: true,
    border: "#00f",
    lineColor: "#00f"
  });

  calculator.setMathBounds({
    left: props.range[0],
    right: props.range[1],
    bottom: props.domain[0],
    top: props.domain[1]
  });

  props.calculator.calc = calculator;
  // props.cb.getCalc = () => calculator;
})

</script>
<template>
  <div id="calculator" style="width: 600px; height: 400px;"></div>
</template>

<style lang="scss">
#calculator {
  border: none;
}

.dcg-container {
  border: 2px solid hsl(225, 17%, 20%) !important;
  border-radius: 10px;
}

.dcg-label {
  background-color: hsl(225, 17%, 5%) !important;
  border: none !important;
  text-shadow: none !important;
}
</style>