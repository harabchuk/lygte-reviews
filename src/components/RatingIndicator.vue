<<template>
    <div style="width: 9em">
        <q-linear-progress size="17px" :value="ratingPercent" color="secondary">
            <div class="absolute-full flex flex-center text-caption" style="color:white">
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