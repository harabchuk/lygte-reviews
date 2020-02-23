<template>
  <q-page>
    <LoadingIndicator v-if="!indexLoaded" />
    <div v-if="indexLoaded">
      <BatteryFilters />
      <q-separator class="q-mb-xs" />
      <BatteriesList />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BatteriesList from '../components/BatteriesList';
import BatteryFilters from '../components/BatteryFilters';
import LoadingIndicator from '../components/LoadingIndicator';

export default {
  name: 'Batteries',
  components: {
    BatteriesList,
    BatteryFilters,
    LoadingIndicator,
  },
  async mounted() {
    await this.fetchIndex();
  },
  computed: {
    ...mapState('batteriesModule', [
      'indexLoaded',
    ])
  },
  methods: {
    ...mapActions('batteriesModule', [
      'fetchIndex',
    ]),
  },
}
</script>
