<template>
    <div style="width: 7em">
        <q-linear-progress size="17px" :value="ratingPercent" color="grey-5">
            <div class="absolute-full flex flex-center text-caption text-uppercase" style="color: white; font-size: 70%" >
                {{ label }}
            </div>
        </q-linear-progress>     
    </div>
</template>

<script>
export default {
    name: 'RatingIndicator',
    props: {
        rating: {
            type: Number,
            required: true,
        },
        ratingMax: {
            type: Number,
            default: 7,
        },
        label: {
            type: String,
            default: '',
        },
    },
    computed: {
        ratingPercent() {
            return this.rating / this.ratingMax;
        },
    },
}
</script>