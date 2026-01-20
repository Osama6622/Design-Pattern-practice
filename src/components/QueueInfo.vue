
<script setup>
import { useTaskStore } from '../stores/taskStore';
import { storeToRefs } from 'pinia';

const store = useTaskStore();
const { queueInfo } = storeToRefs(store);
</script>

<template>
    <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 class="font-semibold text-gray-800 mb-2">Queue Information</h4>
        <!-- Data Structure: Queue (FIFO) monitoring -->
        <p class="text-sm text-gray-600">Size: {{ queueInfo.size }}</p>
        <p v-if="queueInfo.front" class="text-sm text-gray-600">
            Front (Next in line): {{ queueInfo.front.title }}
        </p>
        <p v-else class="text-sm text-gray-600 italic">Queue is empty.</p>
    </div>
</template>
