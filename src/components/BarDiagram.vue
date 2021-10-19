<template>
  <div class="Bar-diagram">
    <ul class="bars">
      <li
        class="bar"
        v-for="(bar, i) in levels"
        :key="i"
        :style="{
          height: barHeights[i]
        }"
      >
        <span class="value">{{ Math.round(bar) }}%</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  name: 'BarDiagram',
  props: {
    levels: Array
  },
  setup(props) {
    // defining the height of the bars
    const barHeights = computed(() => {
      const barValues = []
      const minHeight = 30
      const maxHeight = 100
      let highestValue = 0
      let lowestValue = 100
      props.levels.forEach(level => {
        if (highestValue < level) highestValue = level
        if (lowestValue > level) lowestValue = level
      })

      props.levels.forEach(level => {
        barValues.push(
          getPercentageOfNumberBetweenTwoNumbers(
            lowestValue,
            highestValue,
            level
          ) *
            (maxHeight - minHeight) +
            minHeight +
            '%'
        )
      })
      return barValues
    })

    function getPercentageOfNumberBetweenTwoNumbers(min, max, number) {
      return (number - min) / (max - min)
    }
    return { barHeights }
  }
}
</script>

<style lang="scss">
.Bar-diagram {
  margin-top: 50px;

  .bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 100px;

    .bar {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 15px 0;
      height: 30%;

      @for $i from 1 through length($color-list-modules) {
        &:nth-of-type(#{$i}) {
          background: nth($color-list-modules, $i);
        }
      }
      .value {
        @include text-style(regular, regular, 0px);
        color: $color-white;
      }
    }
  }
}
</style>
