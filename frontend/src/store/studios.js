import { csrfFetch } from "./csrf";

const GET_ALL_STUDIOS = "studios/getStudios";
const DELETE_STUDIO = "studios/deleteStudio"
const UPDATE_STUDIO = "studios/updateStudio"
const CREATE_STUDIO = "studios/createStudio"
const GET_STUDIO_DETAIL = "studios/getStudio"



const getAllStudios = (studios) => ({
  type: GET_ALL_STUDIOS,
  payload: studios,
});


const createStudio = (payload) => ({
  type: CREATE_STUDIO,
  payload: payload
})

const deleteStudio = (studioId) => ({
  type: DELETE_STUDIO,
  payload: studioId
})

const updateStudio = (payload) => ({
  type: UPDATE_STUDIO,
  payload: payload
})

const getDetail = (studio) => ({
    type: GET_STUDIO_DETAIL,
    payload: studio
})



export const thunkGetAllStudios = () => async (dispatch) => {
  const res = await csrfFetch(`/api/studios`);
  if (res.ok) {
    const data = await res.json();
    console.log(data)
    if (data.errors) {
      return;
    }
    dispatch(getAllStudios(data));
  }
};


export const thunkUpdateStudio = (payload, studioId) => async (dispatch) => {
  const res = await csrfFetch(`/api/studios/${studioId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  if (res.ok) {
    const updatedStudio = await res.json();
    dispatch(updateStudio(updatedStudio))
    return updatedStudio
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}


export const thunkCreateStudio = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/studios`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const studio = await response.json()
    dispatch(createStudio(studio))
    return studio
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export const thunkDeleteStudio = (studioId) => async (dispatch) => {
  const res = await csrfFetch(`/api/studios/${studioId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(deleteStudio(studioId))
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}


export const getStudioDetail= (studioId) => async (dispatch) => {
    const response = await csrfFetch(`/api/studios/${studioId}`)
    if (response.ok) {
        const studio = await response.json();
        dispatch(getDetail(studio));
        return studio
    }
}


const initialState = {};

function studiosReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_STUDIOS: {
          let nextState = {};
            action.payload.Studios.forEach((value) => {
                  nextState[value.id] = value;
            })
            return {
                ...state,
                ...nextState
            };
        }
        case CREATE_STUDIO: {
          let newState=structuredClone(state);
          const studio = action.payload;
          newState[studio.id] = studio;
          return newState
        }
        case UPDATE_STUDIO: {
          let newState = structuredClone(state);
          const studio = action.payload;
          newState[studio.id] = studio;
          return newState
        }
        case DELETE_STUDIO: {
          let newState = structuredClone(state);
          delete newState[action.payload];
          return newState
        }
        case GET_STUDIO_DETAIL: {
            const newState = structuredClone(state);
            const studio = action.payload; // unpack payload
            newState[studio.id] = studio;
            return newState
          }
        default:
            return state;
    }
}

export default studiosReducer;
