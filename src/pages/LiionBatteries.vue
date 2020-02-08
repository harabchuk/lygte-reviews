<template>
  <q-page>

    <div
      v-if="!isIndexLoaded" 
      class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-if="isIndexLoaded">

      <q-separator class="q-mb-xs" />

      <LiionBatteriesList />
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LiionBatteriesList from '../components/LiionBatteriesList';
//import BatteryFilters from '../components/BatteryFilters';

export default {
  name: 'Batteries',
  components: {
    LiionBatteriesList,
    //BatteryFilters,
  },
  async mounted() {
    await this.fetchIndex();
  },
  computed: {
    ...mapGetters('liionBatteriesModule', [
      'isIndexLoaded',
    ])
  },
  methods: {
    ...mapActions('liionBatteriesModule', [
      'fetchIndex',
    ]),
  },
}
</script>
