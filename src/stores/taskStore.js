
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Logger, TaskFactory, Stack } from '../utils/patterns';

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);
    const taskInput = ref('');
    const taskType = ref('simple');
    // Undo (Last in First out)
    const undoStack = ref(new Stack());
    const logs = ref([]);
    const activeTab = ref('tasks');
    const logger = Logger.getInstance();


    const addTask = () => {
        if (!taskInput.value.trim()) return;

        const newTask = TaskFactory.createTask(taskType.value, {
            title: taskInput.value,
            completed: false
        });

        undoStack.value.push({ type: 'add', task: newTask });
        tasks.value.push(newTask);

        logger.log(`Task added: ${taskInput.value} (${taskType.value})`);
        logs.value = [...logger.getLogs()];
        taskInput.value = '';
        taskType.value = 'simple';
    };

    const toggleTask = (id) => {
        const index = tasks.value.findIndex(t => t.id === id);
        if (index !== -1) {
            const task = tasks.value[index];
            task.completed = !task.completed;
            logger.log(`Task toggled: ${task.title} (${task.completed ? 'completed' : 'incomplete'})`);
            logs.value = [...logger.getLogs()];
        }
    };

    const deleteTask = (id) => {
        const task = tasks.value.find(t => t.id === id);
        if (task) {
            undoStack.value.push({ type: 'delete', task });
            tasks.value = tasks.value.filter(t => t.id !== id);
            logger.log(`Task deleted: ${task.title}`);
            logs.value = [...logger.getLogs()];
        }
    };

    const undo = () => {
        if (undoStack.value.isEmpty()) return;

        const action = undoStack.value.pop();
        if (action.type === 'add') {
            tasks.value = tasks.value.filter(t => t.id !== action.task.id);
        } else if (action.type === 'delete') {
            tasks.value.push(action.task);
        }
        logger.log('Undo done');
        logs.value = [...logger.getLogs()];

    };


    const isUndoEmpty = computed(() => {

        return undoStack.value.isEmpty();
    });

    return {
        tasks,
        taskInput,
        taskType,
        logs,
        activeTab,
        addTask,
        toggleTask,
        deleteTask,
        undo,
        isUndoEmpty
    };
});
