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
    caption: 'quasar.dev',
    icon: 'school',
    link: '/'
  },
  {
    title: 'Popis Svih Knjiga',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: '#/popisKnjiga'
  },
  {
    title: 'Pretraživanje',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: '#/pretrazivanje'
  },
  {
    title: 'O nama',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '#/o_nama'
  },
  {
    title: 'Lokacija',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: '#/lokacija'
  },
  {
    title: 'Login',
    caption: '@QuasarFramework',
    icon: 'public',
    link: '#/login'
  },
  {
    title: 'Registracija',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: '#/registracija'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
