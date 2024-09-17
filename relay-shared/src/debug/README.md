```typescript
export const largeLog = (message: string) => {
  console.log(`[large] ${message}`)
}
```

The code exports a function `largeLog` that takes a `string` parameter named `message`. When called, it logs the provided message to the console, prefixed with the string `"[large] "`.

I use this function for logging messages related to significant events or important information in my codebase. The `"[large] "` prefix helps visually distinguish these log statements from other less critical logging.

To use this logging function in other parts of the codebase, I import it as follows:

```typescript
import { largeLog } from './debug/largeLog'
```

Then I can invoke it by passing a string message as an argument:

```typescript
largeLog('This is an important message')
```

This will output the following to the console:

```
[large] This is an important message
```

By categorizing and prefixing log messages, it becomes easier to identify and filter relevant information during debugging or monitoring the application's behavior.
