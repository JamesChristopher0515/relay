## timing

The `timing` directory contains utility functions and classes related to handling time and scheduling tasks in the application. I use these utilities throughout the codebase to ensure consistent and reliable timing behavior.

### Files

#### `./timing/coerceAsync.ts`

This file exports a single function, `coerceAsync`, which ensures that any value passed to it is awaited, even if it is not a Promise. I find this useful when I want to treat both synchronous and asynchronous values the same way, without having to check the type of the input.

The function simply returns the input value, but wraps it in a Promise that resolves immediately if the input is not a Promise. This allows me to `await` the result without having to check if it is a Promise first.

#### `./timing/delay.ts`

The `delay` function in this file provides a simple way to pause the execution of code for a specified duration. It returns a Promise that resolves after the given number of milliseconds have elapsed.

I use this function to introduce artificial delays in my code, for example, to simulate network latency or other time-based behaviors during testing and development.

#### `./timing/Scheduler.ts`

The `Scheduler` class in this file provides a centralized way to manage and execute time-based tasks in my application. It allows me to schedule functions to run at specific times, with support for recurring tasks and task prioritization.

I designed the `Scheduler` class to be highly flexible and customizable, with options to control the behavior of scheduled tasks, such as whether they should run in the background or block the main thread.

The key exported members of the `Scheduler` class are:

- `schedule(task, delay, options)`: Schedules a task to run after the specified delay (in milliseconds).
- `cancel(taskId)`: Cancels a scheduled task by its ID.
- `run()`: Starts the scheduler and begins executing scheduled tasks.

For more information on using the `Scheduler` class, refer to the [Scheduler documentation](https://example.com/scheduler-docs).