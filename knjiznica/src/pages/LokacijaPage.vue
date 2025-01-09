<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-center q-mb-md">Lokacija</h1>
    <div id="map" style="height:500px;"></div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  setup() {
    const initialMap = ref(null);

    onMounted(() => {
      // Initialize the map
      initialMap.value = L.map('map').setView([45.3312, 14.4322], 13);

      // Add tile layer from OpenStreetMap
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(initialMap.value);

      // Add a marker to the map
      L.marker([45.3312, 14.4322])
        .addTo(initialMap.value)
        .bindPopup("Gradska knjižnica Rijeka")
        .openPopup();
    });

    return {
      initialMap,
    };
  },
};
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
}
</style>
