<template>
  <div class="Accordeon" :class="{ hidden: !isVisible }">
    <div class="header" @click="toggleContent()" v-if="headerVisible">
      <slot name="header"></slot>
      <div class="switch" :style="{ '--arrow-size': arrowSize + 'px' }"></div>
    </div>
    <div class="content" v-if="isVisible">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'Accordeon',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    arrowSize: {
      type: Number,
      default: 7
    },
    headerVisible: {
      type: Boolean,
      default: true
    },
    forceVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // handle Visibility of Content
    const isVisible = ref(props.visible)

    function toggleContent() {
      isVisible.value = !isVisible.value
    }

    // force accordeon to open (for search f. e.)
    watch(
      () => props.forceVisible,
      () => {
        if (props.forceVisible) {
          isVisible.value = ref(true)
        } else {
          isVisible.value = ref(props.visible)
        }
      }
    )

    return { isVisible, toggleContent }
  }
}
</script>

<style lang="scss">
.Accordeon {
  margin-top: 30px;

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 3px; //optical alingment

    h3 {
      opacity: 1;
      transition: opacity $transition-slow;
    }

    .switch {
      @include arrow(var(--arrow-size), 2px, $color-primary, 225deg);
      transform-origin: center center;
      margin-left: auto;
      margin-bottom: 5px; // optical alingment
      transition: transform $transition-normal;
    }
  }

  &.hidden {
    .header {
      h3 {
        opacity: 0.9;
      }
      .switch {
        transform: rotate(45deg) !important;
      }
    }
  }
}
</style>
