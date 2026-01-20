
// DESIGN PATTERN: Singleton Pattern - Logger
export class Logger {
    static instance = null;
    logs = [];

    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message) {
        this.logs.push({ time: new Date().toLocaleTimeString(), message });
    }

    getLogs() {
        return this.logs;
    }
}

// DESIGN PATTERN: Factory Pattern - Task Factory
export class TaskFactory {
    static createTask(type, data) {
        const baseTask = {
            id: Date.now() + Math.random(),
            createdAt: new Date(),
            ...data
        };

        switch (type) {
            case 'simple':
                return { ...baseTask, type: 'simple', priority: 'medium' };
            case 'urgent':
                return { ...baseTask, type: 'urgent', priority: 'high', deadline: new Date(Date.now() + 86400000) };
            case 'project':
                return { ...baseTask, type: 'project', priority: 'medium', subtasks: [] };
            default:
                return baseTask;
        }
    }
}

// DESIGN PATTERN: Observer Pattern - Task Observer
export class TaskObserver {
    observers = [];

    subscribe(callback) {
        this.observers.push(callback);
    }

    notify(data) {
        this.observers.forEach(callback => callback(data));
    }
}

// DATA STRUCTURE: Stack - Undo/Redo functionality
export class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// DATA STRUCTURE: Queue - Task Queue
export class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// DATA STRUCTURE: Binary Search Tree - Priority Management
export class TreeNode {
    constructor(priority, task) {
        this.priority = priority;
        this.task = task;
        this.left = null;
        this.right = null;
    }
}

export class PriorityBST {
    constructor() {
        this.root = null;
    }

    insert(priority, task) {
        const newNode = new TreeNode(priority, task);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (priority < current.priority) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }

    inOrderTraversal(node = this.root, result = []) {
        if (node) {
            this.inOrderTraversal(node.left, result);
            result.push(node.task);
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }
}
