<template>
  <transition name="fadeFooterNav">
    <section class="Footer-Navigation" v-if="isVisible">
      <ul class="icon-list" ref="iconList">
        <li>
          <router-link to="/" class="icon-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.167"
              height="14"
              viewBox="0 0 15.167 14"
            >
              <path
                d="M9.208,18.5V13.833h3.5V18.5h3.558v-7h2.275l-7.583-7-7.583,7H5.65v7Z"
                transform="translate(-3.375 -4.5)"
              />
            </svg>
          </router-link>
        </li>
        <li>
          <router-link to="/stats" class="icon-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="14.182"
              viewBox="0 0 13 14.182"
            >
              <path
                d="M12.67,18.682h1.773a.3.3,0,0,0,.3-.3V4.8a.3.3,0,0,0-.3-.3H12.67a.3.3,0,0,0-.3.3V18.386A.3.3,0,0,0,12.67,18.682Z"
                transform="translate(-8.83 -4.5)"
              />
              <path
                d="M5.92,26.159H7.693a.3.3,0,0,0,.3-.3V20.545a.3.3,0,0,0-.3-.3H5.92a.3.3,0,0,0-.3.3v5.318A.3.3,0,0,0,5.92,26.159Z"
                transform="translate(-5.625 -11.977)"
              />
              <path
                d="M19.424,24.023h1.765a.3.3,0,0,0,.3-.3V16.049a.3.3,0,0,0-.3-.3H19.424a.3.3,0,0,0-.3.3v7.674A.3.3,0,0,0,19.424,24.023Z"
                transform="translate(-12.034 -9.841)"
              />
              <path
                d="M25.875,9.3v11.22a.3.3,0,0,0,.3.3h1.765a.3.3,0,0,0,.3-.3V9.3a.3.3,0,0,0-.3-.3H26.174A.3.3,0,0,0,25.875,9.3Z"
                transform="translate(-15.239 -6.636)"
              />
            </svg>
          </router-link>
        </li>
        <li class="play">
          <router-link to="/play" class="icon-link never-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11.295"
              height="13.059"
              viewBox="0 0 11.295 13.059"
            >
              <g
                transform="translate(13.182 -1.529) rotate(90)"
                stroke-linecap="round"
              >
                <path
                  d="M 13.33880805969238 12.68196868896484 L 2.778378009796143 12.68196868896484 C 2.505638122558594 12.68196868896484 2.262578010559082 12.54026889801025 2.128198146820068 12.30292892456055 C 1.993818044662476 12.06559944152832 1.997367978096008 11.78427886962891 2.13769793510437 11.5504093170166 L 7.417908191680908 2.750049114227295 C 7.556218147277832 2.519519090652466 7.789748191833496 2.387299060821533 8.058588027954102 2.387299060821533 C 8.327427864074707 2.387299060821533 8.560957908630371 2.519519090652466 8.699268341064453 2.750049114227295 L 13.97947788238525 11.5504093170166 C 14.11980819702148 11.78427886962891 14.12335777282715 12.06559944152832 13.98897838592529 12.30293941497803 C 13.85459804534912 12.54027938842773 13.61154842376709 12.68196868896484 13.33880805969238 12.68196868896484 Z"
                  stroke="none"
                />
                <path
                  d="M 8.058588027954102 2.887299537658691 C 7.994748115539551 2.887299537658691 7.906158447265625 2.908119201660156 7.846648216247559 3.007299423217773 L 2.566437721252441 11.80765914916992 C 2.505167961120605 11.90976905822754 2.53090763092041 11.9993896484375 2.563298225402832 12.05658912658691 C 2.595678329467773 12.11378860473633 2.65928840637207 12.18196868896484 2.77836799621582 12.18196868896484 L 13.33880805969238 12.18196868896484 C 13.45788764953613 12.18196868896484 13.52149772644043 12.11378860473633 13.55387783050537 12.05658912658691 C 13.58626747131348 11.9993896484375 13.6120080947876 11.90976905822754 13.55073833465576 11.80765914916992 L 8.270527839660645 3.007288932800293 C 8.211017608642578 2.908119201660156 8.122427940368652 2.887299537658691 8.058588027954102 2.887299537658691 M 8.058588027954102 1.887301445007324 C 8.472203254699707 1.887301445007324 8.885818481445313 2.089134216308594 9.128017425537109 2.492798805236816 L 14.40822792053223 11.29315948486328 C 14.9069881439209 12.12441921234131 14.30820846557617 13.18196868896484 13.33880805969238 13.18196868896484 L 2.77836799621582 13.18196868896484 C 1.808967590332031 13.18196868896484 1.210187911987305 12.12441921234131 1.708948135375977 11.29315948486328 L 6.989157676696777 2.492798805236816 C 7.231357574462891 2.089134216308594 7.644972801208496 1.887301445007324 8.058588027954102 1.887301445007324 Z"
                  stroke="none"
                />
              </g>
            </svg>
          </router-link>
        </li>
        <li>
          <router-link to="/list" class="icon-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.584"
              height="13.723"
              viewBox="0 0 20.584 13.723"
            >
              <path
                d="M14.762,12.921H3v1.96H14.762Zm0-3.921H3v1.96H14.762ZM3,18.8h7.842v-1.96H3Zm19.114-4.411,1.47,1.47-6.852,6.861-4.421-4.411,1.47-1.47,2.95,2.941Z"
                transform="translate(-3 -9)"
              />
            </svg>
          </router-link>
        </li>
        <li>
          <router-link to="/settings" class="icon-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.989"
              height="13.992"
              viewBox="0 0 13.989 13.992"
            >
              <path
                d="M17.334,11.494a1.8,1.8,0,0,1,1.155-1.679,7.135,7.135,0,0,0-.863-2.08,1.824,1.824,0,0,1-.732.157A1.8,1.8,0,0,1,15.25,5.363,7.114,7.114,0,0,0,13.174,4.5a1.8,1.8,0,0,1-3.359,0,7.135,7.135,0,0,0-2.08.863A1.8,1.8,0,0,1,6.092,7.892a1.765,1.765,0,0,1-.732-.157A7.293,7.293,0,0,0,4.5,9.819a1.8,1.8,0,0,1,0,3.359,7.135,7.135,0,0,0,.863,2.08,1.8,1.8,0,0,1,2.372,2.372,7.177,7.177,0,0,0,2.08.863,1.8,1.8,0,0,1,3.351,0,7.135,7.135,0,0,0,2.08-.863,1.8,1.8,0,0,1,2.372-2.372,7.177,7.177,0,0,0,.863-2.08A1.809,1.809,0,0,1,17.334,11.494Zm-5.807,2.911a2.914,2.914,0,1,1,2.914-2.914A2.914,2.914,0,0,1,11.527,14.405Z"
                transform="translate(-4.5 -4.5)"
              />
            </svg>
          </router-link>
        </li>
      </ul>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'FooterNav',
  props: { isVisible: Boolean }
}
</script>

<style lang="scss">
.fadeFooterNav-enter-active,
.fadeFooterNav-leave-active {
  transition: transform $transition-normal;
}
.fadeFooterNav-enter-from,
.fadeFooterNav-leave-to {
  //40px height + 16px additional height from play-button ~ rounded up 60px
  transform: translateY(+60px);
}
.fadeFooterNav-enter-to,
.fadeFooterNav-leave-from {
  transform: translateY(0);
}
.Footer-Navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;

  .icon-list {
    background-color: $color-white;
    box-shadow: 0px -4px 28px 0px rgba($color-primary, 0.07);
    padding: 0 $whitespace;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    li {
      .icon-link {
        svg {
          fill: $color-dark;
          transition: fill $transition-normal;
        }

        &.router-link-active:not(.never-blue) svg {
          fill: $color-primary;
        }
      }
    }

    li.play {
      background: $color-primary;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transform: translateY(-20px);
      display: grid;
      place-items: center;
      box-shadow: 0px 10px 22px 0px rgba($color-primary, 0.1);

      a {
        transform: translateX(+1px);

        svg {
          fill: $color-white;
        }
      }
    }
  }
}
</style>
