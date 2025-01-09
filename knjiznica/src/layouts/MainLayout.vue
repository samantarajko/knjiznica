<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-h4 text-weight-bold">
          Knjižnica
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Naslovnica',
    caption: 'Naslovnica',
    icon: 'school',
    link: '/'
  },
  {
    title: 'Popis Svih Knjiga',
    caption: 'Popis svih knjiga',
    icon: 'list',
    link: '#/popisKnjiga'
  },
  {
    title: 'Pretraživanje',
    caption: 'Pretraživanje među knjigama',
    icon: 'search',
    link: '#/pretrazivanje'
  },
  {
    title: 'O nama',
    caption: 'Više o nama',
    icon: 'record_voice_over',
    link: '#/o_nama'
  },
  {
    title: 'Lokacija',
    caption: 'Naša lokacija',
    icon: 'location_on',
    link: '#/lokacija'
  },
  {
    title: 'Login',
    caption: 'Ulogirajte se',
    icon: 'login',
    link: '#/login'
  },
  {
    title: 'Registracija',
    caption: 'Registrirajte se',
    icon: 'how_to_reg',
    link: '#/registracija'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
