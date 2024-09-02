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

//take a file handle and convert it to a base 64 string to be added to json data
const toBase64 = file => new Promise((resolve, reject) => {
  //returns a promise to read that file
  //subscribes to the onload event from the file Reader event, and once the file is loaded, it "resolves" the promise
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});


export const thunkUpdateStudio = (payload, logo, pic, studioId) => async (dispatch) => {

  const logo_b64data = logo ? await toBase64(logo) : undefined
  const pic_b64data = pic ? await toBase64(pic) : undefined

  // create a new json object with the payload + b64 data
  const data_to_upload = {...payload, logo: logo_b64data, pic: pic_b64data};

  const res = await csrfFetch(`/api/studios/${studioId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data_to_upload)
  });

  if (res.ok) {
    const updatedStudio = await res.json();
    dispatch(updateStudio(updatedStudio))
    return updatedStudio
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}



export const thunkCreateStudio = (payload, logo, pic) => async (dispatch) => {

  const logo_b64data = await toBase64(logo);
  const pic_b64data = await toBase64(pic);

  // create a new json object with the payload + b64 data
  const data_to_upload = {...payload, logo: logo_b64data, pic: pic_b64data};

  const response = await csrfFetch(`/api/studios`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data_to_upload)
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


export const getStudioDetail = (studioId) => async (dispatch) => {
    const response = await csrfFetch(`/api/studios/${studioId}`)
    if (response.ok) {
        const studio = await response.json();
        dispatch(getDetail(studio));
        return studio
    }
}

export const getCurrentUserStudios = () => async (dispatch) => {
  const response = await csrfFetch('/api/studios/current');
  if (response.ok) {
      const studios = await response.json();
      //object with key value of array for Studios
      dispatch(getAllStudios(studios))
      return studios
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
