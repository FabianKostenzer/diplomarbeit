<template>
  <section class="page" id="Home">
    <h1 v-if="userData">
      <span class="low-contrast">
        Willkommen zurück,
      </span>
      {{ userData.name }}
    </h1>
    <div class="cards" v-if="userData">
      <router-link class="card big primary" to="/play">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
        >
          <g
            id="Gruppe_71"
            data-name="Gruppe 71"
            transform="translate(-70 -254)"
          >
            <circle
              id="Ellipse_12"
              data-name="Ellipse 12"
              cx="14"
              cy="14"
              r="14"
              transform="translate(70 254)"
              fill="#fff"
            />
            <path
              id="Pfad_36"
              data-name="Pfad 36"
              d="M7.615,2.562a1.39,1.39,0,0,1,2.384,0l5.885,9.809a1.39,1.39,0,0,1-1.192,2.105H2.922A1.39,1.39,0,0,1,1.73,12.371Z"
              transform="translate(93.477 259.471) rotate(90)"
              fill="#261fef"
            />
          </g>
        </svg>

        <p class="card-content">
          <span class="subtitle">Übe alle</span>
          Themengebiete
        </p>
      </router-link>

      <router-link class="card big" to="/stats">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="29.455"
          viewBox="0 0 27 29.455"
        >
          <g
            id="Icon_ionic-ios-stats"
            data-name="Icon ionic-ios-stats"
            transform="translate(-5.625 -4.5)"
          >
            <path
              id="Pfad_32"
              data-name="Pfad 32"
              d="M12.989,33.955H16.67a.615.615,0,0,0,.614-.614V5.114A.615.615,0,0,0,16.67,4.5H12.989a.615.615,0,0,0-.614.614V33.341A.615.615,0,0,0,12.989,33.955Z"
              transform="translate(0.614)"
              fill="#261fef"
            />
            <path
              id="Pfad_33"
              data-name="Pfad 33"
              d="M6.239,32.523H9.92a.615.615,0,0,0,.614-.614V20.864a.615.615,0,0,0-.614-.614H6.239a.615.615,0,0,0-.614.614V31.909A.615.615,0,0,0,6.239,32.523Z"
              transform="translate(0 1.432)"
              fill="#261fef"
            />
            <path
              id="Pfad_34"
              data-name="Pfad 34"
              d="M19.746,32.932h3.666a.619.619,0,0,0,.621-.621V16.371a.619.619,0,0,0-.621-.621H19.746a.619.619,0,0,0-.621.621V32.311A.619.619,0,0,0,19.746,32.932Z"
              transform="translate(1.227 1.023)"
              fill="#261fef"
            />
            <path
              id="Pfad_35"
              data-name="Pfad 35"
              d="M25.875,9.621v23.3a.619.619,0,0,0,.621.621h3.666a.619.619,0,0,0,.621-.621V9.621A.619.619,0,0,0,30.163,9H26.5A.619.619,0,0,0,25.875,9.621Z"
              transform="translate(1.841 0.409)"
              fill="#261fef"
            />
          </g>
        </svg>

        <p class="card-content">
          <span class="subtitle">Überprüfe deinen</span>
          Lernfortschritt
        </p>
      </router-link>

      <router-link class="card" to="/list">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="35.392"
          height="23.595"
          viewBox="0 0 35.392 23.595"
        >
          <path
            id="Icon_material-playlist-add-check"
            data-name="Icon material-playlist-add-check"
            d="M23.224,15.741H3v3.371H23.224Zm0-6.741H3v3.371H23.224ZM3,25.853H16.483V22.483H3Zm32.864-7.584L38.392,20.8l-11.781,11.8-7.6-7.584,2.528-2.528,5.073,5.056Z"
            transform="translate(-3 -9)"
            fill="#261fef"
          />
        </svg>
        <p class="card-content">
          <span class="subtitle">Checke alle</span>
          Buchungssätze
        </p>
      </router-link>

      <router-link class="card" to="/settings">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22.006"
          viewBox="0 0 22 22.006"
        >
          <path
            id="Icon_ionic-ios-settings"
            data-name="Icon ionic-ios-settings"
            d="M24.684,15.5A2.831,2.831,0,0,1,26.5,12.859a11.221,11.221,0,0,0-1.358-3.271,2.869,2.869,0,0,1-1.152.246,2.825,2.825,0,0,1-2.584-3.976A11.187,11.187,0,0,0,18.141,4.5a2.829,2.829,0,0,1-5.282,0A11.221,11.221,0,0,0,9.587,5.858,2.825,2.825,0,0,1,7,9.834a2.776,2.776,0,0,1-1.152-.246A11.469,11.469,0,0,0,4.5,12.865a2.83,2.83,0,0,1,.006,5.282,11.221,11.221,0,0,0,1.358,3.271,2.826,2.826,0,0,1,3.73,3.73,11.287,11.287,0,0,0,3.271,1.358,2.823,2.823,0,0,1,5.271,0,11.221,11.221,0,0,0,3.271-1.358,2.829,2.829,0,0,1,3.73-3.73,11.287,11.287,0,0,0,1.358-3.271A2.844,2.844,0,0,1,24.684,15.5Zm-9.132,4.578a4.583,4.583,0,1,1,4.583-4.583A4.582,4.582,0,0,1,15.552,20.078Z"
            transform="translate(-4.5 -4.5)"
            fill="#261fef"
          />
        </svg>
        <p class="card-content">
          <span class="subtitle">Bearbeite deinen</span>
          Kontenplan
        </p>
      </router-link>

      <div class="card">
        <div class="percentage">
          {{ userData.skill }}
          <small>%</small>
        </div>
        <p class="card-content">
          <span class="subtitle">Dein aktueller</span>
          Leistungsstand
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import { onUpdated } from '@vue/runtime-core'
import { userData } from '../assets/js/data'
import gsap from 'gsap/all'
export default {
  name: 'Home',
  setup() {
    // Loading Animation
    onUpdated(() => {
      const selectors = ['h1', '.card']
      const loadingAnimation = gsap.timeline({
        defaults: { ease: 'power2.out' }
      })

      loadingAnimation.from(selectors, {
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        y: +40
      })
    })
    return { userData }
  }
}
</script>

<style lang="scss">
#Home {
  h1 {
    .low-contrast {
      opacity: 0.5;
      display: block;
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 15px;
    height: 500px;
    margin-top: 40px;

    .card {
      background: $color-white;
      box-shadow: 0px 10px 22px 0px rgba($color-primary, 0.1);
      border-radius: 6px;
      grid-row: span 2;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      grid-column: 2 / 3;

      &.big {
        grid-row: 4 / 7;
        grid-column: 1 / 2;
      }

      .icon,
      .percentage {
        margin-bottom: min(20%, 40px);
      }

      .percentage {
        @include text-style(very-big, bold, 35px);
        color: $color-primary;

        small {
          @include text-style(regular, medium, 23px);
        }
      }

      .card-content {
        @include text-style(regular, bold, 23px);

        .subtitle {
          @include text-style(small, medium, 18px);
          opacity: 0.7;
          display: block;
        }
      }

      &.primary {
        background: $color-primary;
        grid-row: 1 / 4;
        color: $color-white;
      }
    }
  }
}
</style>
