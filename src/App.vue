<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
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
