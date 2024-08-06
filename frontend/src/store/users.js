import { csrfFetch } from "./csrf";

const GET_ALL_INSTRUCTORS = "studios/getAllInstructors";


const getAllInstructors = (payload) => ({
    type: GET_ALL_INSTRUCTORS,
    payload: payload
  });



export const thunkGetAllInstructors = () => async (dispatch) => {
    const res = await csrfFetch(`/api/instructors`);
    if (res.ok) {
      const data = await res.json();
      console.log(data)
      if (data.errors) {
        return;
      }
      dispatch(getAllInstructors(data));
    }
  };




const initialState = {};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_INSTRUCTORS: {
            let nextState = {};
              action.payload.Instructors.forEach((value) => {
                    nextState[value.id] = value;
              })
              return {
                  ...nextState
              };
          }
        default:
            return state;
    }
}

export default usersReducer;
