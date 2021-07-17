export const initialState = localStorage.getItem('isLoggedin')==='true' || false;

export const Reducer = (state, action) => {
    if (action.type === "LOGIN") {
        return action.value;
    }
    return state;
}