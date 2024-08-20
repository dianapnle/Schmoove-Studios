import { csrfFetch } from "./csrf";

const GET_ALL_CLASSES = "studios/getClasses";
const GET_A_CLASS = "studios/getClass"
const DELETE_CLASS = "studios/deleteClass"
const UPDATE_CLASS = "studios/updateClass"
const CREATE_CLASS = "studios/createClass"



const getAClass = (payload) => ({
  type: GET_A_CLASS,
  payload: payload,
});


const getAllClasses = (studioId) => ({
  type: GET_ALL_CLASSES,
  payload: studioId,
});


const createClass = (payload) => ({
  type: CREATE_CLASS,
  payload: payload
})

const deleteClass = (classId) => ({
  type: DELETE_CLASS,
  payload: classId
})

const updateClass = (payload) => ({
  type: UPDATE_CLASS,
  payload: payload
})




export const thunkGetAllClasses = (studioId) => async (dispatch) => {
  const res = await csrfFetch(`/api/studios/${studioId}/classes`);
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(getAllClasses(data));
  }
};


export const thunkGetAClass = (classId) => async (dispatch) => {
  const res = await csrfFetch(`/api/classes/${classId}`);
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(getAClass(data));
  }
};


export const thunkUpdateClass = (payload, classId) => async (dispatch) => {
  const res = await csrfFetch(`/api/classes/${classId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  if (res.ok) {
    const updatedClass = await res.json();
    dispatch(updateClass(updatedClass))
    return updatedClass
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}


export const thunkCreateClass = (payload, studioId) => async (dispatch) => {
  const response = await csrfFetch(`/api/studios/${studioId}/classes`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });


  if (response.ok) {
    const el = await response.json()
    dispatch(createClass(el))
    return el
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
}


export const thunkDeleteClass = (classId) => async (dispatch) => {
  const res = await csrfFetch(`/api/classes/${classId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(deleteClass(classId))
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}



const initialState = {};

function classesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CLASSES: {
          let nextState = {};
            action.payload.Classes.forEach((value) => {
                  nextState[value.id] = value;
            })
            return {
                ...nextState
            };
        }
        case GET_A_CLASS: {
          const newState = structuredClone(state);
          const el = action.payload; // unpack payload
          newState[el.id] = el;
          return newState
        }
        case CREATE_CLASS: {
          let newState=structuredClone(state);
          const el = action.payload;
          newState[el.id] = el;
          return newState
        }
        case UPDATE_CLASS: {
          let newState = structuredClone(state);
          const el = action.payload;
          newState[el.id] = el;
          return newState
        }
        case DELETE_CLASS: {
          let newState = structuredClone(state);
          delete newState[action.payload];
          return newState
        }
        default:
            return state;
    }
}

export default classesReducer;
