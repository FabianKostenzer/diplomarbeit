<template>
  <section class="page scroll-fade" id="Practice" v-if="records.length">
    <div id="input" v-if="!finished">
      <div class="input-area">
        <div class="headline">
          <router-link to="/play" class="back"></router-link>
          <h2>{{ heading }}</h2>
          <div class="pagination">
            {{ currentRecord + 1 }}/{{ records.length }}
          </div>
        </div>

        <div class="challenges">
          <div
            class="challenge"
            v-for="(record, r) in records"
            :key="r"
            v-show="currentRecord == r"
          >
            <p class="question">{{ record.question }}</p>

            <div class="record-input">
              <div class="soll">
                <div
                  class="account"
                  v-for="s in 4"
                  :key="s"
                  v-show="amountOfInputFields[r] >= s"
                >
                  <input
                    type="number"
                    class="number"
                    :name="'soll' + s"
                    :id="'soll' + s"
                    placeholder=" "
                    v-model="accountNumberInputs[r][0][s - 1]"
                  />
                  <span class="name"
                    >{{
                      getAccountNameByNumber(accountNumberInputs[r][0][s - 1])
                    }}
                  </span>
                </div>
              </div>

              <div class="haben">
                <div
                  class="account"
                  v-for="h in 4"
                  :key="h"
                  v-show="amountOfInputFields[r] >= h"
                >
                  <input
                    type="number"
                    class="number"
                    :name="'haben' + h"
                    :id="'haben' + h"
                    placeholder=" "
                    v-model="accountNumberInputs[r][1][h - 1]"
                  />
                  <span class="name">{{
                    getAccountNameByNumber(accountNumberInputs[r][1][h - 1])
                  }}</span>
                </div>
              </div>
            </div>

            <div class="buttons">
              <div @click="onMinusClick(r)" class="button minus">-</div>
              <div @click="onPlusClick(r)" class="button plus">+</div>
            </div>
          </div>
        </div>

        <div class="navigation">
          <div
            class="button previous"
            @click="onPreviousClick"
            :class="{ disabled: currentRecord == 0 }"
            v-if="records.length > 1"
          >
            <div class="arrow"></div>
            Vorheriger
          </div>

          <div
            class="button next"
            @click="onNextClick"
            v-if="currentRecord + 1 < records.length"
          >
            Nächster
            <div class="arrow"></div>
          </div>

          <div class="button next" @click="onDoneClick" v-else>
            Fertig
          </div>
        </div>
      </div>

      <div class="list">
        <h2>Dein Kontenplan</h2>

        <Search
          :text="{
            placeholder: 'z. B. Anlagen im Bau...'
          }"
          v-model="searchInput"
        />

        <div class="accounts">
          <div
            class="account"
            v-for="account in getFilteredAccounts(accounts)"
            :key="account.id"
          >
            <div class="number">{{ account.number }}</div>
            <div class="name">{{ account.name }}</div>
            <svg
              v-if="account.favorite"
              class="favorite"
              xmlns="http://www.w3.org/2000/svg"
              width="11.98"
              height="11.387"
              viewBox="0 0 11.98 11.387"
            >
              <path
                id="Icon_ionic-md-star"
                data-name="Icon ionic-md-star"
                d="M8.566,11.788l2.947,1.778-.78-3.354,2.6-2.255-3.43-.295L8.566,4.5,7.226,7.662,3.8,7.957l2.6,2.255-.78,3.354Z"
                transform="translate(-2.576 -3.218)"
                fill="#261fef"
                stroke="#261fef"
                stroke-width="1"
              />
            </svg>
            <svg
              v-else
              class="favorite"
              xmlns="http://www.w3.org/2000/svg"
              width="11.98"
              height="11.387"
              viewBox="0 0 11.98 11.387"
            >
              <path
                id="Icon_ionic-md-star"
                data-name="Icon ionic-md-star"
                d="M8.566,11.788l2.947,1.778-.78-3.354,2.6-2.255-3.43-.295L8.566,4.5,7.226,7.662,3.8,7.957l2.6,2.255-.78,3.354Z"
                transform="translate(-2.576 -3.218)"
                fill="none"
                stroke="#010029"
                stroke-width="1"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div id="output" v-else>
      <div class="headline">
        <router-link to="/play" class="back"></router-link>
        <h2>Auswertung</h2>
      </div>

      <div class="diagram">
        <div class="correct" v-if="correctPercentage != '0%'">
          {{ correctPercentage.substring(0, correctPercentage.length - 1) }}
          <span class="percentage">%</span>
        </div>
        <div class="false" v-if="correctPercentage != '100%'">
          {{
            100 -
              parseInt(
                correctPercentage.substring(0, correctPercentage.length - 1)
              )
          }}
          <span class="percentage">%</span>
        </div>
      </div>

      <div class="challenges">
        <div
          class="challenge"
          v-for="(record, r) in records"
          :key="r"
          :class="{
            false: !correctRecords.includes(r),
            correct: correctRecords.includes(r)
          }"
        >
          <p class="question">
            {{ record.question }}
          </p>

          <div class="record-input">
            <div class="soll">
              <div
                class="account"
                v-for="s in getMaximumLength(accountNumberInputs[r], record)"
                :key="s"
              >
                <div
                  class="number"
                  :class="{
                    empty: !output[r][0][s - 1] && !corrections[r][0][s - 1],
                    false: output[r][0][s - 1] !== corrections[r][0][s - 1]
                  }"
                >
                  <span class="input" v-if="output[r][0][s - 1]">
                    {{ output[r][0][s - 1] }}
                  </span>
                  <span
                    class="correction"
                    v-show="output[r][0][s - 1] !== corrections[r][0][s - 1]"
                    >{{ corrections[r][0][s - 1] }}</span
                  >
                  &nbsp;
                </div>
                <span
                  class="name"
                  :class="{
                    false: output[r][0][s - 1] !== corrections[r][0][s - 1]
                  }"
                  >{{ getAccountNameByNumber(corrections[r][0][s - 1]) }}</span
                >
              </div>
            </div>

            <div class="haben">
              <div
                class="account"
                v-for="h in getMaximumLength(accountNumberInputs[r], record)"
                :key="h"
              >
                <div
                  class="number"
                  :class="{
                    empty: !output[r][1][h - 1] && !corrections[r][1][h - 1],
                    false: output[r][1][h - 1] !== corrections[r][1][h - 1]
                  }"
                >
                  <span class="input" v-if="output[r][1][h - 1]">
                    {{ output[r][1][h - 1] }}
                  </span>
                  <span
                    class="correction"
                    v-show="output[r][1][h - 1] !== corrections[r][1][h - 1]"
                    >{{ corrections[r][1][h - 1] }}</span
                  >
                  &nbsp;
                </div>
                <span
                  class="name"
                  :class="{
                    false: output[r][1][h - 1] !== corrections[r][1][h - 1]
                  }"
                  >{{ getAccountNameByNumber(corrections[r][1][h - 1]) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable no-labels */
import { computed, onUnmounted, ref, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { userData, loadUserData } from '../assets/js/data'
import Search from '../components/Search.vue'
import axios from 'axios'
import store from '../store/index'
export default {
  name: 'Practice',
  components: {
    Search
  },
  emits: ['toggleFooterNav'],
  setup(_, { emit }) {
    // Routing
    const route = useRoute()
    const selector = route.params.id[0] // m = Modul, t = Topic
    const id = route.params.id.substring(1) | 0
    const heading = computed(() => {
      if (selector === 'm') {
        return 'Modul ' + id
      } else if (selector === 't') {
        return userData.value.topics[id].name
      }
    })

    /*
     * ##################
     * ####  Input  #####
     * ##################
     */

    // Numbers the user put in
    const accountNumberInputs = ref([])

    // Accounts Visible during Input
    const amountOfInputFields = ref([])

    // adds one field per side
    function onPlusClick(recordNumber) {
      if (amountOfInputFields.value[recordNumber] < 4) {
        amountOfInputFields.value[recordNumber]++
      }
    }

    // removes one field per side
    function onMinusClick(recordNumber) {
      if (amountOfInputFields.value[recordNumber] > 1) {
        amountOfInputFields.value[recordNumber]--
      }
    }

    // Records from backend filtered by slug + fills amountOfInputFields-Array
    const records = computed(() => {
      let records = []
      if (userData.value) {
        if (selector === 'm') {
          userData.value.topics.forEach(topic => {
            topic.records.forEach(record => {
              if (record.level === id) {
                records.push(record)
              }
            })
          })
        } else if (selector === 't') {
          records = userData.value.topics[id].records
        }
      }
      for (let i = 0; i < records.length; i++) {
        accountNumberInputs.value.push([[], []])
      }
      amountOfInputFields.value = new Array(records.length).fill(1)
      return records
    })

    // current slide/record of the modul/topic
    const currentRecord = ref(0)

    // goes to next record
    function onNextClick() {
      if (currentRecord.value + 1 < records.value.length) {
        currentRecord.value++
      }
    }

    // goes to previous record
    function onPreviousClick() {
      if (currentRecord.value > 0) {
        currentRecord.value--
      }
    }

    /*
     * ##################
     * #####  List  #####
     * ##################
     */

    // stores user search input
    const searchInput = ref('')

    // gets account from backend and sorts them by favorite
    const accounts = computed(() => {
      const accounts = []
      if (userData.value) {
        const accountData = userData.value.accounts
        accountData.forEach(account => {
          if (account.favorite) accounts.push(account)
        })
        accountData.forEach(account => {
          if (!account.favorite) accounts.push(account)
        })
      }
      return accounts
    })

    // filters accounts by search input
    function getFilteredAccounts(accounts) {
      return accounts.filter(account => {
        return (
          account.name
            .toLowerCase()
            .startsWith(searchInput.value.toLowerCase()) ||
          account.number.startsWith(searchInput.value)
        )
      })
    }

    // Helper Functions
    function getAccountNumberById(id) {
      if (!id) return null
      return accounts.value[id].number
    }

    function getAccountNameByNumber(number) {
      let name = ''
      userData.value.accounts.forEach(account => {
        if (account.number === number) {
          name = account.name
        }
      })
      return name
    }

    function getMaximumLength(inputs, record) {
      return Math.max(
        inputs[0].length,
        inputs[1].length,
        record.accounts.soll.length,
        record.accounts.haben.length
      )
    }

    // returns the amount of actual values in an array, empty/undefined don't count as they would in arr.length()
    function getAmountOfValuesInArray(arr) {
      let amount = 0
      for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'undefined') {
          amount++
        }
      }
      return amount
    }

    /*
     * ##################
     * ####  Output  ####
     * ##################
     */

    // ref to switch between input and output stage
    const finished = ref(false)

    // moves FooterNav back in on output screen
    watch(finished, () => {
      emit('toggleFooterNav', finished.value)
    })

    // perctange of correct records for diagram
    const correctPercentage = ref('0%')

    // gets sorted output in onDoneClick
    const output = ref([])

    // gets solutions array in onDoneClick
    const corrections = ref(null)

    // array to style the headlines of the records red or green
    const correctRecords = ref([])

    // goes to output screen
    function onDoneClick() {
      /*

      SOLUTIONS AND INPUTS
      ARRAY[RECORD][0 = SOLL, 1 = HABEN][ACCOUNT]

      */

      // creates empty vanilla js array for solutions, see pattern above
      const solutions = []

      // fills Solutions Array with data from DB
      records.value.forEach(record => {
        const newRecord = []
        const sides = ['soll', 'haben']

        sides.forEach(side => {
          const newSide = []

          record.accounts[side].forEach(accountId => {
            newSide.push(getAccountNumberById(accountId))
          })

          newRecord.push(newSide)
        })

        solutions.push(newRecord)
      })

      // creates empty vanilla js array for user input, see pattern above
      const inputs = []

      // fills Input Array with user input
      accountNumberInputs.value.forEach(record => {
        const newRecord = []

        record.forEach(side => {
          const newSide = []

          side.forEach(account => {
            newSide.push(account)
          })

          newRecord.push(newSide)
        })

        inputs.push(newRecord)
      })

      // defines the amount of records to output, gets it from the solutions array
      const amountOfRecords = solutions.length

      // temporary array which gets moved into correctRecords
      const correct = []

      // calculate how many records are right
      for (let bs = 0; bs < amountOfRecords; bs++) {
        let bsCorrect = true

        // compares input and solution by sorted JSON string, quick and dirty
        for (let side = 0; side < 2; side++) {
          const solutionString = JSON.stringify(
            solutions[bs][side].slice().sort()
          )
          const inputString = JSON.stringify(inputs[bs][side].slice().sort())

          if (solutionString !== inputString) {
            bsCorrect = false
          }
        }

        if (bsCorrect) {
          correct.push(bs)
        }
      }

      // creates Array and sends it to backend, to be saved
      const recordsRequest = []
      records.value.forEach((record, i) => {
        const id = record.id
        const isCorrect = correct.includes(i)
        recordsRequest.push({
          recordId: id,
          correct: isCorrect
        })
      })

      axios.post(store.state.APIURL + '/updateRecords', {
        userId: store.state.userId,
        records: recordsRequest
      })

      // temporary array which gets moved into output
      const sortedInputs = []

      // sorts user input
      for (let bs = 0; bs < solutions.length; bs++) {
        const amountOfAccountsPerSide = Math.max(
          inputs[bs][0].length,
          inputs[bs][1].length,
          solutions[bs][0].length,
          solutions[bs][1].length
        )

        const sortedRecord = []

        for (let side = 0; side < amountOfAccountsPerSide; side++) {
          // creates all arrays per side (SOLL/HABEN)
          const solution = solutions[bs][side]
          const input = inputs[bs][side]
          const sortedInput = []

          // expands all arrays to the same length, adds 'empty' if shorter
          sortedInput.length = amountOfAccountsPerSide
          if (input.length < amountOfAccountsPerSide) {
            input.length = amountOfAccountsPerSide
          }

          if (solution.length < amountOfAccountsPerSide) {
            solution.length = amountOfAccountsPerSide
          }

          // loops through every input and puts its on the place it belongs on the solution array
          for (let s = 0; s < amountOfAccountsPerSide; s++) {
            for (let i = 0; i < amountOfAccountsPerSide; i++) {
              if (solution[s] === input[i]) {
                sortedInput[s] = input[i]
                input.splice(i, 1)
              }
            }
          }

          // adds remaining input to first empty fields on sortedInput
          if (getAmountOfValuesInArray(input)) {
            for (let i = 0; i < sortedInput.length; i++) {
              if (typeof sortedInput[i] === 'undefined') {
                for (let j = 0; j < input.length; j++) {
                  sortedInput[i] = input[j]
                  input.splice(j, 1)
                  break
                }
              }
            }
          }

          sortedRecord.push(sortedInput)
        }
        sortedInputs.push(sortedRecord)
      }

      // updates refs outside the onDoneClick-scope
      output.value = sortedInputs
      corrections.value = solutions
      correctRecords.value = correct
      correctPercentage.value = (correct.length * 100) / amountOfRecords + '%'
      finished.value = true
    }

    // updates userdata on view leave
    onUnmounted(() => {
      loadUserData(userData)
    })

    return {
      userData,
      heading,
      records,
      currentRecord,
      amountOfInputFields,
      onPlusClick,
      onMinusClick,
      accountNumberInputs,
      getAccountNameByNumber,
      onNextClick,
      onPreviousClick,
      onDoneClick,
      finished,
      searchInput,
      accounts,
      getFilteredAccounts,
      getMaximumLength,
      correctPercentage,
      output,
      correctRecords,
      corrections,
      getAccountNumberById
    }
  }
}
</script>

<style lang="scss">
#Practice {
  padding: 0 $whitespace;

  .headline {
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .back {
      @include arrow(7px, 2px, $color-primary, 135deg);
    }

    h2 {
      margin: 0 0 0 25px;
    }

    .pagination {
      @include text-style(small, regular, 18px);
      margin-left: auto;
      opacity: 0.7;
    }
  }

  #input {
    .input-area {
      padding-bottom: 35px;
      box-shadow: 0px 10px 22px 0px rgba($color-primary, 0.06);
      width: 100%;

      .navigation {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .button {
          @include text-style(regular, medium, 24px);
          display: flex;
          align-items: center;
          color: $color-primary;

          .arrow {
            @include arrow(7px, 2px, currentColor, -225deg);
            margin-right: 10px;
          }

          &.next {
            color: $color-white;
            padding: 7px 12px;
            background-color: $color-primary;
            border-radius: 6px;
            margin-left: auto;

            .arrow {
              margin-right: 0;
              margin-left: 10px;
              transform: rotate(-45deg);
            }
          }

          &.previous {
            transition: opacity $transition-fast;

            &.disabled {
              opacity: 0.5;
            }
          }
        }
      }
    }

    .list {
      .Search {
        margin-top: 20px;
      }

      .accounts {
        margin-top: 10px;
        display: inline-block;
        width: 100%;

        .account {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 20px;

          .number {
            @include text-style(regular, medium, 23px);
          }

          .name {
            @include text-style(small, regular, 18px);
            opacity: 0.7;
            margin-left: 10px;
          }

          .favorite {
            margin-left: auto;
          }
        }
      }
    }
  }

  .challenges {
    .challenge {
      .question {
        @include text-style(small, regular, 24px);
        opacity: 0.7;
        margin-top: 20px;
        white-space: pre;
        min-height: 50px;
      }

      .record-input {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-bottom: 23px;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          // not exactly centered due to antialiasing
          transform: translateX(+1px);
          width: 1px;
          background: $color-dark;
        }
        .soll,
        .haben {
          width: 50%;

          .account {
            width: 80%;
            margin-top: 10px;

            .number {
              all: unset;
              @include text-style(regular, bold, 24px);
              font-family: inherit;
              box-sizing: border-box;
              border-bottom: 1px solid rgba($color-primary, 0.5);
              padding-left: 5px;
              width: 100%;

              &:not(:placeholder-shown) {
                border-bottom: 1px solid $color-primary;
              }
            }

            .name {
              @include text-style(very-small, regular, 16px);
              opacity: 0.7;
              margin-top: 3px;
              display: block;
              height: 20px;
            }
          }
        }

        .haben {
          .account {
            margin-left: auto;
          }
        }
      }

      .buttons {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .button {
          @include text-style(small, bold, 0);
          $size: 15px;
          background: $color-primary;
          width: $size;
          height: $size;
          border-radius: 50%;
          color: $color-white;
          display: grid;
          place-items: center;

          &.plus {
            margin-left: 10px;
          }
        }
      }
    }
  }

  #output {
    padding-bottom: $whitespace-scroll;

    .diagram {
      width: 100%;
      display: flex;
      margin-top: 40px;

      .correct,
      .false {
        @include text-style(regular, bold, 24px);
        padding: 6px 0;
        color: $color-white;
        text-align: center;

        .percentage {
          font-weight: font-weight(regular);
        }
      }

      .correct {
        background-color: $color-correct;
        width: v-bind('correctPercentage');
      }

      .false {
        background-color: $color-false;
        width: calc(100% - v-bind('correctPercentage'));
      }
    }

    .challenges {
      display: block;

      .challenge {
        margin-top: 70px;

        &.correct {
          .question {
            color: $color-correct;
          }
        }

        &.false {
          .question {
            color: $color-false;
          }
        }

        &:nth-of-type(1) {
          margin-top: 50px;
        }

        .question {
          margin-top: 0;
          min-height: unset;
          padding-bottom: 10px;
          opacity: 1;
          font-weight: font-weight(medium);
        }

        .account {
          .number {
            display: inline-block;

            &.empty {
              border-bottom: 1px solid rgba($color-primary, 0.5);
            }

            &.false {
              .input {
                text-decoration: line-through;
                margin-right: 5px;
              }
            }

            .correction {
              color: $color-false;
            }
          }

          .name {
            &.false {
              color: $color-false;
              opacity: 1;
              font-weight: font-weight(medium);
            }
          }
        }
      }
    }
  }
}
</style>
