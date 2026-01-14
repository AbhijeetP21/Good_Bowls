export const getAllBowlsReducer = (state = { bowls: [] }, action) => {
	switch (action.type) {
		case 'GET_BOWLS_REQUEST':
			return {
				loading: true,
				...state,
			};
		case 'GET_BOWLS_SUCCESS':
			return {
				loading: false,
				bowls: action.payload,
			};
		case 'GET_BOWLS_FAILED':
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const addBowlReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_BOWL_REQUEST':
			return {
				loading: true,
				...state,
			};
		case 'ADD_BOWL_SUCCESS':
			return {
				loading: false,
				success: true,
			};
		case 'ADD_BOWL_FAILED':
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

//get bowl by id reducer
export const getBowlByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_BOWL_BY_ID_REQUEST':
			return {
				loading: true,
				...state,
			};
		case 'GET_BOWL_BY_ID_SUCCESS':
			return {
				loading: false,
				bowl: action.payload,
			};
		case 'GET_BOWL_BY_ID_FAILED':
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
//update bowl reducer
export const updateBowlReducer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_BOWL_REQUEST':
			return {
				updateloading: true,
				...state,
			};
		case 'UPDATE_BOWL_SUCCESS':
			return {
				updateloading: false,
				updatesuccess: true,
			};
		case 'UPDATE_BOWL_FAILED':
			return {
				updateloading: false,
				updateerror: action.payload,
			};
		default:
			return state;
	}
};
