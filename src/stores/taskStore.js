
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Logger, TaskFactory, Stack, Queue, PriorityBST } from '../models/patterns';

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);
    const taskInput = ref('');
    const taskType = ref('simple');

    // Using refs for data structures. Since they mutate internal state, 
    // we might need to trigger updates manually or trust Vue's deep reactivity if `items` are accessed.
    // However, for classes like Stack, treating them as reactive objects is better.
    // But to keep it simple and close to React implementation, we will use them as plain objects 
    // and rely on actions to trigger state updates for derived data (like logs or queue info if needed).
    // Actually, Vue's `ref` wraps the object. `undoStack.value.push` works if `undoStack` is a ref to the instance.
    // But the instance methods mutate `this.items`. `this.items` needs to be reactive.
    // We can instantiate them and wrap in `reactive`?
    // Let's stick to simple: Store instance in a ref. Accessing `undoStack.value.items` should be reactive if `items` was an array.
    // But in class, `this.items = []`.
    // Let's re-instantiate or just allow shallow mutation and force update? 
    // Better: expose the primitive values (like `queueSize`) as computed props that depend on a version/trigger, 
    // OR just make the `items` array public and reactive?
    // The React code didn't use reactivity for Stack/Queue INTERNALS, it just used methods.
    // And `setLogs` updated the UI.
    // Here we want the UI to update when Stack changes (for undo button disabled state).
    // So we need `undoStack.isEmpty()` to be reactive.
    // We can add a `trigger` ref that we increment to force re-computation.

    const undoStack = ref(new Stack());
    const taskQueue = ref(new Queue());
    const logs = ref([]);
    const activeTab = ref('tasks');

    // Design Pattern: Singleton Pattern usage
    // We get the single instance of Logger to ensure consistent logging across the app.
    const logger = Logger.getInstance();

    // Force update helper
    const layoutTrigger = ref(0);
    const forceUpdate = () => { layoutTrigger.value++; };

    const addTask = () => {
        if (!taskInput.value.trim()) return;

        const newTask = TaskFactory.createTask(taskType.value, {
            title: taskInput.value,
            completed: false
        });

        undoStack.value.push({ type: 'add', task: newTask });
        tasks.value.push(newTask);
        taskQueue.value.enqueue(newTask);

        logger.log(`Task added: ${taskInput.value} (${taskType.value})`);
        logs.value = [...logger.getLogs()];
        taskInput.value = '';
        forceUpdate();
    };

    const toggleTask = (id) => {
        const index = tasks.value.findIndex(t => t.id === id);
        if (index !== -1) {
            const task = tasks.value[index];
            task.completed = !task.completed;
            // No undo for toggle in original code?
            // "const toggleTask... setTasks... logger.log"
            // Original code: No undoStack push for toggle.

            logger.log(`Task toggled: ${id}`);
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
            forceUpdate();
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
        logger.log('Undo performed');
        logs.value = [...logger.getLogs()];
        forceUpdate();
    };

    const priorityTasks = computed(() => {
        const bst = new PriorityBST();
        const priorityMap = { low: 1, medium: 2, high: 3 };

        tasks.value.forEach(task => {
            bst.insert(priorityMap[task.priority] || 2, task);
        });

        return bst.inOrderTraversal();
    });

    const queueInfo = computed(() => {
        // Depend on layoutTrigger to update when queue changes
        layoutTrigger.value;
        return {
            size: taskQueue.value.size(),
            front: taskQueue.value.front()
        };
    });

    const isUndoEmpty = computed(() => {
        layoutTrigger.value;
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
        priorityTasks,
        queueInfo,
        isUndoEmpty
    };
});
