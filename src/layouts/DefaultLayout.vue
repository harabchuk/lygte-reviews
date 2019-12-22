<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="fas fa-bars"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Reviews from lygte-info.dk
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

        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="fas fa-charging-station" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Chargers</q-item-label>
            <q-item-label caption>Battery chargers reviews</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/notready/1">
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

        <q-item clickable tag="a" target="_blank" href="https://lygte-info.dk/">
          <q-item-section avatar>
            <q-icon name="far fa-copyright" />
          </q-item-section>
          <q-item-section>
            <q-item-label>lygte-info.dk</q-item-label>
          </q-item-section>
        </q-item>
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
