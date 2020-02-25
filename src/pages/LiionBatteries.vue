<template>
  <q-page>
    <LoadingIndicator v-if="!indexLoaded" />
    <div v-if="indexLoaded">
      <LiionBatteryFilters />
      <q-separator class="q-mb-xs" />
      <LiionBatteriesList />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import LiionBatteriesList from '../components/LiionBatteriesList';
import LiionBatteryFilters from '../components/LiionBatteryFilters';
import LoadingIndicator from '../components/LoadingIndicator'

export default {
  name: 'Batteries',
  components: {
    LiionBatteriesList,
    LiionBatteryFilters,
    LoadingIndicator,
  },
  async mounted() {
    await this.fetchIndex();
  },
  computed: {
    ...mapState('liionBatteriesModule', [
      'indexLoaded',
    ]),
  },
  methods: {
    ...mapActions('liionBatteriesModule', [
      'fetchIndex',
    ]),
  },
}
</script>
