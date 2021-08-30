<template>
  <div class="Circle-diagram">
    <div class="circle-container">
      <div class="circle" :style="circleStyle">
        <span class="skill"> {{ user.skill }}<small>%</small></span>
        <div
          class="divider"
          v-for="i in levels.length"
          :key="i"
          :style="dividerStyle[i]"
        ></div>
      </div>
    </div>
    <ul class="legend">
      <li v-for="i in levels.length" :key="i">
        <div class="dot"></div>
        <span class="module">
          <span class="low-contrast">Modul </span>{{ i }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
export default {
  name: 'CircleDiagram',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // saving the levels in a single ref
    const levels = ref(props.user.levels)

    // defining the CSS-Variables for the Circle
    const circleStyle = computed(() => {
      const style = {}
      for (let i = 0; i < levels.value.length; i++) {
        style[`--module-${i + 1}`] = levels.value[i] + '%'
      }
      return style
    })

    // defining the CSS-Styles for the lines between circle-segments
    const dividerStyle = computed(() => {
      const rotateValues = []
      levels.value.forEach((_, i) => {
        rotateValues.push({
          transform:
            'rotate(' + 3.6 * getArraySumUpToIndex(levels.value, i) + 'deg)'
        })
      })
      return rotateValues
    })

    // Helper Functions
    function getArraySumUpToIndex(arr, index) {
      let sum = 0
      for (let i = 0; i < index; i++) {
        sum += arr[i]
      }
      return sum
    }

    return { circleStyle, levels, dividerStyle }
  }
}
</script>

<style lang="scss">
.Circle-diagram {
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  margin-top: 35px;

  .circle-container {
    flex-grow: 1;
    justify-self: stretch;
    $max-size: 250px;
    max-height: $max-size;
    max-width: $max-size;

    .circle {
      --m-1: var(--module-1);
      @for $i from 2 through length($color-list-modules) {
        --m-#{$i}: calc(var(--module-#{$i}) + var(--m-#{$i - 1}));
      }

      border-radius: 50%;
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      background: conic-gradient(
        nth($color-list-modules, 1) 0%,
        nth($color-list-modules, 1) var(--m-1),
        nth($color-list-modules, 2) var(--m-1),
        nth($color-list-modules, 2) var(--m-2),
        nth($color-list-modules, 3) var(--m-2),
        nth($color-list-modules, 3) var(--m-3),
        nth($color-list-modules, 4) var(--m-3),
        nth($color-list-modules, 4) var(--m-4),
        nth($color-list-modules, 5) var(--m-4),
        nth($color-list-modules, 5) var(--m-5)
      );

      .divider {
        --width: 2px;
        position: absolute;
        left: calc(50% - var(--width) / 2);
        top: 0;
        height: 50%;
        width: var(--width);
        background: $color-white;
        transform-origin: bottom;
      }

      &::after {
        content: '';
        position: absolute;
        $inset: 8%;
        left: $inset;
        top: $inset;
        right: $inset;
        bottom: $inset;
        background: $color-white;
        border-radius: 50%;
      }

      .skill {
        @include text-style(huge, bold, 69px);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;

        small {
          @include text-style(big, regular, 29px);
        }
      }
    }
  }

  .legend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px 0;
    margin-left: 30px;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .dot {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-right: 8px;
        background: $color-dark; // fallback
      }

      @for $i from 1 through length($color-list-modules) {
        &:nth-of-type(#{$i}) {
          .dot {
            background: nth($color-list-modules, $i);
          }
        }
      }

      .module {
        @include text-style(small, medium, 18px);

        .low-contrast {
          opacity: 0.5;
          font-weight: font-weight(regular);
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
