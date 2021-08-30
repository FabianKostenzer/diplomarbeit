<template>
  <transition name="fadeHeader">
    <header v-if="isVisible" class="Header">
      <span class="logo">Lernapp</span>
      <Navigation />
    </header>
  </transition>
</template>

<script>
import Navigation from './Navigation.vue'
export default {
  name: 'Header',
  components: {
    Navigation
  },
  props: {
    isVisible: Boolean
  }
}
</script>

<style lang="scss">
.fadeHeader-enter-active,
.fadeHeader-leave-active {
  transition: transform $transition-normal;
}

.fadeHeader-enter-from,
.fadeHeader-leave-to {
  transform: translateY(-100%);
}

.fadeHeader-enter-to,
.fadeHeader-leave-from {
  transform: translateY(0);
}

.Header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 40px;
  background: $color-primary;
  padding: 0 $whitespace;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  color: $color-white;

  .logo {
    @include text-style(small, bold, 18px);
  }
}
</style>
