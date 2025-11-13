<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
import Layout from '@/views/layout/index.vue';
import { useLocalCache } from './hooks/useLocalCache';
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';
const { getCache } = useLocalCache()
const { getUserInfo } = useUserStore()
const userStore = useUserStore()

onMounted(() => {
  const token = getCache('token');
  if (token) {
    getUserInfo();
  } else {
    userStore.logout();
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
