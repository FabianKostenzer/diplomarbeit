<template>
  <section class="page login" id="Register">
    <h1>Neuen Account erstellen</h1>
    <p class="error">Passwort nicht korrekt</p>
    <form action="" class="login-form">
      <div class="form-item">
        <label for="email">E-Mail</label>
        <input
          id="email"
          type="email"
          required
          placeholder="Geben Sie hier Ihre Email ein..."
        />
      </div>
      <div class="form-item">
        <label for="password">Passwort</label>
        <input
          id="password"
          type="password"
          required
          placeholder="Geben Sie hier Ihr Passwort ein..."
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
export default {
  name: 'Register'
}
</script>
