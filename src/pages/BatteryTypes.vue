<<template>
    <q-page>
        <div class="row">
            <div class="col-md-4 col-sm-8 col-xs-12">
                <BatteryTypeCard 
                    title="AA and AAA batteries" 
                    subTitle="Alkaline, lithium, NiMH"
                    imageSrc="/statics/batteries/images/AA-AAA-batteries.jpg"
                    :routeToList="{name: 'chargers'}"
                    :routeToComparison="{name: 'chargers'}"
                />
            </div>
            <div class="col-md-4 col-sm-8 col-xs-12">
                <BatteryTypeCard 
                    title="9V batteries" 
                    subTitle="Alkaline, lithium, NiMH etc."
                    imageSrc="/statics/batteries/images/9v-batteries.jpg"
                    :routeToList="{name: 'chargers'}"
                    :routeToComparison="{name: 'chargers'}"
                />
            </div>
            <div class="col-md-4 col-sm-8 col-xs-12">
                <BatteryTypeCard 
                    title="C and D batteries"
                    subTitle="Alkaline, lithium, NiMH"
                    imageSrc="/statics/batteries/images/C-D-batteries.jpg"
                    :routeToList="{name: 'chargers'}"
                    :routeToComparison="{name: 'chargers'}"
                />
            </div>
        </div>   
    </q-page>
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