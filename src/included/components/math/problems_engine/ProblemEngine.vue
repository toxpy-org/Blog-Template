
<!-- The problem engine for Math equations -->
<script setup lang="tsx">
import { ref, h, onMounted } from 'vue';
import katex from 'katex';
import OptionSelector from './options/radio/OptionSelector.vue';

const questions: QuestionSINF[] = [
  {
    question: "what is 1 + 1?",
    answer_index: 2,
    answers: [
      katex.renderToString("\\frac12"),
      katex.renderToString("\\frac23"),
      katex.renderToString("\\frac42"),
      katex.renderToString("\\frac92"),
    ]
  },
  {
    question: "what is 2 + 2?",
    answer_index: 2,
    answers: [
      katex.renderToString("3\\frac12"),
      katex.renderToString("2\\frac23"),
      katex.renderToString("1\\frac41"),
      katex.renderToString("4\\frac92"),
    ]
  },
  {
    question: "what is ewqewqe * 312?",
    answer_index: 3,
    answers: [
      katex.renderToString("1290382"),
      katex.renderToString("111"),
      katex.renderToString("293"),
      katex.renderToString("123"),
    ]
  },
  {
    question: "what is dwqe + fdsf?",
    answer_index: 2,
    answers: [
      katex.renderToString("213"),
      katex.renderToString("340"),
      katex.renderToString("fsd"),
      katex.renderToString("sda"),
    ]
  },
  {
    question: "what is 1230 + 123?",
    answer_index: 2,
    answers: [
      katex.renderToString("asdas"),
      katex.renderToString("weewr"),
      katex.renderToString("fse"),
      katex.renderToString("342"),
    ]
  },
  {
    question: "what is 1dsada230 + 23?",
    answer_index: 2,
    answers: [
      katex.renderToString("213"),
      katex.renderToString("340"),
      katex.renderToString("123"),
      katex.renderToString("342"),
    ]
  },
  {
    question: "what is asda + dsdasd?",
    answer_index: 2,
    answers: [
      katex.renderToString("123"),
      katex.renderToString("12"),
      katex.renderToString("231"),
      katex.renderToString("123"),
    ]
  },
  {
    question: "what is adasd + 4324?",
    answer_index: 2,
    answers: [
      katex.renderToString("1021233"),
      katex.renderToString("123"),
      katex.renderToString("wqe"),
      katex.renderToString("dsa"),
    ]
  },
  {
    question: "what is dgfds + 12ase?",
    answer_index: 2,
    answers: [
      katex.renderToString("fdsf"),
      katex.renderToString("qwe"),
      katex.renderToString("df"),
      katex.renderToString("das"),
    ]
  },
  {
    question: "what is xcas + fgsdg?",
    answer_index: 2,
    answers: [
      katex.renderToString("213"),
      katex.renderToString("wqeq"),
      katex.renderToString("sfwwe"),
      katex.renderToString("432"),
    ]
  }

]

interface QuestionSINF {
  question: string,
  answer_index: number,
  answers: string[];
}

const states = ref({
  "p_quiz_start": false,
  "window_index": 0,
  "answered": 0,
});

const NextTimeout = ref<{ time: number | null, f: number | null }>({ f: null, time: null });

function NextFunction() {
  // if (NextTimeout.value.f == states.value.window_index)
  //   states.value.window_index++;
}

const NestedQuestions = (p: { q: QuestionSINF[], i: number, c: number }): any => {
  const q1 = p.q[p.i];
  if (!q1) return h("div", null, "No more questions!");

  let deltaI = p.i - states.value.window_index;

  return h("div",
    { class: "question" }, [
    h("div",
      { class: "q-header" },
      [h("div",
        { class: "question-num" },
        h("div",
          { class: "cover" },
          h("div",
            { class: "overflower" },
            h("div",
              {
                "onclick": () => states.value.answered > p.i && states.value.window_index == p.i ? states.value.window_index += 1 : null,
                "class": "window-next " +
                  (p.c > p.i ? "open " : "") +
                  (deltaI > 0 ? "future " : "") +
                  (deltaI == 1 ? "nearfuture " : "") +
                  (states.value.answered > p.i ? "answered" : ""), "style": `--z-index: ${100 - p.i}`
              },
              [h("div", { class: "numeric" }, p.i + 1),
              h("div", { "class": "next-page-content" },
                h(NestedQuestions, { q: p.q, i: p.i + 1, c: states.value.window_index }))])
          )
        )
      ), h("div", { class: "question-title" }, q1.question)]
    ),
    h("div", { class: "choices" },
      h(OptionSelector as any,
        {
          answer_index: q1.answer_index,
          cb: () => (states.value.answered++, (NextTimeout.value.time = setTimeout(NextFunction, 15000), NextTimeout.value.f = states.value.window_index)),
          answers: q1.answers
        }))]
  )
}


onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
      states.value.window_index += 1;
    }

    if (e.key == "ArrowLeft" && states.value.window_index > 0) {
      states.value.window_index -= 1;
    }
  })
})

</script>

<template>
  <div class="problem-engine-wrapper">
    <div class="p-content-wrapper" :class="{ p_active: states.p_quiz_start }" v-on:click="states.p_quiz_start = true">
      <span class="p-g-btn">Answer Questions</span>
      <div class="actual-content">
        <div class="question">
          <div class="q-header">
            <div class="question-num">
              <div class="cover">
                <div class="overflower">
                  <div class="window-next openable open" style="--z-index: 100;">
                    <span class="numeric" style="z-index: 100;">{{ 1 }}</span>
                    <div class="next-page-content">
                      <NestedQuestions :q="questions" :i="0" :c="states.window_index" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="displaceable-main" ref="displaceableMainElement" style="--screen: 0">
      <div class="start-screen">
        <button class="quiz-btn" :onclick="StartQuiz">Start quiz</button>
      </div>
      <div class="displaceable-questions" ref="displaceableQuestionsElement">
        <div class="question" v-for="question, i in questions">
          <div class="q-header">
            <div class="question-num">
              <div class="cover">
                <div class="overflower">
                  <div class="num">
                    {{ i }}
                  </div>
                  <div class="next">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="question-title">
              <p v-html="question.question"></p>
            </div>
          </div>
          <div class="choices">
            <OptionSelector :answer_index="question.answer_index" :answers="question.answers" />
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss">
$color-accent: 223;
$color-sat: 16%;
$blog-width: 600px;

$colorfull-acent: 120;

@function primary_color($b) {
  @return hsl($color-accent, $color-sat, $b);
}

@function color_select($b, $a) {
  @return hsl($a, $color-sat, $b);
}

.problem-engine-wrapper {
  width: 600px;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
  background-image: linear-gradient(-45deg, primary_color(8%) 15%, primary_color(10%) 55%, primary_color(8%) 90%);
  transition: all 1s;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

  .p-content-wrapper {
    background-color: hsla(214, 41%, 10%, 0.302);
    border: 1px dashed hsla(215, 41%, 35%, 0.3);
    width: 250px;
    height: 100px;
    position: relative;
    cursor: pointer;

    $pcw-top: calc(300px / 2) - calc(100px / 2);
    top: $pcw-top;
    $pcw-left: calc(600px / 2) - calc(250px / 2);
    left: $pcw-left;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    transition: all 0.8s;

    border-radius: 5px;

    .p-g-btn {
      z-index: 1;
      opacity: 1;
      transition: all 0.8s;
      font-size: 20px;
    }

    &:hover {
      width: 250px + 50px;
      height: 100px + 30px;
      border: 1px solid hsla(215, 41%, 35%, 0.3);

      top: $pcw-top - calc(30px / 2);
      left: $pcw-left - calc(50px / 2);
      background-color: hsla(215, 41%, 25%, 0.3);

      .p-g-btn {
        opacity: .6;
        transform: scale(1.1);
      }

      .actual-content {
        opacity: 0.5;
      }
    }

    &.p_active {
      width: 600px * 2;
      height: 300px * 2;
      top: -150px;
      left: -300px;

      border-radius: 50px;

      .p-g-btn {
        opacity: 0;
        transform: scale(2);
        z-index: 1;
      }

      .actual-content {
        opacity: 1;
        z-index: 2;
      }
    }

    .actual-content {
      color: white;
      transition: opacity 1s;
      position: absolute;
      width: 600px;
      height: 300px;
      background-image: linear-gradient(-45deg, primary_color(8%) 15%, primary_color(10%) 55%, primary_color(8%) 90%);
      opacity: 0;
    }

  }
}

label {
  color: white;
}

.question {
  height: 100%;
  width: 600px;
  display: flex;
  flex-direction: column;
  z-index: 3;
}

.p-content-wrapper:not(.p_active) .question {
  pointer-events: none;
}

.quiz-btn {
  padding: 20px 40px;
  background: primary_color(12%);
  color: white;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 20px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: primary_color(13%);
  }

  &:active {
    background: primary_color(15%);
  }
}

.q-header {
  height: 100px;
  display: flex;

  .question-num {
    max-width: 70px;
    flex-grow: 2;
    font-weight: 500;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;


    .cover {
      width: 40px;
      height: 30px;

      .overflower {
        width: 100%;
        height: 60px;
        flex-direction: column;

        // transform: translateY(-30px);
        transition: transform 1s ease-in-out;

        .window-next {
          border-radius: 5px;
          width: 100%;
          height: 30px;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          background-image: linear-gradient(-45deg, primary_color(8%) 15%, primary_color(10%) 55%, primary_color(8%) 90%);

          position: relative;

          color: white;
          overflow: hidden;
          transition: all 1s;
          z-index: var(--z-index);

          top: 0;
          left: 0;

          &.answered {
            background-image: linear-gradient(-45deg, hsla(200, 50%, 40%, 1) 15%, hsla(200, 75%, 45%, 1) 50%, hsla(200, 50%, 40%, 1) 90%);
            box-shadow: 0px 0px 100px 5px hsla(200, 100%, 50%, 0.4),
              0px 0px 10px 1px hsla(200, 100%, 30%, 1), inset 0px 0px 5px hsla(200, 100%, 50%, 1);
            cursor: pointer;
          }

          &.answered:not(.open):hover {
            width: 250px;
            height: 100px;
            left: -5px;
            top: -5px;
            // background-image: linear-gradient(-45deg, primary_color(8%) 15%, primary_color(10%) 55%, primary_color(8%) 90%) !important;
            background-image: linear-gradient(-45deg, hsla(200, 50%, 10%, 1) 15%, hsla(200, 75%, 15%, 1) 50%, hsla(200, 50%, 10%, 1) 90%) !important;
            box-shadow: 0px 0px 20px 3px hsla(200, 100%, 50%, 0.4),
              0px 0px 5px 1px hsla(200, 100%, 30%, 1), inset 0px 0px 5px hsla(200, 100%, 50%, 1);
            cursor: pointer;

            cursor: pointer;

            // left: calc(-15px - 600px / 2);
            // top: calc(-15px - 300px / 2);


            &>.numeric {
              opacity: 0;
            }

            .nearfuture {
              opacity: 1;
            }

            .next-page-content {
              left: 0px;
              top: 0px;
              opacity: 1;
              // left: calc(600px / 2);
              // top: calc(300px / 2);
            }
          }


          .future {
            opacity: 0;
          }


          &.open {
            width: 600px;
            height: 300px;
            left: -15px;
            top: -15px;
            cursor: default;
            background-image: linear-gradient(-45deg, primary_color(8%) 15%, primary_color(10%) 55%, primary_color(8%) 90%) !important;

            box-shadow: 0px 0px 0px 0px transparent !important;

            &>.numeric {
              opacity: 0;
            }


            .next-page-content {
              left: 0px;
              top: 0px;
              opacity: 1;
              // left: calc(600px / 2);
              // top: calc(300px / 2);
            }
          }

          .next-page-content {
            transition: all 1s, opacity 0.5s;
            z-index: calc(var(--z-index) + 1);

            left: -15px;

            position: absolute;
            width: 600px;
            height: 300px;
          }
        }

        .next {
          width: 100%;
          height: 30px;
          background-color: hsl(210, 30%, 30%);
          border-radius: 5px;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          fill: white;
          cursor: pointer;

          &:hover {
            background-color: hsl(210, 50%, 50%);
          }

          &:active {
            transform: scale(0.9);
          }
        }
      }
    }
  }


  .question-title {
    display: flex;
    align-items: center;
    font-family: 100px;
    flex-grow: 1;
    // padding: 0 35px;
  }
}

.choices {
  flex-grow: 1;
  display: flex;
}
</style>