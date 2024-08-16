import { csrfFetch } from "./csrf";

const GET_ALL_DANCESTYLES = "studios/getDanceStyles";
const CREATE_CLASS_DANCE_STYLE = "classes/createDanceStyles"



const getAllDanceStyles = (payload) => ({
  type: GET_ALL_DANCESTYLES,
  payload: payload
});




export const thunkGetAllDanceStyles = () => async (dispatch) => {
  const res = await csrfFetch(`/api/dancestyles/`);
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(getAllDanceStyles(data));
  }
};





const initialState = {};

function dancestylesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DANCESTYLES: {
          let nextState = {};
            action.payload.DanceStyles.forEach((value) => {
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

export default dancestylesReducer;
