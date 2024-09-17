import TodayViewController from '../controllers/TodayViewController';
export default function usePendingInteractiveTodos() {
    const todayController = TodayViewController.use({});
    return todayController.todos.filter((t) => !t.complete && t.assignedResource);
}
//# sourceMappingURL=usePendingInteractiveTodos.js.map