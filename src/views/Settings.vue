<template>
  <section class="page scroll-fade" id="Settings" v-if="userData">
    <h2>Dein Kontenplan</h2>

    <Search
      :text="{
        hint: 'Suche Konten nach Namen und Nummern',
        placeholder: 'z. B. 2800...'
      }"
      v-model="searchInput"
    />

    <form @click="escapeEditMode">
      <div
        class="accounts"
        :class="{
          getEdited: accountInEditMode !== null
        }"
      >
        <Accordeon
          class="account-class"
          v-for="(accountClass, c) in accounts"
          :key="c"
          :headerVisible="searchInput == ''"
          :forceVisible="searchInput == ''"
          :visible="!searchInput"
        >
          <template v-slot:header>
            <h3>Klasse {{ c }}: {{ accountClasses[c] }}</h3>
          </template>

          <template v-slot:content>
            <div
              class="account"
              v-for="account in accounts[c]"
              :key="account.id"
              :class="getAccountClasses(account)"
            >
              <input
                :readonly="accountInEditMode != account.id"
                class="number"
                type="number"
                v-model.lazy="account.number"
              />

              <input
                :readonly="accountInEditMode != account.id"
                class="name"
                type="text"
                v-model.lazy="account.name"
              />

              <input
                type="checkbox"
                class="star"
                :checked="account.favorite"
                @click="onFavoriteClick(account)"
              />

              <div class="edit" @click="onEditClick(account)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8.37"
                  height="8.37"
                  viewBox="0 0 8.37 8.37"
                >
                  <path
                    id="Icon_awesome-pen"
                    data-name="Icon awesome-pen"
                    d="M4.752,1.525,6.845,3.617,2.3,8.162.435,8.368A.392.392,0,0,1,0,7.935L.209,6.067,4.752,1.525ZM8.14,1.213,7.157.23a.785.785,0,0,0-1.11,0l-.924.924L7.215,3.248l.924-.924a.785.785,0,0,0,0-1.11Z"
                    transform="translate(0.001 -0.001)"
                    fill="#261fef"
                  />
                </svg>
              </div>
            </div>
          </template>
        </Accordeon>
      </div>
    </form>

    <transition name="fadeButtons">
      <div class="buttons" v-if="changed">
        <button class="save" @click.prevent="onSave">
          Speichern
        </button>
        <div class="reset" @click="onReset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12.955"
            height="12.971"
            viewBox="0 0 12.955 12.971"
          >
            <path
              id="Icon_open-reload"
              data-name="Icon open-reload"
              d="M6.469,0a6.486,6.486,0,1,1-4.6,11.09L3.032,9.923a4.868,4.868,0,1,0,3.454-8.3A4.717,4.717,0,0,0,3.1,3.1L4.864,4.864H0V0L1.929,1.929A6.449,6.449,0,0,1,6.486,0Z"
              fill="#261fef"
            />
          </svg>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import { userData, loadUserData } from '../assets/js/data'
import { computed, onMounted, watch } from '@vue/runtime-core'
import Search from '../components/Search'
import Accordeon from '../components/Accordeon'
import axios from 'axios'
import store from '../store/index'

export default {
  name: 'Settings',
  components: {
    Search,
    Accordeon
  },
  setup(_, { emit }) {
    // handles the Search
    const searchInput = ref('')

    // toggles the FooterNav on edit (when buttons fade in/out)
    const changed = ref(false)
    watch(changed, () => {
      emit('toggleFooterNav', !changed.value)
    })

    // improve performance by only loading a certain amount on initial load, the rest after 100ms
    const initialLoad = ref(true)
    const initalAmountOfAccounts = 20
    const delayToLoadAllAccounts = 100

    // fetches, sort and filters the accounts from the API
    const accounts = computed(() => {
      if (!userData) return []
      const accountList = [[], [], [], [], [], [], [], [], [], []]
      const accountData = userData.value.accounts
        .slice(0) // duplicate, in oder to not change the original order
        .sort((a, b) => (a.number | 0) - (b.number | 0))

      const amountOfAccountsToLoad = initialLoad.value
        ? initalAmountOfAccounts
        : accountData.length
      const search = searchInput.value

      for (let i = 0; i < amountOfAccountsToLoad; i++) {
        const currentAccount = accountData[i]
        const currentAccountNumberString = currentAccount.number.toString()

        // filter by SearchInput
        if (!search) {
          accountList[parseInt(currentAccountNumberString[0])].push(
            currentAccount
          )
        } else if (
          currentAccountNumberString.startsWith(search) ||
          currentAccount.name.toLowerCase().startsWith(search.toLowerCase())
        ) {
          accountList[parseInt(currentAccountNumberString[0])].push(
            currentAccount
          )
        }
      }
      return accountList
    })

    onMounted(() => {
      setTimeout(() => {
        initialLoad.value = false
      }, delayToLoadAllAccounts)
    })

    // ID of the account which gets currently edited
    const accountInEditMode = ref(null)

    /*
     * Buttons
     */

    function onSave() {
      accountInEditMode.value = null
      changed.value = false
      axios.post(store.state.APIURL + '/updateAccounts', {
        userId: store.state.userId,
        newUserAccounts: userData.value.accounts
      })
    }

    async function onReset() {
      accountInEditMode.value = null
      changed.value = false
      await axios.post(store.state.APIURL + '/resetAccounts', {
        userId: store.state.userId
      })
      loadUserData(userData)
    }

    function onFavoriteClick(account) {
      account.favorite = !account.favorite
      changed.value = true
    }

    function onEditClick(account) {
      accountInEditMode.value =
        accountInEditMode.value === account.id ? null : account.id
      changed.value = true
    }

    // defines the CSS Classes
    function getAccountClasses(account) {
      return {
        favorite: account.favorite,
        edit: accountInEditMode.value === account.id
      }
    }

    // text content for headlines
    const accountClasses = [
      'Anlagevermögen',
      'Vorräte',
      'sonstiges Umlaufvermögen',
      'Verbindlichkeiten',
      'betriebliche Erträge',
      'Materialaufwand',
      'Personalaufwand',
      'sonstige betriebliche Aufwände',
      'Finanzerträge und Finanzaufwände',
      'Eigenkapital, Abschlusskonten'
    ]

    // escape from edit mode
    function escapeEditMode(e) {
      if (e.path.length < 11) {
        accountInEditMode.value = null
        return
      }
      if (!e.path[e.path.length - 11].classList.contains('edit')) {
        accountInEditMode.value = null
      }
    }

    return {
      userData,
      searchInput,
      accountInEditMode,
      changed,
      onSave,
      onReset,
      accounts,
      onFavoriteClick,
      onEditClick,
      getAccountClasses,
      accountClasses,
      escapeEditMode
    }
  }
}
</script>

<style lang="scss">
#Settings {
  padding-bottom: $whitespace-scroll;

  .fadeButtons-enter-active,
  .fadeButtons-leave-active {
    transition: transform $transition-normal;
  }
  .fadeButtons-enter-from,
  .fadeButtons-leave-to {
    transform: translateY(+100%);
  }
  .fadeButtons-enter-tp,
  .fadeButtons-leave-from {
    transform: translateY(0);
  }

  .accounts {
    padding-top: 20px;

    .header {
      padding-bottom: 10px;
    }

    .account {
      display: flex;
      align-items: center;
      margin-top: 20px;
      transition: opacity $transition-fast;

      &.favorite {
        color: $color-primary;

        .name {
          color: rgba($color-primary, 0.7);
        }
      }

      .number {
        @include text-style(regular, medium, 23px);
        font-family: inherit;
        border: none;
        transition: color $transition-fast 100ms;
        width: 40px;
        margin-right: 10px;
      }

      .name {
        @include text-style(small, regular, 23px);
        font-family: inherit;
        border: none;
        width: 100%;
        transition: color $transition-fast;
        color: rgba($color-dark, 0.7);
        margin-right: 20px;
      }

      .name,
      .number {
        &:focus {
          outline: none;
        }
      }

      &.edit {
        opacity: 1 !important;

        .number,
        .name {
          border-bottom: 1px solid $color-primary;
        }
      }

      .star {
        all: unset;
        margin-left: auto;
        margin-right: 20px;
        background-image: url('../assets/img/settings/star-empty.svg');
        background-size: contain;
        background-position: center center;
        width: 11.98pt;
        height: 11.387pt;
        flex-shrink: 0;

        &:checked {
          background-image: url('../assets/img/settings/star-filled.svg');
        }
      }
    }

    &.getEdited {
      .account {
        opacity: 0.4;
      }
    }
  }

  .buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: stretch;
    height: 40px;
    z-index: 99;

    .save {
      @include text-style(small, bold, 18px);
      border: none;
      font-family: inherit;
      display: grid;
      place-items: center;
      background: $color-primary;
      color: $color-white;
      flex-grow: 1;
    }

    .reset {
      display: grid;
      place-items: center;
      background: $color-white;
      width: 40px;
    }
  }
}
</style>
