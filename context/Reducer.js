const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        ...state,
        myList: action.payload,
      };
    case "ADD_MY_LIST":
      return {
        ...state,
        myList: [action.payload, ...state.myList],
      };
    case "REMOVE_MYLIST":
      return {
        ...state,
        myList: state.myList.filter(
          (monster) => monster.name !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default Reducer;
