<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-center q-mb-md">Pretraživanje</h1>

    <!-- Pretraživanje -->
    <q-input
      v-model="searchTerm"
      label="Unesite pojam za pretragu"
      filled
      debounce="300"
      class="q-mb-md"
    />

    <q-checkbox
      v-model="searchByTitle"
      label="Pretraživanje po naslovu"
      class="q-mb-md"
    />

    <q-checkbox
      v-model="searchByAuthor"
      label="Pretraživanje po autoru"
      class="q-mb-md"
      style="margin-right: 20px;"
    />

    <q-btn
      label="Traži"
      color="primary"
      @click="performSearch"
      class="q-mb-md"
    />

    <q-table
      :rows="filteredBooks"
      :columns="columns"
      row-key="id"
      bordered
      flat
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title>Knjižni fond</q-toolbar-title>
        </q-toolbar>
      </template>

      <template v-slot:body-cell-slika="props">
        <q-img
          :src="props.row.slika"
          :alt="`Slika ${props.row.naslov}`"
          style="max-width: 50px; max-height: 75px;"
          contain
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const searchTerm = ref('');
    const searchByTitle = ref(false);
    const searchByAuthor = ref(false);
    const books = ref([]);

    // Kolone tablice
    const columns = ref([
      { name: "id", label: "ID", align: "left", field: "id", sortable: true },
      { name: "naslov", label: "Naslov", align: "left", field: "naslov", sortable: true },
      { name: "autor", label: "Autor", align: "left", field: "autor", sortable: true },
      { name: "opis", label: "Opis", align: "left", field: "opis" },
      { name: "slika", label: "Slika", align: "center", field: "slika" },
      { name: "stanje", label: "Stanje", align: "right", field: "stanje", sortable: true },
    ]);

    const filteredBooks = computed(() => {
      return books.value.filter((book) => {
        const term = searchTerm.value.toLowerCase();
        let matches = false;

        if (searchByTitle.value) {
          matches = book.naslov.toLowerCase().includes(term);
        }

        if (searchByAuthor.value) {
          matches = book.autor.toLowerCase().includes(term);
        }

        return matches;
      });
    });

    const loadBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/knjige');
        books.value = response.data.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju knjiga:", error);
      }
    };

    loadBooks();

    return {
      searchTerm,
      searchByTitle,
      searchByAuthor,
      filteredBooks,
      columns,
      loadBooks,
    };
  },
};
</script>

<style scoped>
.q-img {
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
