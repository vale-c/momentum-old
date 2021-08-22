export const getRandom = (items) => { //pick a random name from the nameData list at the bottom of the Greeting component
    return items[items.length * Math.random() | 0];
}