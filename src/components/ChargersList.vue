<template>
  <q-list>
    <q-item v-for="item in items" :key="item.slug" clickable to="/">
      <q-item-section avatar top>
        <q-avatar rounded size="64">
          <img :src="item.img" />
        </q-avatar>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1" >
          <span class="text-weight-medium">{{ item.name }}</span>
        </q-item-label>
        <q-item-label caption lines="1">
          <span>{{ item.properties.year }} </span>
          <span v-for="chem in item.properties.chemistry">{{ chem }} </span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
    name: 'ChargersList',
    props: {
      items: {
        type: Array,
      }
    }

}
</script>