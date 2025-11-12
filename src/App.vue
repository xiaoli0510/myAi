<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useLocalCache } from './hooks/useLocalCache';
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';
const { getCache } = useLocalCache()
const { getUserInfo } = useUserStore()

onMounted(() => {
  const token = getCache('token');
  console.log('token', token);
  if (token) {
    getUserInfo();
  }
})
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- 主要内容 -->
      <component :is="Component"></component>
    </router-view>
    <Toaster />
  </div>

</template>

<style scoped></style>
