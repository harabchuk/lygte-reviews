<template>
  <div>
    <div v-if="currentList.length">
      <q-list>
        <q-item
          v-for="item in currentList" :key="item.slug" clickable
          :to="{
            name: 'charger-review',
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

          <q-item-section side top>
            <RatingIndicator :rating="item.rating" :label="getRatingsValuesMap[item.rating]" />
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row justify-center">
        <q-btn
          v-if="!processing && hasMorePortionedItems"
          outline
          text-color="primary"
          label="Load more..."
          class="q-mt-md q-mb-md"
          @click="fetchNextPage()"
        />
      </div>
    </div>
    <LoadingIndicator v-if="processing" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import RatingIndicator from './RatingIndicator';
import LoadingIndicator from './LoadingIndicator';

export default {
    name: 'ChargersList',
    components: {
      RatingIndicator,
      LoadingIndicator,
    },
    computed: {
      ...mapGetters('chargersModule', [
        'getRatingsValuesMap',
        'hasMorePortionedItems'
      ]),
      ...mapState('chargersModule', [
        'currentList',
        'processing',
      ]),
    },
    methods: {
      ...mapActions('chargersModule', [
        'fetchNextPage',
      ]),
    },
}
</script>
