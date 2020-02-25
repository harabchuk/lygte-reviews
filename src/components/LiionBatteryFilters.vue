<template>
    <div
        v-if="filterValues && currentFiltersLocal"
        class="q-ma-sm"
    >
        <div class="q-gutter-md row q-mb-md">
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.type" :options="filterValues.type" label="Type" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.size" :options="filterValues.size" label="Size" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.prot" :options="filterValues.prot" label="Protection" />
            </div>
        </div>

        <div class="q-gutter-md row q-mb-md">
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.top" :options="filterValues.top" label="Top" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.year" :options="filterValues.year" label="Year" />
            </div>
            <div class="col">
                <!--
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.rated_mah" :options="filterValues.rated_mah" label="Rated mAh" />
                -->
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
    name: "LiionBatteryFilters",
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
        ...mapState('liionBatteriesModule', [
            'filterValues',
            'currentFilters',
        ]),
        ...mapGetters('liionBatteriesModule', [
            'getCurrentFiltersCopy',
        ]),
    },
    methods: {
        ...mapActions('liionBatteriesModule', [
            'applyCurrentFilters',
        ]),
    },
}
</script>

