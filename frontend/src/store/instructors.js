import { csrfFetch } from "./csrf";

const GET_ALL_STUDIO_INSTRUCTORS = "studios/getStudioInstructors";
const DELETE_INSTRUCTOR = "studios/deleteInstructor"
const UPDATE_INSTRUCTOR = "studios/updateInstructor"
const CREATE_INSTRUCTOR = "studios/createInstructor"




const getAllStudioInstructors = (studioId) => ({
  type: GET_ALL_STUDIO_INSTRUCTORS,
  payload: studioId,
});


const createInstructor= (payload) => ({
  type: CREATE_INSTRUCTOR,
  payload: payload
})

const deleteInstructor = (instructorId) => ({
  type: DELETE_INSTRUCTOR,
  payload: instructorId
})

const updateInstructor = (payload) => ({
  type: UPDATE_INSTRUCTOR,
  payload: payload
})




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

//take a file handle and convert it to a base 64 string to be added to json data
const toBase64 = file => new Promise((resolve, reject) => {
  //returns a promise to read that file
  //subscribes to the onload event from the file Reader event, and once the file is loaded, it "resolves" the promise
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export const thunkUpdateInstructor = (payload, profilePic, instructorId) => async (dispatch) => {

  const pic_b64data = profilePic ? await toBase64(profilePic) : undefined

  // create a new json object with the payload + b64 data
  const data_to_upload = {...payload, profilePic: pic_b64data};

  const res = await csrfFetch(`/api/instructors/${instructorId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data_to_upload)
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


export const thunkCreateInstructor = (payload, profilePic, studioId) => async (dispatch) => {

  const pic_b64data = profilePic ? await toBase64(profilePic) : undefined

  // create a new json object with the payload + b64 data
  const data_to_upload = {...payload, profilePic: pic_b64data};

  const response = await csrfFetch(`/api/studios/${studioId}/instructors`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data_to_upload)
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

function instructorsReducer(state = initialState, action) {
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

export default instructorsReducer;
