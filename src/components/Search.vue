<template>
  <div class="Search">
    <label
      for="search"
      class="search-instructions"
      v-if="text.hint"
      v-bind="$attrs"
    >
      {{ text.hint }}
    </label>
    <div class="input-container">
      <input
        type="text"
        class="search-input"
        id="search"
        :placeholder="text.placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        autocomplete="off"
      />
      <div class="search-icon" @click="$emit('update:modelValue', '')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.15"
          height="13.15"
          viewBox="0 0 13.15 13.15"
          v-if="isEmpty"
        >
          <g data-name="Icon feather-search" transform="translate(1 1)">
            <path
              data-name="Pfad 10"
              d="M14.043,9.272A4.772,4.772,0,1,1,9.272,4.5,4.772,4.772,0,0,1,14.043,9.272Z"
              transform="translate(-4.5 -4.5)"
              fill="none"
              stroke="#010029"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <path
              data-name="Pfad 11"
              d="M27.57,27.57l-2.595-2.595"
              transform="translate(-16.833 -16.833)"
              fill="none"
              stroke="#010029"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </g>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="11.337"
          height="11.396"
          viewBox="0 0 11.337 11.396"
        >
          <path
            id="close"
            d="M6.352,5.5l4.181-4.181A.7.7,0,1,0,9.549.34L5.368,4.521,1.188.34A.7.7,0,0,0,.2,1.324L4.385,5.5.2,9.685a.7.7,0,1,0,.984.984L5.368,6.488l4.181,4.181a.7.7,0,1,0,.984-.984Zm0,0"
            transform="translate(0.3 0.224)"
            fill="#010029"
            stroke="#010029"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="0.6"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'Search',
  props: {
    text: {
      type: Object,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  inheritAttrs: false,
  setup(props) {
    const isEmpty = ref(true)

    watch(
      () => props.modelValue,
      () => {
        isEmpty.value = !props.modelValue
      }
    )
    return { isEmpty }
  }
}
</script>

<style lang="scss">
.Search {
  margin-top: 30px;

  .search-instructions {
    @include text-style(small, regular, 18px);
    opacity: 0.7;
    margin-bottom: 12px;
    display: block;
  }

  .input-container {
    position: relative;

    .search-input {
      @include text-style(regular, regular, 23px);
      font-family: inherit;
      border: none;
      width: 100%;
      background: $color-white;
      padding: 10px 70px 10px 20px;
      border-radius: 8px;
      box-shadow: 0px 10px 22px 0px rgba($color-primary, 0.06);

      &::placeholder {
        opacity: 0.4;
      }

      &:focus {
        outline: none;
      }
    }

    .search-icon {
      position: absolute;
      top: 0;
      right: 0;
      display: grid;
      place-items: center;
      height: 100%;
      padding: 0 30px;
    }
  }
}
</style>
