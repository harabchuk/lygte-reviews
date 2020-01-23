<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="!$route.meta.backButton"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="fas fa-bars"
          aria-label="Menu"
        />
        <q-btn
          v-if="$route.meta.backButton"
          flat
          dense
          round
          @click="$router.go(-1)"
          icon="fas fa-arrow-left"
          aria-label="Back"
        />
        <q-toolbar-title>
          {{ $route.meta.title }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Sections</q-item-label>

        <q-item clickable to="/chargers">
          <q-item-section avatar>
            <q-icon name="fas fa-charging-station" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Chargers</q-item-label>
            <q-item-label caption>Battery chargers reviews</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/batteries">
          <q-item-section avatar>
            <q-icon name="fas fa-battery-three-quarters" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Batteries</q-item-label>
            <q-item-label caption>Rechargarble batteries reviews</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/notready/2">
          <q-item-section avatar>
            <q-icon name="fas fa-calculator" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Multimeters</q-item-label>
            <q-item-label caption>DMM reviews</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/notready/3">
          <q-item-section avatar>
            <q-icon name="fas fa-lightbulb" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Flashlights</q-item-label>
            <q-item-label caption>Flashlight reviews</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/notready/4">
          <q-item-section avatar>
            <q-icon name="fas fa-bolt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>LED drivers</q-item-label>
            <q-item-label caption>LED drivers tests</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/notready/5">
          <q-item-section avatar>
            <q-icon name="fas fa-newspaper" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Articles</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/notready/6">
          <q-item-section avatar>
            <q-icon name="fas fa-tools" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Projects</q-item-label>
          </q-item-section>
        </q-item>


        <div class="q-pa-md">
          © All reviews are from <a href="https://lygte-info.dk/" target="_blank">https://lygte-info.dk/</a> and subject to copyright. 
        </div>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
