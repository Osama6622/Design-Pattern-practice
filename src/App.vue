<template>
    <div class="min-h-screen app-container p-8">
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
                <h1 class="text-4xl font-bold text-gray-800 mb-6">
                    Vue 3 & Design Patterns Demo
                </h1>

                <!-- Tabs -->
                <div class="flex gap-2 mb-6 border-b">
                    <button
                        @click="setActiveTab('tasks')"
                        :class="['px-4 py-2 font-medium transition-colors', activeTab === 'tasks' ? 'active-tab' : 'text-gray-600 hover:text-gray-800']"
                    >
                        <Folder class="inline w-4 h-4 mr-2" />
                        Tasks
                    </button>
                    <button
                        @click="setActiveTab('logs')"
                        :class="['px-4 py-2 font-medium transition-colors', activeTab === 'logs' ? 'active-tab' : 'text-gray-600 hover:text-gray-800']"
                    >
                        <Users class="inline w-4 h-4 mr-2" />
                        Logs
                    </button>
                </div>

                <div v-if="activeTab === 'tasks'">
                    <TaskInput />
                    <div class="grid md:grid-cols-2 gap-6 mt-6">
                        <TaskList />
                    </div>
                </div>

                <div v-if="activeTab === 'logs'">
                    <LogList />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from './stores/taskStore';
import { storeToRefs } from 'pinia';
import { Folder, Users } from 'lucide-vue-next';
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';
import LogList from './components/LogList.vue';

const store = useTaskStore();
const { activeTab } = storeToRefs(store);

const setActiveTab = (tab) => {
    activeTab.value = tab;
};
</script>

<style scoped>
.app-container {
    min-height: 100vh;
}

.active-tab {
    color: #9333ea;
    border-bottom: 2px solid #9333ea;
}
</style>
