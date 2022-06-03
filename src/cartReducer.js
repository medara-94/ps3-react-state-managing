// Whatever we return from useReducer becomes the new state

// How do we reference the current state in the reducer? The first param always represent the current state
// How do we pass arguments? Pass arguments as prop on the action, like type, which is the only one obligatory
export default function cartReducer(cart, action){
    switch (action.type) {
        case "empty":
            return [];
        case "add":{
            const {id, sku} = action;
            const itemInCart = items.find((cart) => item.sku === sku);
            if (itemInCart) {
                //Return new array with the matching item replaced
                return cart.map((item) =>
                item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                //Return new array with the new item appended
                return [...cart, { id, sku, quantity: 1 }];
            };
            }
        case "updateQuantity":{
            const {sku, quantity} = action;
            return quantity === 0
                //We are telling to keep all items that aren't the one passed, whitch has qnt 0
                ? cart.filter((i) => i.sku !== sku)
                : cart.map((item) => item.sku === sku ? { ...item, quantity } : item);
         }     
        default:
            throw new Error("Unhandled action: "+ action.type);
    }
};