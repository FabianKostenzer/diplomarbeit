<template>
  <section id="Stats" class="page scroll-fade" v-if="userData">
    <h2>Dein Lernfortschritt</h2>
    <circle-diagram
      :user="{
        skill: userData.skill,
        levels: userData.levels
      }"
    />

    <bar-diagram :levels="userData.levels" />

    <div class="modules">
      <Accordeon
        v-for="(modul, m) in modules"
        :key="m"
        class="module"
        :headerVisible="modul.length > 0"
      >
        <template v-slot:header>
          <h3>Modul {{ m + 1 }}</h3>
        </template>

        <template v-slot:content>
          <div class="topics">
            <Accordeon
              class="topic"
              v-for="(topic, t) in modul"
              :key="t"
              :visible="false"
              :arrowSize="6"
            >
              <template v-slot:header>
                <span class="name">{{ topic.name }}</span>
                <span class="amount">{{ topic.amount }}</span>
                <span class="percentage">{{ topic.percentage }}%</span>
              </template>

              <template v-slot:content>
                <ul class="records">
                  <li
                    class="record"
                    v-for="record in topic.records"
                    :key="record"
                  >
                    {{ record }}
                  </li>
                </ul>
              </template>
            </Accordeon>
          </div>
        </template>
      </Accordeon>
    </div>
  </section>
</template>

<script>
import { userData } from '../assets/js/data'
import CircleDiagram from '../components/CircleDiagram'
import BarDiagram from '../components/BarDiagram'
import Accordeon from '../components/Accordeon'
import { computed } from '@vue/runtime-core'
export default {
  name: 'Stats',
  components: {
    'circle-diagram': CircleDiagram,
    'bar-diagram': BarDiagram,
    Accordeon
  },
  setup() {
    // defines modules
    const modules = computed(() => {
      const amountOfModules = userData.value.levels.length
      const moduleList = []

      for (let m = 0; m < amountOfModules; m++) {
        const currentTopics = []

        userData.value.topics.forEach(topic => {
          const currentRecords = []

          topic.records.forEach(record => {
            if (record.level - 1 === m) {
              currentRecords.push(record.info.name)
            }
          })

          if (currentRecords.length) {
            currentTopics.push({
              name: topic.name,
              amount: currentRecords.length + '/' + topic.records.length,
              percentage: (currentRecords.length / topic.records.length) * 100,
              records: currentRecords
            })
          }
        })
        moduleList[m] = currentTopics
      }

      return moduleList
    })

    return {
      userData,
      modules
    }
  }
}
</script>

<style lang="scss">
#Stats {
  padding-bottom: $whitespace-scroll;

  .modules {
    padding-top: 20px;

    .module {
      .topics {
        .topic {
          @include text-style(small, regular, 18px);
          margin-top: 26px;

          .header {
            .name {
              @include text-style(regular, regular, 23px);
              width: 65%;
            }

            .amount {
              opacity: 0.6;
              text-align: right;
              width: 20px;
            }

            .percentage {
              margin-left: auto;
            }
          }

          .records {
            padding-top: 7px;

            .record {
              opacity: 0.6;
              margin-top: 7px;
            }
          }
        }
      }
    }
  }
}
</style>
