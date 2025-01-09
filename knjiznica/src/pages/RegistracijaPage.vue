<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-center q-mb-md">Registracija korisnika</h1>

    <!-- Forma za unos podataka korisnika -->
    <q-form class="q-mb-md">
      <q-input
        v-model="user.name"
        label="Ime"
        filled
        class="q-mb-md"
        :rules="[val => val && val.length > 0 || 'Ime je obavezno']"
      />

      <q-input
        v-model="user.surname"
        label="Prezime"
        filled
        class="q-mb-md"
        :rules="[val => val && val.length > 0 || 'Prezime je obavezno']"
      />

      <q-input
        v-model="user.username"
        label="Korisničko ime"
        filled
        class="q-mb-md"
        :rules="[val => val && val.length > 0 || 'Korisničko ime je obavezno']"
      />

      <q-input
        v-model="user.password"
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
    const user = ref({
      name: '',
      surname: '',
      username: '',
      password: '',
    });

    return {
      user,
    };
  },
};
</script>

<style scoped>
.q-input {
  max-width: 400px;
}
</style>
