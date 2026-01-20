
<script setup>
import { useTaskStore } from './stores/taskStore';
import { storeToRefs } from 'pinia';
import { Folder, Code, Users } from 'lucide-vue-next';

// Components
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';
import PriorityList from './components/PriorityList.vue';
import QueueInfo from './components/QueueInfo.vue';
import LogList from './components/LogList.vue';
import PatternInfo from './components/PatternInfo.vue';

const store = useTaskStore();
const { activeTab } = storeToRefs(store);

const setActiveTab = (tab) => {
    activeTab.value = tab;
};
</script>

<template>
    <div class="min-h-screen app-container p-8">
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
                <h1 class="text-4xl font-bold text-gray-800 mb-2">
                    Vue 3 Concepts Demo
                </h1>
                <p class="text-gray-600 mb-6">
                    Data Structures & Design Patterns Implementation
                </p>

                <!-- Navigation Tabs -->
                <div class="flex gap-2 mb-6 border-b">
                    <button
                        @click="setActiveTab('tasks')"
                        :class="['px-4 py-2 font-medium transition-colors', activeTab === 'tasks' ? 'active-tab' : 'text-gray-600 hover:text-gray-800']"
                    >
                        <Folder class="inline w-4 h-4 mr-2" />
                        Tasks
                    </button>
                    <button
                        @click="setActiveTab('patterns')"
                        :class="['px-4 py-2 font-medium transition-colors', activeTab === 'patterns' ? 'active-tab' : 'text-gray-600 hover:text-gray-800']"
                    >
                        <Code class="inline w-4 h-4 mr-2" />
                        Patterns Used
                    </button>
                    <button
                        @click="setActiveTab('logs')"
                        :class="['px-4 py-2 font-medium transition-colors', activeTab === 'logs' ? 'active-tab' : 'text-gray-600 hover:text-gray-800']"
                    >
                        <Users class="inline w-4 h-4 mr-2" />
                        Logs
                    </button>
                </div>

                <!-- Content Area -->
                <div v-if="activeTab === 'tasks'">
                    <TaskInput />
                    <div class="grid md:grid-cols-2 gap-6 mt-6">
                        <TaskList />
                        <div>
                            <PriorityList />
                            <QueueInfo />
                        </div>
                    </div>
                </div>

                <div v-if="activeTab === 'patterns'">
                    <PatternInfo />
                </div>

                <div v-if="activeTab === 'logs'">
                    <LogList />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Basic styling to mimic Tailwind utility classes used in the original React code */
.app-container {
    /* background: linear-gradient(to bottom right, #f3e8ff, #eff6ff); from-purple-50 to-blue-50 */
    min-height: 100vh;
}

.active-tab {
    color: #9333ea; /* text-purple-600 */
    border-bottom: 2px solid #9333ea;
}

/* 
   Since we aren't using Tailwind, some utility classes in components 
   (like `p-4`, `bg-white`, `rounded-lg`) won't work unless we define them 
   or import a utility library.
   
   For this demo, we'll assume a global CSS file (style.css) handles the basic utilities 
   or we accept that without Tailwind the layout might look unstyled.
   
   To fix this properly without Tailwind, we should add the essential utilities in style.css.
*/
</style>
