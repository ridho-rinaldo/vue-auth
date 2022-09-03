<template>
  <Nav />
  <main class="form-app">
    <router-view />
  </main>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  components: { Nav },
};
</script>

<style>
body {
  background-color: #f8f8f8;
}

.form-app {
  min-width: 55em;
  padding: 2em;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
