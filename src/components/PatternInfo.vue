
<template>
    <div class="space-y-4">
        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg text-start">
            <h3 class="font-bold text-purple-900 mb-2">🏭 Factory Pattern</h3>
            <p class="text-gray-700">TaskFactory creates different types of tasks (simple, urgent, project) with appropriate defaults.</p>
        </div>

        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-start">
            <h3 class="font-bold text-blue-900 mb-2">👁️ Observer Pattern</h3>
            <p class="text-gray-700">Vue's Reactivity System acts as the Observer here. Components subscribe to store state changes and get notified/re-rendered automatically.</p>
        </div>

        <div class="p-4 bg-green-50 border border-green-200 rounded-lg text-start">
            <h3 class="font-bold text-green-900 mb-2">🔒 Singleton Pattern</h3>
            <p class="text-gray-700">Logger class ensures only one instance exists throughout the application (Logger.getInstance()).</p>
        </div>

        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg text-start">
            <h3 class="font-bold text-orange-900 mb-2">📚 Stack (LIFO)</h3>
            <p class="text-gray-700">Used for undo functionality - last action performed is first to be undone (undoStack).</p>
        </div>

        <div class="p-4 bg-pink-50 border border-pink-200 rounded-lg text-start">
            <h3 class="font-bold text-pink-900 mb-2">🚶 Queue (FIFO)</h3>
            <p class="text-gray-700">Task queue maintains order of task creation - first task added is first in queue (taskQueue).</p>
        </div>

        <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-start">
            <h3 class="font-bold text-indigo-900 mb-2">🌳 Binary Search Tree</h3>
            <p class="text-gray-700">Organizes tasks by priority for efficient sorted retrieval (PriorityBST).</p>
        </div>
    </div>
</template>
