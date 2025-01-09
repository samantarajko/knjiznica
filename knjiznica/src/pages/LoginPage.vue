<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-center q-mb-md">Prijava</h1>

    <!-- Forma za unos podataka za prijavu -->
    <q-form class="q-mb-md">
      <q-input
        v-model="login.username"
        label="Korisničko ime"
        filled
        class="q-mb-md"
        :rules="[val => val && val.length > 0 || 'Korisničko ime je obavezno']"
      />

      <q-input
        v-model="login.password"
        label="Lozinka"
        type="password"
        filled
        class="q-mb-md"
        :rules="[val => val && val.length >= 6 || 'Lozinka mora imati najmanje 6 znakova']"
      />

      <q-btn
        label="Potvrdi"
        color="primary"
        class="q-mt-md"
      />
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const login = ref({
      username: '',
      password: '',
    });

    return {
      login,
    };
  },
};
</script>

<style scoped>
.q-input {
  max-width: 400px;
}
</style>
