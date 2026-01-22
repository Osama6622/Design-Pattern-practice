# Vue3 Demo: Design Patterns Practice

A Practical Implementation of classic software design patterns using **Vue3 (Composition API)**.

**Live Demo:** https://vue3-design-pattern.netlify.app/

---

## 🛠 Tech Stack

* **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
* **State Management:** [Pinia](https://pinia.vuejs.org/)
* **Validation:** [Vuelidate](https://vuelidate-next.netlify.app/)
* **Styling:**  [Tailwind](https://tailwindcss.com/)

---

## 🏗️ Design Patterns Implemented

###  Factory Pattern
The `TaskFactory` is responsible for creating different tasks (Simple, Urgent, Project).

---

###  Observer Pattern
**Vue's Reactivity System** acts as the Observer here. Components subscribe to store changes and are automatically notified and re-rendered.

---

###  Singleton Pattern
`Logger` class ensures only one instance exists throughout the app.

---

###  Stack(LIFO)
Used for undo functionality - the last action performed is the first to be undone (undoStack).

---

##  Key Features

* **Reactive State:** Managed via Pinia stores for clean separation of concerns.
* **Form Validation:** Vuelidate ensures that tasks are only created when data satisfies business rules.
* **History Tracking:** Using the Stack structure to allow users to revert recent changes.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Osama6622/Design-Pattern-practice.git

1. **Install Dependencies**
   ```bash
   npm install

1. **Run The Project**
   ```bash
   npm run dev
