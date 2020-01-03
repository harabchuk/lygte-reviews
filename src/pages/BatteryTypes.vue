<<template>
    <div class="q-pa-sm">
        <BatteryTypeCard 
            title="AA and AAA (Alkaline, lithium, NiMH) batteries" 
            imageSrc="/statics/batteries/images/aa-aaa-nimh.jpg"
            routeToList="{name: 'chargers'}"
            routeToComparison="{name: 'chargers'}"
        />
        <BatteryTypeCard 
            title="AA and AAA (Alkaline, lithium, NiMH) batteries" 
            imageSrc="/statics/batteries/images/aa-aaa-nimh.jpg"
            routeToList="{name: 'chargers'}"
            routeToComparison="{name: 'chargers'}"
        />     
    </div>
</template>

<script>
import BatteryTypeCard from '../components/BatteryTypeCard';

export default {
    name: "BatteryTypes",
    components: {
        BatteryTypeCard,
    },
};
</script>