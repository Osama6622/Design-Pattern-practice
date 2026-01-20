
<script setup>
import { useTaskStore } from '../stores/taskStore';
import { storeToRefs } from 'pinia';

const store = useTaskStore();
const { priorityTasks } = storeToRefs(store);
</script>

<template>
    <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-700">Priority Sorted (BST)</h3>
        <!-- Design Pattern: Binary Search Tree used for sorting -->
        <div class="space-y-2">
            <div
                v-for="task in priorityTasks"
                :key="task.id"
                class="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
                <p class="font-medium text-gray-800">{{ task.title }}</p>
                <p class="text-sm text-blue-600">Priority: {{ task.priority }}</p>
            </div>
            <div v-if="priorityTasks.length === 0" class="text-gray-500 italic">
                No tasks to sort.
            </div>
        </div>
    </div>
</template>
