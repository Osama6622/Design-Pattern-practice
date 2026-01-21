<template>
    <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-700">All Tasks</h3>
        <div v-if="tasks.length === 0">
            <p class="text-gray-600 font-medium">No tasks found, please add a task!</p>
        </div>
        <div v-else class="space-y-2">
            <div
                v-for="task in tasks"
                :key="task.id"
                :class="[
                    'p-4 rounded-lg border-2 transition-all',
                    task.completed ? 'bg-green-50 border-green-200' : 
                    task.type === 'urgent' ? 'bg-red-50 border-red-200' : 
                    task.type === 'project' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                ]"
            >
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 flex-1">
                        <button @click="toggleTask(task.id)">
                            <CheckCircle v-if="task.completed" class="w-6 h-6 text-green-600" />
                            <Circle v-else class="w-6 h-6 text-gray-400" />
                        </button>
                        <div>
                            <p :class="['font-medium', task.completed ? 'line-through text-gray-500' : 'text-gray-800']">
                                {{ task.title }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{ task.type }} • {{ task.priority }} priority
                            </p>
                        </div>
                    </div>
                    <button @click="deleteTask(task.id)" class="text-red-500 hover:text-red-700">
                        <Trash2 class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useTaskStore } from '../stores/taskStore';
import { CheckCircle, Circle, Trash2 } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

const store = useTaskStore();
const { tasks } = storeToRefs(store);
const { toggleTask, deleteTask } = store;
</script>
