<<template>
    <div 
        v-if="filterValues"
        class="q-ma-sm"
    >
        <div>Filters</div>
        <div class="q-gutter-md row q-mb-md">
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFilters.slots" :options="filterValues.slots" label="Slots" />
            </div>
            <div class="col">
                <q-select outlined use-chips dense multiple v-model="currentFilters.chemistry" :options="filterValues.chemistry" label="Chemistry" />
            </div>
        </div>
        <q-btn color="primary" label="Apply" @click="applyCurrentFilters(currentFilters)" />     
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "ChargerFilters",
    props: {
    },
    data() {
        return {
            currentFilters: {
                slots: [],
                current_all: [],
                current_single_max: [],
                chemistry: [],
            },
        };
    },
    computed: {
        ...mapState('chargersModule', [
            'filterValues',
        ]),
    },
    methods: {
        ...mapActions('chargersModule', [
            'applyCurrentFilters',
        ]),
    },
}
</script>

