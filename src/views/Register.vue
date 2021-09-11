<template>
  <section class="page login" id="Register">
    <h1>Neuen Account erstellen</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <form @submit.prevent="onRegister" class="login-form">
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
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          required
          placeholder="Geben Sie hier Ihren Namen ein..."
          v-model="name"
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
      <input type="submit" class="btn" value="Registrieren" />
    </form>
    <p class="help">
      Bereits einen Account? Hier
      <router-link to="/login">anmelden</router-link>.
    </p>
  </section>
</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'
import router from '../router/index'
export default {
  name: 'Register',
  setup() {
    const email = ref('')
    const name = ref('')
    const password = ref('')
    const error = ref('')
    async function onRegister() {
      try {
        // sends post request to server
        const res = await axios.post('http://localhost:3000/register', {
          email: email.value,
          name: name.value,
          password: password.value
        })

        // checks server-response for errors
        if (res.data === 'EMAIL_ALREADY_USED') {
          error.value = 'E-Mail bereits vergeben'
          return
        }
        error.value = ''

        // redirects to home on successful registration
        router.push('login')
      } catch (error) {
        console.log(error)
      }
    }
    return { onRegister, email, name, password, error }
  }
}
</script>
