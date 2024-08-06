import { csrfFetch } from "./csrf";

const GET_ALL_INSTRUCTORS = "studios/getAllInstructors";
const GET_ALL_STUDIO_INSTRUCTORS = "studios/getStudioInstructors";
const DELETE_INSTRUCTOR = "studios/deleteStudio"
const UPDATE_INSTRUCTOR = "studios/updateStudio"
const CREATE_INSTRUCTOR = "studios/createStudio"


const getAllInstructors = () => ({
    type: GET_ALL_INSTRUCTORS,
    payload: payload,
  });

const getAllStudioInstructors = (studioId) => ({
  type: GET_ALL_STUDIO_INSTRUCTORS,
  payload: studioId,
});


const createInstructor= (payload) => ({
  type: CREATE_STUDIO,
  payload: payload
})

const deleteInstructor = (studioId) => ({
  type: DELETE_STUDIO,
  payload: studioId
})

const updateInstructor = (payload) => ({
  type: UPDATE_STUDIO,
  payload: payload
})





export const thunkGetAllInstructors = () => async (dispatch) => {
    const res = await csrfFetch(`/api/instructors/instructors`);
    if (res.ok) {
      const data = await res.json();
      console.log(data)
      if (data.errors) {
        return;
      }
      dispatch(getAllInstructors(data));
    }
  };



export const thunkGetAllStudioInstructors = (studioId) => async (dispatch) => {
  const res = await csrfFetch(`/api/studios/${studioId}/instructors`);
  if (res.ok) {
    const data = await res.json();
    console.log(data)
    if (data.errors) {
      return;
    }
    dispatch(getAllStudioInstructors(data));
  }
};


export const thunkUpdateStudio = (payload, instructorId) => async (dispatch) => {
  const res = await csrfFetch(`/api/instructors/${instructorId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  if (res.ok) {
    const updatedInstructor = await res.json();
    dispatch(updateInstructor(updatedInstructor))
    return updatedInstructor
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}


export const thunkCreateInstructor = (payload, studioId) => async (dispatch) => {
  const response = await csrfFetch(`/api/studios/${studioId}/instructors`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const instructor = await response.json()
    dispatch(createInstructor(instructor))
    return instructor
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export const thunkDeleteInstructor= (instructorId) => async (dispatch) => {
  const res = await csrfFetch(`/api/instructors/${instructorId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(deleteInstructor(studioId))
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}



const initialState = {};

function instructorsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_STUDIO_INSTRUCTORS: {
          let nextState = {};
            action.payload.Instructors.forEach((value) => {
                  nextState[value.id] = value;
            })
            return {
                ...state,
                ...nextState
            };
        }
        case GET_ALL_INSTRUCTORS: {
            let nextState = {};
              action.payload.Users.forEach((value) => {
                    nextState[value.id] = value;
              })
              return {
                  ...state,
                  ...nextState
              };
          }
        case CREATE_INSTRUCTOR: {
          let newState=structuredClone(state);
          const instructor = action.payload;
          newState[instructor.id] = instructor;
          return newState
        }
        case UPDATE_INSTRUCTOR: {
          let newState = structuredClone(state);
          const instructor = action.payload;
          newState[instructor.id] = instructor;
          return newState
        }
        case DELETE_INSTRUCTOR: {
          let newState = structuredClone(state);
          delete newState[action.payload];
          return newState
        }
        default:
            return state;
    }
}

export default instructorsReducer;
