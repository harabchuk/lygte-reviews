<template>
  <q-page class="">
    <ChargersList :items="items" />
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
      items: [],
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
