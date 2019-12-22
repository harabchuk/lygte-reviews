<template>
    <q-page>
        <div v-if="review" v-html="review.html" />
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