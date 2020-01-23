<template>
  <q-page>

    <div
      v-if="!isIndexLoaded" 
      class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-if="isIndexLoaded">

      <BatteryFilters />

      <q-separator class="q-mb-xs" />

      <BatteriesList />
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BatteriesList from '../components/BatteriesList';
import BatteryFilters from '../components/BatteryFilters';

export default {
  name: 'Batteries',
  components: {
    BatteriesList,
    BatteryFilters,
  },
  async mounted() {
    await this.fetchIndex();
  },
  computed: {
    ...mapGetters('batteriesModule', [
      'isIndexLoaded',
    ])
  },
  methods: {
    ...mapActions('batteriesModule', [
      'fetchIndex',
    ]),
  },
}
</script>
