<template>
    <q-page>
        <div class="reviewBody" v-if="review" v-html="review.html" />
    </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "Review",
    data() {
        return {
            review:null,
        };
    },
    async mounted() {
        this.review = await this.fetchReview(this.$route.params.slug);
        console.log(this.review);
    },
    methods: {
        ...mapActions('chargersModule', [
            'fetchReview',
        ]),
    },     
}
</script>

<style>
.reviewBody {
    padding: 0.5em;
    max-width: 60em;
}
.reviewBody > img {
    max-width: 100%;
    height: auto;
}
</style>