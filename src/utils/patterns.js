
// Singleton Pattern - Logger
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

// Factory Pattern - Task Factory
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

// Stack - Undo/Redo functionality (last in first out)
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

// Queue - Task Queue (first in first out)
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