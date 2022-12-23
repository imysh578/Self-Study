# What is Ownership?
- Ownership: a set of rules that govern how a Rust program manages memory

- Memory management
  - In other languages
    - garbage collection
    - explicitly allocate and free the memory
  - Rust
    - manages the memory through a system of ownerhsip with a set of rules that the compiler checks.
    - If any of the rules are violated, the program won't compile.

> NOTE: The **Stack** and the **Heap**
> 1. **Stack**
> - LIFO(Last In, First Out)
> - pushing: adding data
> - popping: removing data
> - stores fixed size data
> 2. **Heap**
> - stores data that has unkown size at complie itme and the size might change
> - When we put data on the heap, we request a certain amount of space.
> - *allocating on the heap*: The memory allocator finds an empty spot in the heap that is big enough, marks it as being in use, and returns a *pointer*, which is the address of that location.
> <br>
> - Pushing to the stack is faster than allocating on the heap because the allocator never has to search for a place to store new data; the location is always at the top of the stack.
> - Accessing data in the heap is slower than accessing data on the stack because you have to follow a pointer to get there.
> <br>
> - When the code calls a function, the values passed into the function (including, potentially, pointers to data on the heap), and the function's local variables get pushed onto the stack.
> - When the function is over, those values get popped off the stack.
> <br>
> So we need to do..
>   - Keeping the track of what parts of code are using what data on the heap
>   - minimizing the amount of duplicate data on the heap
>   - cleaning up unused data on the heap so we don't run out of space


