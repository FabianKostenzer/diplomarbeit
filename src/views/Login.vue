<template>
  <section class="page login" id="Login">
    <h1>Anmeldung</h1>
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
      <input type="submit" class="btn" value="Anmelden" />
    </form>
    <p class="help">
      Keinen Account? Jetzt
      <router-link to="/register">registrieren</router-link>.
    </p>
  </section>
</template>

<script>
export default {
  name: 'Login'
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
