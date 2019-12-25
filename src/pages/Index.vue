<template>
  <q-page>

    <div
      v-if="!currentList.length" 
      class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-if="currentList.length">
      <ChargerFilters />

      <q-separator class="q-mb-xs" />

      <ChargersList />
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ChargersList from '../components/ChargersList';
import ChargerFilters from '../components/ChargerFilters';

export default {
  name: 'PageIndex',
  components: {
    ChargersList,
    ChargerFilters,
  },
  async mounted() {
    await this.fetchIndex();
  },
  computed: {
    ...mapState('chargersModule', [
      'currentList',
    ]),
  },
  methods: {
    ...mapActions('chargersModule', [
      'fetchIndex',
    ]),
  },
}
</script>
