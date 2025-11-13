<script setup lang="ts">
import { apiCreation } from '@/apis/home';
import { onMounted, ref } from 'vue';

const list = ref([])
onMounted(async () => {
    const res = await apiCreation();
    console.log(res);
    list.value = res.data.body.list

})
</script>

<template>
    这是Creation1
</template>