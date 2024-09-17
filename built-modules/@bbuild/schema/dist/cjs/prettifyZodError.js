"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettifyZodError = void 0;
const dash_1 = require('@bbuild/dash');
const format_terminal_1 = require('@bbuild/format-terminal');
function prettifyZodError(error, input, name) {
    let prettyError = '';
    // Check it's a zod error first
    if (!error.issues || !Array.isArray(error.issues)) {
        return error.message;
    }
    error.issues.forEach((issue) => {
        // prettyError += bold(colorize.red(`Issue: ${issue.code}\n`))
        // prettyError += colorize.green(`Path: ${issue.path.join('.')}\n`)
        // switch (issue.code) {
        //   case 'invalid_type':
        //     prettyError += colorize.yellow(
        //       `Expected ${issue.expected}, Received: ${issue.received}\n`
        //     )
        //     break
        //   case 'unrecognized_keys':
        //     prettyError += colorize.yellow(
        //       `Unrecognized Keys: ${issue.keys.join(', ')}\n`
        //     )
        //     break
        //   case 'invalid_union':
        //   case 'invalid_arguments':
        //   // case 'invalid_return_type':
        //   //   prettyError += colorize.yellow(
        //   //     `Union/Arguments/Return Type Errors: ${issue.unionErrors
        //   //       .map(prettifyZodError)
        //   //       .join('\n')}\n`
        //   //   )
        //   //   break
        //   // case 'invalid_enum_value':
        //   //   prettyError += colorize.yellow(
        //   //     `Valid Enum Options: ${issue.options.join(', ')}\n`
        //   //   )
        //   //   break
        //   case 'too_small':
        //   // case 'too_big':
        //   //   prettyError += colorize.yellow(
        //   //     `Type: ${issue.type}, Minimum: ${issue.minimum}, Maximum: ${issue.maximum}, Inclusive: ${issue.inclusive}\n`
        //   //   )
        //   //   break
        //   // case 'not_multiple_of':
        //   //   prettyError += colorize.yellow(
        //   //     `Should be multiple of: ${issue.multipleOf}\n`
        //   //   )
        //   //   break
        //   case 'custom':
        //     prettyError += colorize.yellow(
        //       `Custom Error Params: ${JSON.stringify(issue.params)}\n`
        //     )
        //     break
        //   default:
        //     break
        // }
        prettyError += `${format_terminal_1.colorize.red(`${issue.code} "${issue.message}"`)} ${format_terminal_1.colorize.blue('@' + (name ? name + '.' : '') + issue.path.join('.'))} \n`;
        if (input) {
            prettyError += format_terminal_1.colorize.yellow(`Received: ${JSON.stringify((0, dash_1.get)(input, issue.path))} of type ${typeof (0, dash_1.get)(input, issue.path)}\n`);
        }
        // prettyError += '\n'
    });
    return prettyError;
}
exports.prettifyZodError = prettifyZodError;
//# sourceMappingURL=prettifyZodError.js.map