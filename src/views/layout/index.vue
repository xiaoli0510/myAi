<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="h-screen">
            <SidebarTrigger />
            <router-view></router-view>
        </main>
    </SidebarProvider>
</template>