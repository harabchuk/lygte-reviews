<template>
  <div v-if="currentList.length">
    <q-list>
      <q-item 
        v-for="item in currentListPortioned" :key="item.slug" clickable 
        :to="{
          name: 'review',
          params: {
            slug: item.slug
          }
        }">
        <q-item-section avatar top>
          <q-avatar rounded size="64" v-if="item.preview">
            <img :src="item.preview" />
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
        v-if="hasMorePortionedItems" 
        outline
        text-color="primary"
        label="Load more..."
        class="q-mt-md q-mb-md"
        @click="incrementCurrentPortionStart()"
      />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
    name: 'BatteriesList',
    computed: {
      ...mapGetters('batteriesModule', [
        'hasMorePortionedItems'
      ]),
      ...mapState('batteriesModule', [
        'currentList',
        'currentListPortioned',
      ]),
    },
    methods: {
      ...mapMutations('batteriesModule', [
        'incrementCurrentPortionStart',
      ]),
    },
}
</script>