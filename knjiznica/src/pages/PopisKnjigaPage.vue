<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-center q-mb-md">Popis Svih Knjiga</h1>

    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
      bordered
      flat
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title>Na ovoj stranici pronaći ćete popis svih knjiga koje su trenutno dostupne u našoj knjižnici. </q-toolbar-title>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const books = ref([]);
    const columns = ref([
      { name: "id", label: "ID", align: "left", field: "id", sortable: true },
      { name: "naslov", label: "Naslov", align: "left", field: "naslov", sortable: true },
      { name: "autor", label: "Autor", align: "left", field: "autor", sortable: true },
      { name: "opis", label: "Opis", align: "left", field: "opis" },
      { name: "slika", label: "Slika", align: "center", field: "slika" },
      { name: "stanje", label: "Stanje", align: "right", field: "stanje", sortable: true },
    ]);

    // Dohvaćanje podataka s API-a
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/knjige');
        books.value = response.data.data;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    // Pokretanje funkcije prilikom učitavanja stranice
    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      columns,
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
