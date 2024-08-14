import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "studios/getReviews";
const DELETE_REVIEW = "studios/deleteReview"
const UPDATE_REVIEW = "studios/updateReview"
const CREATE_REVIEW = "studios/createReview"




const getAllReviews = (studioId) => ({
  type: GET_ALL_REVIEWS,
  payload: studioId,
});


const createReview= (payload) => ({
  type: CREATE_REVIEW,
  payload: payload
})

const deleteReview = (instructorId) => ({
  type: DELETE_REVIEW,
  payload: instructorId
})

const updateReview = (payload) => ({
  type: UPDATE_REVIEW,
  payload: payload
})




export const thunkGetAllReviews = (studioId) => async (dispatch) => {
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


export const thunkUpdateInstructor = (payload, instructorId) => async (dispatch) => {
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


export const thunkDeleteInstructor = (instructorId) => async (dispatch) => {
  const res = await csrfFetch(`/api/instructors/${instructorId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(deleteInstructor(instructorId))
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}



const initialState = {};

function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_STUDIO_INSTRUCTORS: {
          let nextState = {};
            action.payload.Instructors.forEach((value) => {
                  nextState[value.id] = value;
            })
            return {
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

export default reviewsReducer;
