<template>
  <section class="page login" id="Login">
    <h1>Anmeldung</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <form @submit.prevent="onLogin" class="login-form">
      <div class="form-item">
        <label for="email">E-Mail</label>
        <input
          id="email"
          type="email"
          required
          placeholder="Geben Sie hier Ihre E-Mail ein..."
          v-model="email"
        />
      </div>
      <div class="form-item">
        <label for="password">Passwort</label>
        <input
          id="password"
          type="text"
          required
          placeholder="Geben Sie hier Ihr Passwort ein..."
          v-model="password"
        />
      </div>
      <input type="submit" class="btn" value="Anmelden" />
    </form>
    <p class="help">
      Keinen Account? Jetzt
      <router-link to="/register">registrieren</router-link>.
    </p>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')

    async function onLogin() {
      try {
        // sends get request to server
        const res = await axios.get('http://localhost:3000/login', {
          params: {
            email: email.value,
            password: password.value
          }
        })

        // checks server-response for errors
        if (res.data === 'UNKNOWN_EMAIL') {
          error.value = 'Kein Nutzer mit dieser E-Mail.'
          return
        }
        if (res.data === 'WRONG_PASSWORD') {
          error.value = 'Falsches Passwort.'
          return
        }

        error.value = ''

        // sets userid in vuex store and redirects to home
        store.commit('setUserId', res.data)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
    return { onLogin, email, password, error }
  }
}
</script>

<style lang="scss">
.login {
  p.error {
    @include text-style(regular, medium, 23px);
    margin-top: 30px;
    color: $color-false;
  }
  .login-form {
    .form-item {
      margin-top: 30px;

      label {
        @include text-style(small, medium, 18px);
      }
      input {
        @include text-style(regular, medium, 23px);
        font-family: inherit;
        border: none;
        padding: 15px;
        display: block;
        margin-top: 10px;
        width: 100%;
        background: $color-white;
        box-shadow: 0 10px 22px 0 rgba($color-primary, 0.1);
        border-radius: 6px;

        &::placeholder {
          color: inherit;
          opacity: 0.5;
        }

        &:focus {
          outline: none;
        }

        &:placeholder-shown {
          box-shadow: 0 10px 22px 0 rgba($color-primary, 0.05);
        }
      }
    }
    .btn {
      @include text-style(regular, bold, 23px);
      font-family: inherit;
      border: none;
      padding: 15px;
      text-align: center;
      display: block;
      margin-top: 30px;
      width: 100%;
      background: $color-primary;
      color: $color-white;
      border-radius: 6px;
    }
  }
  .help {
    @include text-style(small, medium, 18px);
    margin-top: 50px;

    a {
      color: $color-primary;
    }
  }
}
</style>
