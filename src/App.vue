<template>
  <Header :isVisible="isHeaderVisible" />
  <router-view @toggleFooterNav="toggleFooterNav"></router-view>
  <FooterNav :isVisible="isFooterNavVisible" />
</template>

<script>
import Header from './components/Header.vue'
import FooterNav from './components/FooterNav.vue'
import { ref } from '@vue/reactivity'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'App',
  components: {
    Header,
    FooterNav
  },
  setup() {
    // define boolean and function for FooterNav
    const isFooterNavVisible = ref(true)
    function toggleFooterNav(isVisible) {
      isFooterNavVisible.value = isVisible
    }

    // define boolean and function for Header
    const isHeaderVisible = ref(true)
    function toggleHeader(isVisible) {
      isHeaderVisible.value = isVisible
    }

    // toggle FooterNav and Header on certain routes
    const route = useRoute()
    watch(
      () => route.name,
      () => {
        toggleHeader(route.name !== 'Play')
        if (route.name === 'Play' || route.name === 'Practice') {
          toggleFooterNav(false)
        } else {
          toggleFooterNav(true)
        }
      }
    )

    return { toggleFooterNav, isFooterNavVisible, isHeaderVisible }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/index.scss';
</style>
