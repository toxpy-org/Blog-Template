<script setup lang="ts">
import { ref } from 'vue';

export interface Props {
  id: number,
  qref: { selected: number | null, answer_given: boolean };
  answer_index: number;
  html: string;
  cb: () => void
}


const element = ref<HTMLDivElement>(null as any);

const props = defineProps<Props>();

const holding = ref<Date | null>(null);

const answeredCorrectly = ref<null | boolean>(null);

function checkQuestion() {
  answeredCorrectly.value = props.id == props.answer_index;
  props.qref.answer_given = true;
  props.cb();
}

function finished() {
  return props.qref.answer_given == true;
}

function selectOption() {
  if (finished()) return;
  if (props.qref.answer_given == true) return;
  if (holding.value == null) return;
  if (answeredCorrectly.value != null) return

  if (props.qref.selected != props.id) {
    props.qref.selected = props.id;
  }
}

function sendOption() {
  if (finished()) return;
  if (holding.value == null) return;
  let deltaT = (new Date() as any) - (holding.value as any);
  if (answeredCorrectly.value != null) return

  if (props.qref.selected == null && deltaT < 200) props.qref.selected = null;

  if (deltaT > 600) {
    checkQuestion();
  }
}

setInterval(() => {
  if (finished() && answeredCorrectly.value == null) {
    answeredCorrectly.value = props.id == props.answer_index;
  }

  if (finished()) return;
  if (holding.value == null) return;
  if (answeredCorrectly.value != null) return;

  let deltaT = (new Date() as any) - (holding.value as any);

  if (deltaT > 800) {
    checkQuestion()
  }
})
</script>

<template>
  <div class="option" v-on:mouseover="" v-on:mouseup="(sendOption(), holding = null)" ref="element"
    v-on:mousedown="(holding = new Date(), selectOption())"
    :class="{ selected: (qref.selected == id && answeredCorrectly == null), right: (answeredCorrectly == true), wrong: (answeredCorrectly == false) }">
    <div class="option-text">
      <span v-html="html"></span>
    </div>
    <div class="option-icon">
      <div class="circle-icon"></div>
    </div>
    <div class="ripple"></div>
  </div>
</template>

<style scoped lang="scss">
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
  overflow: hidden;
  position: relative;
  text-align: left;

  font-size: 20px;

  .ripple {
    transition: transform 1s ease-in-out, opacity 0.5s ease-in-out;
    position: absolute;
    background-color: hsla(215, 41%, 25%, 0.3);
    width: 20px;
    height: 20px;
    transform: translateX(206px);
    border-radius: 100%;
    opacity: 0;
    z-index: 2;
  }

  &::before {
    content: '';
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: absolute;
    left: 0px;
    top: 0px;
    // background: red;
    border-radius: 5px;
    border: 1px dashed primary_color(15%);
    transition: all 0.6s ease-in-out;
  }

  &.right, &.wrong {
    cursor: default;
    background-color: primary_color(9%) !important;
  }

  &.right {
    .ripple {
      opacity: 1;
      transform: translateX(206px) scale(100) !important;
      background-color: hsla(150, 41%, 25%, 0.3);
    }

    .option-icon {
      // transition: all 0s;
      border: 1px solid primary_color(20%);

      opacity: 0.8;
      background-color: hsla(150, 50%, 55%, 0.5) !important;
      border-radius: 100%;

      .circle-icon {
        transition: all 0s;
        background-color: hsl(150, 50%, 50%) !important;
        opacity: 1;
      }
    }

  }

  &.wrong {
    .ripple {
      opacity: 1;
      transform: translateX(206px) scale(100) !important;
      background-color: hsla(0, 41%, 25%, 0.3);
    }

    .option-icon {
      // transition: all 0s;
      border: 1px solid primary_color(20%);

      opacity: 0.8;
      background-color: hsla(0, 50%, 55%, 0.5) !important;
      border-radius: 100%;

      .circle-icon {
        transition: all 0s;
        background-color: hsl(0, 50%, 50%) !important;
        opacity: 1;
      }
    }
  }


  .option-text {
    flex-grow: 1;
  }

  .option-icon {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.4;
    z-index: 3;

    border: 1px dashed primary_color(30%);

    transition: all 0.6s ease-in-out;

    .circle-icon {
      width: 18px;
      height: 18px;
      background-color: primary_color(15%);
      opacity: 0;
      border-radius: 100%;
      transition: opacity 0.2s ease-in-out;
      transition-delay: 0.2s;
    }
  }

  &:hover {
    background-color: primary_color(11%);

    &::before {
      border: 1px solid primary_color(20%);
    }

    .option-icon {
      border-radius: 15px;
      transform: rotateZ(45deg);
      opacity: 1;

      .circle-icon {
        opacity: 1;
      }
    }
  }

  &.selected {
    background-color: hsla(215, 41%, 25%, 0.3);

    &::before {
      border: 1px solid primary_color(20%);
    }

    .option-icon {
      // transition: all 0s;
      border: 1px solid primary_color(20%);

      opacity: 0.8;
      background-color: hsla(215, 50%, 55%, 0.5);
      border-radius: 100%;

      .circle-icon {
        transition: all 0s;
        background-color: hsl(215, 50%, 50%);
        opacity: 1;
      }
    }
  }


  &:active {

    .ripple {
      opacity: 1;
      z-index: 2;
      transform: translateX(206px) scale(15);
    }
  }

}
</style>