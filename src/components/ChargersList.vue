<template>
  <div>
    <q-list>
      <q-item 
        v-for="item in localItems" :key="item.slug" clickable 
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

        <q-item-section side top>
          <RatingIndicator :rating="item.rating" :label="getRatingsValuesMap[item.rating]" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="row justify-center">
      <q-btn 
        v-if="hasMoreItems" 
        outline
        text-color="primary"
        label="Load more..."
        class="q-mt-md q-mb-md"
        @click="loadNextPortion()"
      />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RatingIndicator from './RatingIndicator';

export default {
    name: 'ChargersList',
    components: {
      RatingIndicator,
    },
    data() {
      return {
        start: 0,
        localItems: [],
      };
    },
    props: {
      items: {
        type: Array,
      },
      pageSize: {
        type: Number,
        default: 20,
      }
    },
    mounted() {
      this.loadNextPortion();
    },
    watch: {
      items() {
        this.start = 0;
        this.localItems = [];
        this.loadNextPortion();
      },
    },
    computed: {
      ...mapGetters('chargersModule', [
        'getRatingsValuesMap',
      ]),
      hasMoreItems() {
        return this.localItems.length < this.items.length; 
      }
    },
    methods: {
      loadNextPortion() {
        this.localItems.push(...this.items.slice(this.start, this.start + this.pageSize));
        this.start = this.start + this.pageSize;
      },
    },
}
</script>