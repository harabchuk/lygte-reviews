<template>
    <div 
        v-if="filterValues && currentFiltersLocal"
        class="q-ma-sm"
    >
        <div class="q-gutter-md row q-mb-md">
            <div class="col-md-2 col-sm-4 col-xs-6">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.type" :options="filterValues.type" label="Type" />
            </div>
        </div>

        <div class="row justify-end">
            <q-btn color="primary" label="Apply" @click="applyCurrentFilters(currentFiltersLocal)" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    name: "BatteryFilters",
    data() {
        return {
            currentFiltersLocal: null,
        };
    },
    mounted() {
        this.currentFiltersLocal = this.getCurrentFiltersCopy; 
    },
    watch: {
      currentFilters(v) {
          this.currentFiltersLocal = this.getCurrentFiltersCopy;
      },
    },
    computed: {
        ...mapState('batteriesModule', [
            'filterValues',
            'currentFilters',
        ]),
        ...mapGetters('batteriesModule', [
            'getCurrentFiltersCopy',
            'getRatingOptions'
        ]),
    },
    methods: {
        ...mapActions('batteriesModule', [
            'applyCurrentFilters',
        ]),
    },
}
</script>

