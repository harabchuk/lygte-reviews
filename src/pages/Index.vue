<template>
  <q-page class="">
    <div
      v-if="!items" 
      class="text-center">
      <q-spinner
        color="primary"
        size="3em"
      />
    </div>
    <ChargersList v-if="items" :items="items" />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ChargersList from '../components/ChargersList';

export default {
  name: 'PageIndex',
  components: {
    ChargersList,
  },
  data() {
    return {
      items: null,
    };
  },
  async mounted() {
    console.log('index mounted');
    const index = await this.fetchIndex();
    this.items = index;
  },
  methods: {
    ...mapActions('chargersModule', [
      'fetchIndex',
      'fetchReview',
    ]),
  },
}
</script>
