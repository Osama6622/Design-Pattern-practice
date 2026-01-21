<template>
    <div class="mb-6">
        <div class="flex flex-wrap gap-3 items-start">
            <div class="flex-1 flex flex-col gap-1">
                <input
                    type="text"
                    v-model="taskInput"
                    @keypress="handleKeypress"
                    @blur="v$.taskInput.$touch"
                    placeholder="Enter a new task..."
                    :class="[
                        'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800',
                        v$.taskInput.$error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    ]"
                />
                <span v-if="v$.taskInput.$error" class="text-xs text-red-500 ml-1">
                    {{ v$.taskInput.$errors[0].$message }}
                </span>
            </div>

            <div class="flex flex-col gap-1">
                <select
                    v-model="taskType"
                    @blur="v$.taskType.$touch"
                    :class="[
                        'px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800',
                        v$.taskType.$error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    ]"
                >
                    <option value="simple">Simple</option>
                    <option value="urgent">Urgent</option>
                    <option value="project">Project</option>
                </select>
                <span v-if="v$.taskType.$error" class="text-xs text-red-500 ml-1">
                    Required
                </span>
            </div>
        
        <button
            @click="handleAddTask"
            class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 h-[50px]"
        >
            <Plus class="w-5 h-5" />
            Add
        </button>
        
        <button
            @click="undo"
            :disabled="isUndoEmpty"
            class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-300 h-[50px]"
        >
            Undo
        </button>
    </div>
</div>
</template>


<script setup>
import { useTaskStore } from '../stores/taskStore';
import { Plus } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

const store = useTaskStore();
const { taskInput, taskType, isUndoEmpty } = storeToRefs(store);
const { addTask, undo } = store;

const rules = {
    taskInput: { required, minLength: minLength(3) },
    taskType: { required }
};

const v$ = useVuelidate(rules, { taskInput, taskType });

const handleAddTask = async () => {
    const isFormValidated = await v$.value.$validate();
    if (isFormValidated) {
        addTask();
        v$.value.$reset();
    }
};

const handleKeypress = (e) => {
    if (e.key === 'Enter') handleAddTask();
};
</script>
