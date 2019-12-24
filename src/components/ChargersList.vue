<template>
  <q-list>
    <q-item 
      v-for="item in items" :key="item.slug" clickable 
      :to="{
        name: 'review',
        params: {
          slug: item.slug
        }
      }">
      <q-item-section avatar top>
        <q-avatar rounded size="64">
          <img :src="item.preview" />
        </q-avatar>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1" >
          <span class="text-weight-medium">{{ item.title }}</span>
        </q-item-label>
        <q-item-label caption lines="2">
          <span>{{ item.year }} </span>
          <span v-for="chem in item.chemistry">{{ chem }} </span>
          <span v-for="extra in item.extra">{{ extra }} </span>
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <RatingIndicator :rating="item.rating" :label="getRatingsValuesMap[item.rating]" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex';
import RatingIndicator from './RatingIndicator';

export default {
    name: 'ChargersList',
    components: {
      RatingIndicator,
    },
    props: {
      items: {
        type: Array,
      }
    },
    computed: {
      ...mapGetters('chargersModule', [
        'getRatingsValuesMap',
      ]),
    },
}
</script>