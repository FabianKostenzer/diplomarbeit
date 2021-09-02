<template>
  <nav class="Navigation" ref="navigation">
    <div @click="toggleNav()" class="open-nav">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="7"
        viewBox="0 0 17 7"
      >
        <g id="Gruppe_1" data-name="Gruppe 1" transform="translate(1 0.867)">
          <line
            id="Linie_1"
            data-name="Linie 1"
            x2="15"
            transform="translate(0 0.133)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="2"
          />
          <line
            id="Linie_2"
            data-name="Linie 2"
            x2="6"
            transform="translate(9 5.133)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="2"
          />
        </g>
      </svg>
    </div>

    <div ref="navContainer" class="nav-container">
      <div @click="toggleNav()" ref="closeNav" class="close-nav">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.435"
          height="13.435"
          viewBox="0 0 13.435 13.435"
        >
          <g
            id="Gruppe_82"
            data-name="Gruppe 82"
            transform="translate(-318.086 -29.086)"
          >
            <line
              id="Linie_20"
              data-name="Linie 20"
              x2="15"
              transform="translate(319.5 30.5) rotate(45)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-width="2"
            />
            <line
              id="Linie_21"
              data-name="Linie 21"
              x2="15"
              transform="translate(319.5 41.107) rotate(-45)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-width="2"
            />
          </g>
        </svg>
      </div>

      <ul class="main-nav-list">
        <li :ref="el => navItems.push(el)">
          <router-link class="nav-link" to="/" @click="toggleNav()">
            Dashboard
          </router-link>
        </li>

        <li :ref="el => navItems.push(el)">
          <router-link class="nav-link" to="/stats" @click="toggleNav()">
            Statistiken
          </router-link>
        </li>

        <li :ref="el => navItems.push(el)">
          <router-link class="nav-link" to="/play" @click="toggleNav()">
            Üben
          </router-link>
        </li>

        <li :ref="el => navItems.push(el)">
          <router-link class="nav-link" to="/list" @click="toggleNav()">
            Buchungssätze
          </router-link>
        </li>

        <li :ref="el => navItems.push(el)">
          <router-link class="nav-link" to="/settings" @click="toggleNav()">
            Kontenplan
          </router-link>
        </li>
      </ul>

      <ul class="second-nav-list">
        <div class="line" ref="secondListLine"></div>

        <li :ref="el => navItems.push(el)">
          <router-link class="nav-link" to="/faq" @click="toggleNav()">
            FAQ
          </router-link>
        </li>

        <li :ref="el => navItems.push(el)">
          <router-link class="nav-link" to="/impressum" @click="toggleNav()">
            Impressum
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from '@vue/reactivity'
import { gsap } from 'gsap'
import { onMounted, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
  name: 'Navigation',
  setup() {
    // defining Elements
    const navItems = ref([])
    const navContainer = ref(null)
    const closeNav = ref(null)
    const secondListLine = ref(null)

    // creating Animation
    const navAnimation = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out' }
    })

    // defining Animation
    onMounted(() => {
      const navLinks = navItems.value.map(item => item.children[0])
      navAnimation
        .from(navContainer.value, {
          transform: 'translateX(100%)',
          duration: 0.6
        })
        .from(
          navLinks,
          {
            stagger: 0.1,
            transform: 'translateY(+40px)',
            opacity: 0,
            duration: 0.5
          },
          '-=0.1'
        )
        .from(
          closeNav.value,
          {
            opacity: 0,
            duration: 0.3
          },
          '-=0.3'
        )
        .from(
          secondListLine.value,
          {
            opacity: 0,
            duration: 0.3
          },
          '-=0.3'
        )
    })

    // toggle Nav with Animation
    let navigationOpened = false
    function toggleNav() {
      if (!navigationOpened) {
        navAnimation.play()
      } else {
        navAnimation.reverse()
      }
      navigationOpened = !navigationOpened
    }

    // hide Nav on Login
    const navigation = ref(null)
    const route = useRoute()
    watch(
      () => route.name,
      () => {
        if (route.name === 'Login' || route.name === 'Register') {
          navigation.value.classList.add('hidden')
        } else {
          navigation.value.classList.remove('hidden')
        }
      }
    )

    return {
      toggleNav,
      navItems,
      secondListLine,
      navContainer,
      closeNav,
      navigation
    }
  }
}
</script>

<style lang="scss">
.Navigation {
  &.hidden {
    display: none !important;
  }
  .nav-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(70%, 300px);
    background: $color-dark;
    z-index: 999;
    text-align: right;
    padding: 25px 45px 40px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      li {
        .nav-link {
          display: inline-block;
        }
      }
    }

    .main-nav-list {
      height: 35%;
      margin-bottom: 25vw;

      .nav-link {
        @include text-style(regular, bold, 23px);
      }
    }

    .second-nav-list {
      height: 12%;
      width: fit-content;

      .line {
        display: block;
        width: 100%;
        height: 1px;
        background-color: $color-white;
        opacity: 0.5;
      }

      li {
        .nav-link {
          @include text-style(small, medium, 18px);
        }
      }
    }
  }
}
</style>
