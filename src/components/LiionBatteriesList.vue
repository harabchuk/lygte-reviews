<template>
  <div>
    <div v-if="currentList.length">
      <q-list>
        <q-item
          v-for="item in currentList" :key="item.slug" clickable
          :to="{
            name: 'liion-battery-review',
            params: {
              slug: item.slug
            }
          }">
          <q-item-section avatar top>
            <q-avatar rounded size="64" v-if="item.preview">
              <q-img :src="item.preview" ratio="1"/>
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1" >
              <span class="text-weight-medium">{{ item.title }}</span>
            </q-item-label>
            <q-item-label caption lines="2">

            </q-item-label>
          </q-item-section>

          <q-item-section side top>

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
import LoadingIndicator from './LoadingIndicator';

export default {
    name: 'LiionBatteriesList',
    components: {
      LoadingIndicator,
    },
    computed: {
      ...mapGetters('liionBatteriesModule', [
        'hasMorePortionedItems'
      ]),
      ...mapState('liionBatteriesModule', [
        'currentList',
        'processing',
      ]),
    },
    methods: {
      ...mapActions('liionBatteriesModule', [
        'fetchNextPage',
      ]),
    },
}
</script>
