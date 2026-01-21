<template>
    <div class="space-y-2">
        <div v-for="(log, idx) in logs" :key="idx" class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <span class="text-sm text-gray-500">{{ log.time }}</span>
            <span class="ml-3 text-gray-800">{{ log.message }}</span>
        </div>
        <p v-if="logs.length === 0" class="text-gray-500 text-center py-8">
            No logs yet. Start adding tasks!
        </p>
    </div>
</template>


<script setup>
import { useTaskStore } from '../stores/taskStore';
import { storeToRefs } from 'pinia';

const store = useTaskStore();
const { logs } = storeToRefs(store);
</script>