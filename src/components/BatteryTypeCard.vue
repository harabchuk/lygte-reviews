<template>
    <div class="q-pa-xs">
    <q-card>
        <q-img v-if="imageSrc" :src="imageSrc" :ratio="16/9" >
            <div class="absolute-bottom">
                <div class="text-h6">
                    {{ title }}
                </div>
                <div class="text-subtitle1">
                    {{ subTitle }}
                </div>
            </div>
        </q-img>
        
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
    </div>
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
        subTitle: {
            type: String,
            default: '',
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