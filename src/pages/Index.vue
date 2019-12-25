<template>
  <q-page>

    <div
      v-if="!items" 
      class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-if="items">
      <ChargerFilters />

      <q-separator class="q-mb-xs" />

      <ChargersList :items="currentList" />
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
  data() {
    return {
      items: null,
    };
  },
  async mounted() {
    const index = await this.fetchIndex();
    this.items = index;
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
