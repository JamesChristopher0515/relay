import { Id, Todo } from '../../../RelayTypes';
export default function useTodo(id?: Id, opts?: any): readonly [Todo, {
    readonly create: any;
    readonly update: (update: Partial<Todo>) => Promise<any>;
    readonly remove: () => Promise<any>;
}];
//# sourceMappingURL=useTodo.d.ts.map