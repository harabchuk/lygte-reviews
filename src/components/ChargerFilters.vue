<<template>
    <div 
        v-if="filterValues && currentFiltersLocal"
        class="q-ma-sm"
    >
        <div class="q-gutter-md row q-mb-md">
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.slots" :options="filterValues.slots" label="Slots" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.chemistry" :options="filterValues.chemistry" label="Chemistry" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.power" :options="filterValues.power" label="Power" />
            </div>
        </div>
        <div class="q-gutter-md row q-mb-md">
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.extra" :options="filterValues.extra" label="Extra" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.year" :options="filterValues.year" label="Year" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFiltersLocal.rating" :options="getRatingOptions" label="Rating" />
            </div>
        </div>
        <q-btn color="primary" label="Apply" @click="applyCurrentFilters(currentFiltersLocal)" />     
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    name: "ChargerFilters",
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
        ...mapState('chargersModule', [
            'filterValues',
            'currentFilters',
        ]),
        ...mapGetters('chargersModule', [
            'getCurrentFiltersCopy',
            'getRatingOptions'
        ]),
    },
    methods: {
        ...mapActions('chargersModule', [
            'applyCurrentFilters',
        ]),
    },
}
</script>

