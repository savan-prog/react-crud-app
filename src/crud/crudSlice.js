import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //normal state hai (useState nahi hai to arr bhi normal variable hai arr nam ka jo ki array[] type ka hai)
  arr: [], // arr ki initial value empty array hai yha
};

export const crudSlice = createSlice({
  //creating slice
  name: "crud", //this is slice name
  initialState, //state
  reducers: {
    //data input vali state se array me add kr rhe by adduser function ke through
    adduser: (state, action) => {
      //adduser is function
      //action.payload  (action ke payload me data ko access karenge inputvalue name ki state se kyonki action ke payload me data ata hai)
      state.arr.push(action.payload); // ye normal javascript ki file hai to esme array ko direct arr ki methods se update kr skte hai kyonki arr bhi normal var hai
    },

    //delete user (task/data ko delete krna). ( deleteuser is function )
    deleteuser: (state, action) => {
      state.arr.splice(action.payload, 1); // splice method se delete kr rhe hai. esme kitne item delete kr rhe vo btana pdta hai. ek item delete kr rhe esliye 1 dia.
      //action ke payload me user jis item ko delete krna chahta hai uska index aa jayega
    },

    //edit/update User (task/data)  (edituser is function)
    // edituser : (state, action) => {
    //   let newArray =  state.arr.filter((items, index)=>{
    //         return action.payload==index;
    //     });
    //      setInputvalue(newArray[0]);
    // }

    updateuser: (state, action) => {
      state.arr = state.arr.map((user, index) => {
        // ye if vali condition nye updated user detail ke liye hai
        if (index === action.payload.index) {
          return action.payload.updatedUser; //ye updated detail ke liye hai return
        }
        return user; // index match nhi hua to jo user hai vo return kr do
      });
    },
  },
});

//export(send) actions
export const { adduser, deleteuser, updateuser } = crudSlice.actions;

//export reducer
export default crudSlice.reducer;

/* steps of redux toolkit functionality =>
    
   step 1.  "UI" se user ne command di any type of command like increment/decrement OR input value di OR something else .

    step 2. UI se "Action" ke pass user command aayegi ki kya krna hai.

    step 3. Action se "Reducer" ke pas action jayegi .. ki kya krna hai jo command aayi hai uske liye.

    step 4. Reducer se "Store" pe data jayega or Store se data access hoga then user ki command ka response/result jayega "UI" pe or task complete ho jayega.
*/

/*               File Type                                        |                         Naming Convention                                                                     
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Component files** (JSX/TSX)                                     | `PascalCase` (First letter capital) → e.g. `CounterComponent.jsx`                     |
| Logic/Utility files** (JS/TS like RTK slices, store, helpers)   | `camelCase` (first letter small) → e.g. `counterSlice.js`, `store.js`, `apiHelper.js` |
 */

/*  Case Type  |    Example    |        Use Where?                      
| ------------ | ------------- | ------------------------------- |
| `camelCase`  | userProfile   | Variables, functions, RTK files |
| `PascalCase` | UserProfile   | React components, classes       |
 */
