<template>
  <section class="page" id="List" v-if="userData">
    <h2>Alle Buchungssätze</h2>
    <Search
      :text="{
        hint: 'Suche Buchungssätze nach Namen und Konten',
        placeholder: 'z. B. Import...'
      }"
      v-model="searchInput"
    />

    <div class="topics">
      <Accordeon
        class="topic"
        v-for="(topic, t) in userData.topics"
        :key="t"
        :headerVisible="searchInput == ''"
        :forceVisible="searchInput == ''"
      >
        <template v-slot:header>
          <h3>{{ topic.name }}</h3>
        </template>

        <template v-slot:content>
          <record-card
            v-for="(record, r) in filterRecords(topic.records, searchInput)"
            :key="r"
            :record="record"
            :accounts="userData.accounts"
          />
        </template>
      </Accordeon>
    </div>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import { userData } from '../assets/js/data'
import Search from '../components/Search'
import RecordCard from '../components/RecordCard'
import Accordeon from '../components/Accordeon'
export default {
  name: 'List',
  components: {
    Search,
    RecordCard,
    Accordeon
  },
  setup() {
    // handle Search Input
    const searchInput = ref('')

    function filterRecords(records, searchTerm) {
      return records.filter(record => {
        return record.info.name
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase())
      })
    }

    return {
      userData,
      searchInput,
      filterRecords
    }
  }
}
</script>

<style lang="scss">
#List {
  padding-bottom: $whitespace-scroll;

  .topics {
    margin-top: 20px;
  }
}
</style>
