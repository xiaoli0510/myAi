<script setup lang="ts">
import { apiCreation } from '@/apis/home';
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { onMounted } from 'vue';

onMounted(async () => {
    const res = await apiCreation();
    console.log(res);

})
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main>
            <SidebarTrigger />
            <RouterView />
        </main>
    </SidebarProvider>
</template>