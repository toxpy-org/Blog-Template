<script setup lang="ts">
import Desmos from "../included/components/math/graphing/desmos.vue";
import { onMounted, ref } from 'vue';

const Calculator = ref<{ calc: any }>({ calc: null });

function f(x1: number) {
  return Math.sin(x1)
}

function dxdy(x1: number) {
  return Math.cos(x1)
}

onMounted(() => {
  let calc = Calculator.value.calc;

  calc.setExpression({ id: 'graph1', latex: '\\sin x', color: "#f00" });

  let xdata = [0];
  let ydata = [f(xdata[0] as number)];

  let h = 0.5;

  setInterval(() => {
    for (let i = 0; i < 2; i++) {
      let xn = xdata[xdata.length - 1] as number;
      let yn = ydata[ydata.length - 1] as number;

      ydata.push(yn + h * dxdy(xn));
      xdata.push(xn + h);
    }

    calc.setExpression({
      id: "1",
      latex: `x_{1}=\\left[${xdata.toString()}\\right]`
    });

    calc.setExpression({
      id: "2",
      latex: `y_{1}=\\left[${ydata.toString()}\\right]`
    });

    calc.setExpression({
      id: "3",
      latex: `\\left(x_1, y_1\\right)`,
      lines: true
    });
  }, 500)
})

</script>

<template>
  <Desmos :calculator="Calculator" :range="[-5, 25]" :domain="[-10, 25]" />
</template>

