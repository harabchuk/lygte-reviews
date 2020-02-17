<template>
  <q-page>

    <div
      v-if="!isIndexLoaded" 
      class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-if="isIndexLoaded">
      <LiionBatteryFilters />

      <q-separator class="q-mb-xs" />

      <div
          v-if="isListLoading" 
          class="text-center">
          <q-spinner-dots color="primary" size="40px" />
      </div>

      <LiionBatteriesList 
        v-if="!isListLoading" 
      />
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import LiionBatteriesList from '../components/LiionBatteriesList';
import LiionBatteryFilters from '../components/LiionBatteryFilters';

export default {
  name: 'Batteries',
  components: {
    LiionBatteriesList,
    LiionBatteryFilters,
  },
  async mounted() {
    await this.fetchIndex();
  },
  computed: {
    ...mapGetters('liionBatteriesModule', [
      'isIndexLoaded',
      'isListLoading',
    ]),
  },
  methods: {
    ...mapActions('liionBatteriesModule', [
      'fetchIndex',
    ]),
  },
}
</script>
