1. What is the difference between var, let, and const?

-> Key Differences:
Scope: var is globally or function-scoped (accessible throughout the function/file). let and const are block-scoped (only accessible within {} curly braces).
Reassignment & Redeclaration:
var: Can be updated and redeclared.
let: Can be updated but not redeclared within the same scope.
const: Cannot be updated or redeclared. It must be initialized when declared.
Hoisting: var variables are hoisted and initialized as undefined. let and const are hoisted but not initialized, leading to a ReferenceError if accessed before declaration.
Objects and Arrays: While a const variable cannot be reassigned, the properties of an object or elements of an array declared with const can be changed. 

2. What is the spread operator (...)?

-> The spread operator (...) in JavaScript is a powerful feature that allows you to expand an iterable (like an array or string) or an object into its individual elements or properties. It's used to copy, combine, or manipulate data in a concise way.

Key Uses:

Copying Arrays and Objects: Create a shallow copy of an array or object.
Combining Arrays: Merge multiple arrays into one.
Function Arguments: Pass elements of an array as individual arguments to a function.
Object Merging: Combine properties from multiple objects.

3. What is the difference between map(), filter(), and forEach()?

forEach(): Executes a function for each element but doesn't return a new array. It's used for side effects like logging or updating external variables.

map(): Transforms each element and returns a new array with the transformed values. The original array remains unchanged.

filter(): Creates a new array containing only the elements that pass a certain condition. It doesn't modify the original array.

4. What is an arrow function?

-> Arrow functions, introduced in ES6, provide a concise syntax for writing JavaScript functions. They are defined using the => syntax and have a lexical `this` binding, meaning they inherit the `this` value from their surrounding context.

5. What are template literals?

-> Template literals are string literals that allow embedded expressions and multi-line strings. They are defined using backticks (`) instead of single or double quotes. Template literals provide a more convenient and readable way to create strings compared to traditional string concatenation.