<template>
    <q-card>
        <img v-if="imageSrc" :src="imageSrc" />
        <div class="text-h6 q-ml-xs">{{ title }}</div>
        <q-list>
            <q-item clickable v-if="routeToComparison" to="routeToComparison">
                <q-item-section avatar>
                    <q-icon color="primary" name="fas fa-balance-scale-right" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>Comparison</q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickablei v-if="routeToList" to="routeToList">
                <q-item-section avatar>
                    <q-icon color="primary" name="fas fa-list" />
                </q-item-section>

                <q-item-section>
                    <q-item-label>List</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-card>
</template>

<script>
export default {
    name: "BatteryTypeCard",
    props: {
        imageSrc: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            required: true,
        },
        routeToList: {
            type: Object,
            default: null,
        },
        routeToComparison: {
            type: Object,
            default: null,
        },
    },
};
</script>