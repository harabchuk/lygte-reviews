<template>
  <q-page>

    <div
      v-if="!isIndexLoaded" 
      class="text-center">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div v-if="isIndexLoaded">

      <q-separator class="q-mb-xs" />

      <BatteriesList />
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BatteriesList from '../components/BatteriesList';

export default {
  name: 'Batteries',
  components: {
    BatteriesList,
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
