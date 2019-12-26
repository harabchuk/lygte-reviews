<template>
  <q-page>

    <div
      v-if="!isIndexLoaded" 
      class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-if="isIndexLoaded">
      <ChargerFilters />

      <q-separator class="q-mb-xs" />

      <ChargersList />
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChargersList from '../components/ChargersList';
import ChargerFilters from '../components/ChargerFilters';

export default {
  name: 'Chargers',
  components: {
    ChargersList,
    ChargerFilters,
  },
  async mounted() {
    await this.fetchIndex();
  },
  computed: {
    ...mapGetters('chargersModule', [
      'isIndexLoaded',
    ])
  },
  methods: {
    ...mapActions('chargersModule', [
      'fetchIndex',
    ]),
  },
}
</script>
