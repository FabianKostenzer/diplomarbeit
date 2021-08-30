<template>
  <div class="Record-card" :class="{ turned: isTurned }" @click="turnCard">
    <div class="front">
      <h4>{{ record.info.name }}</h4>
      <div class="description">
        <span class="year">{{ record.info.year }}. Klasse</span>
        <span class="page">S. {{ record.info.page }}</span>
      </div>
    </div>
    <div class="back">
      <div class="left">
        <div
          class="account"
          v-for="accountId in record.accounts.soll"
          :key="accountId"
        >
          <span class="number">{{ accounts[accountId].number }}</span>
          <span class="name">{{ accounts[accountId].name }}</span>
        </div>
      </div>
      <div class="right">
        <div
          class="account"
          v-for="accountId in record.accounts.haben"
          :key="accountId"
        >
          <span class="number">{{ accounts[accountId].number }}</span>
          <span class="name">{{ accounts[accountId].name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'RecordCard',
  props: {
    record: Object,
    accounts: Object
  },
  setup() {
    // handle Card Turn
    const isTurned = ref(false)
    function turnCard() {
      isTurned.value = !isTurned.value
    }
    return { isTurned, turnCard }
  }
}
</script>

<style lang="scss">
.Record-card {
  background: $color-primary;
  width: 100%;
  border-radius: 9px;
  box-shadow: 0px 10px 22px 0px rgba($color-primary, 0.06);
  padding: 20px 0;
  color: $color-white;
  transition: transform $transition-slow;
  margin-top: 30px;
  position: relative;

  &.turned {
    transform: rotateX(180deg);

    .front {
      opacity: 0;
    }

    .back {
      opacity: 1;
    }
  }

  .front,
  .back {
    transition: opacity 0ms calc(#{$duration-slow} / 2);
  }

  .front {
    text-align: center;
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h4 {
      @include text-style(regular, bold, 23px);
    }

    .description {
      margin: 10px auto 0;
      width: 130px;
      display: flex;
      justify-content: space-between;

      span {
        @include text-style(small, regular, 18px);
        opacity: 0.5;
      }
    }
  }

  .back {
    opacity: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    transform: rotateX(180deg);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      background: $color-white;
      width: 1px;
    }

    .left,
    .right {
      padding-left: 30px;

      .account {
        color: $color-white;

        &:not(:last-of-type) {
          margin-bottom: 20px;
        }

        .number {
          @include text-style(regular, medium, 24px);
          display: block;
        }

        .name {
          @include text-style(very-small, regular, 16px);
          opacity: 0.7;
          display: block;
          margin-top: -5px;
        }
      }
    }
  }
}
</style>
