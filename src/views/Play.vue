<template>
  <section id="Play" class="page scroll-fade" v-if="userData">
    <router-link class="back" to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4.975"
        height="7.95"
        viewBox="0 0 4.975 7.95"
      >
        <path
          id="Pfad_27"
          data-name="Pfad 27"
          d="M0,0,2.561,2.561,0,5.122"
          transform="translate(3.561 6.536) rotate(-180)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </router-link>

    <h2>Übungsmodus</h2>

    <Search
      :text="{
        hint: 'Suche nach Themen',
        placeholder: 'z. B. laufende Geschäftsfälle...'
      }"
      v-model="searchInput"
    />

    <div v-show="searchInput == ''" class="indicate-horizontal-scroll">
      <h3>Üben nach Modulen</h3>
      <div class="horizontal-scroll-indicator"></div>
    </div>

    <div class="modul-list" v-show="searchInput == ''">
      <router-link
        class="modul"
        v-for="(modulee, m) in userData.levels"
        :key="m"
        :to="{ name: 'Practice', params: { id: `m${m + 1}` } }"
      >
        <span class="modul-heading"> Modul {{ m + 1 }} </span>

        <div
          class="bar"
          :style="{
            height: barHeights[m]
          }"
        >
          <span class="percentage">{{ Math.round(modulee) }}%</span>
        </div>
      </router-link>
    </div>

    <h3 v-show="searchInput == ''">Üben nach Themengebieten</h3>

    <div class="topics">
      <Accordeon
        class="topic"
        v-for="(topic, t) in topics"
        :key="t"
        :visible="false"
      >
        <template v-slot:header>
          <router-link
            :to="{ name: 'Practice', params: { id: `t${t}` } }"
            class="name"
          >
            {{ topic.name }}
          </router-link>
          <span class="amount">{{ topic.amount }}</span>
          <span class="percentage">{{ topic.percentage }}%</span>
        </template>

        <template v-slot:content>
          <ul class="records">
            <li class="record" v-for="record in topic.records" :key="record">
              {{ record }}
            </li>
          </ul>
        </template>
      </Accordeon>
    </div>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import Search from '../components/Search.vue'
import { userData } from '../assets/js/data'
import { computed, onMounted } from '@vue/runtime-core'
import Accordeon from '../components/Accordeon'
import gsap from 'gsap/all'
export default {
  name: 'Play',
  components: {
    Search,
    Accordeon
  },
  setup() {
    // Loading Animation
    onMounted(() => {
      const selectors = [
        'h2',
        '.Search label',
        '.Search .input-container',
        '.indicate-horizontal-scroll',
        '.modul:nth-of-type(-n+3)',
        'h3',
        '.topic:nth-of-type(-n+6)'
      ]
      const loadingAnimation = gsap.timeline({
        defaults: { ease: 'power2.out' }
      })
      loadingAnimation
        .from(selectors, {
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          y: +40
        })
        .from('.indicate-horizontal-scroll .horizontal-scroll-indicator', {
          opacity: 0,
          duration: 1
        })
    })

    // handles Search
    const searchInput = ref('')

    // calculates barHeights for scrollable section cards
    const barHeights = computed(() => {
      const barValues = []
      const minHeight = 30
      const maxHeight = 100
      let highestValue = 0
      let lowestValue = 100
      userData.value.levels.forEach(level => {
        if (highestValue < level) highestValue = level
        if (lowestValue > level) lowestValue = level
      })

      userData.value.levels.forEach((level, i) => {
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

    // provides array of topics ready for use in template
    const topics = computed(() => {
      const topicList = []

      userData.value.topics.forEach(topic => {
        const records = []
        const levels = []

        topic.records.forEach(record => {
          records.push(record.info.name)
          levels.push(record.level)
        })

        if (
          topic.name
            .toLowerCase()
            .startsWith(searchInput.value.toLowerCase()) ||
          searchInput.value === ''
        ) {
          topicList.push({
            name: topic.name,
            amount: topic.records.length,
            percentage: getLevelPercentage(levels),
            records: records
          })
        }
      })
      return topicList
    })

    // Helper functions
    function getPercentageOfNumberBetweenTwoNumbers(min, max, number) {
      return (number - min) / (max - min)
    }

    function invertPercentage(percentage) {
      return 100 - percentage
    }

    function getLevelPercentage(levels) {
      const sum = levels.reduce((a, b) => a + b, 0)
      const recordAmount = levels.length
      const average = sum / recordAmount
      const percentage = (average - 1) * 25
      return invertPercentage(percentage)
    }

    return {
      userData,
      searchInput,
      barHeights,
      topics
    }
  }
}
</script>

<style lang="scss">
#Play {
  background-color: $color-primary;
  margin-top: 0;
  min-height: 100vh;
  padding-top: 30px;
  color: $color-white;

  &::after {
    background: linear-gradient(
      to top,
      rgba($color-primary, 0.8),
      rgba($color-primary, 0)
    );
  }

  .back {
    all: unset;
    $size: 15px;
    width: $size;
    height: $size;
    border-radius: 50%;
    background: $color-white;
    display: grid;
    place-items: center;

    svg {
      stroke: $color-primary;
      transform: translateX(-1px);
    }
  }

  h2 {
    margin-top: 25px;
  }

  h3 {
    margin-top: 50px;
  }

  .Search {
    .search-input {
      color: $color-dark;
    }
  }

  .indicate-horizontal-scroll {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;

    h3 {
      margin-top: 0;
    }

    .horizontal-scroll-indicator {
      @include arrow(7px, 2px, $color-white, -45deg);
    }
  }

  .modul-list {
    // making the container higher in order to avoid problems with the animation (y-overflow stays hidden)
    $animation-y-distance: 40px;
    $card-height: 150px;
    height: $card-height + $animation-y-distance;
    margin: 30px -#{$whitespace} -#{$animation-y-distance};
    padding: 0 $whitespace;
    display: flex;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .modul {
      height: $card-height;
      width: 140px;
      border-radius: 6px;
      background-color: $color-white;
      text-align: center;
      padding: 20px 15px 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 0;

      &:not(:last-of-type) {
        margin-right: $whitespace;
      }

      .modul-heading {
        @include text-style(small, medium, 18px);
        color: $color-dark;
      }

      .bar {
        border-radius: inherit;
        width: 100%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      @for $i from 1 through length($color-list-modules) {
        &:nth-of-type(#{$i}) .bar {
          background: nth($color-list-modules, $i);
        }

        .percentage {
          @include text-style(regular, regular, 1);
          padding-bottom: 10px;
        }
      }
    }
  }

  .topics {
    .topic {
      @include text-style(small, regular, 18px);
      margin-top: 25px;

      .header {
        .name {
          @include text-style(regular, regular, 23px);
          width: 65%;
        }

        .amount {
          opacity: 0.5;
          text-align: right;
          width: 20px;
        }

        .percentage {
          margin-left: auto;
        }

        .switch {
          border-bottom-color: $color-white;
          border-right-color: $color-white;
        }
      }

      .records {
        margin-top: 7px;

        .record {
          @include text-style(small, regular, 18px);
          opacity: 0.6;
          margin-top: 7px;
        }
      }
    }
  }
}
</style>
