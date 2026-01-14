import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const getAllBases = () => async (dispatch) => {
	dispatch({ type: 'GET_BASES_REQUEST' });

	const response = await axios.get(
		`${API_BASE_URL}/myobowl/getallbases`,
	);
	// console.log(response);
	dispatch({ type: 'GET_BASES_SUCCESS', payload: response.data });
};

export const getAllSauces = () => async (dispatch) => {
	dispatch({ type: 'GET_SAUCES_REQUEST' });

	const response = await axios.get(
		`${API_BASE_URL}/myobowl/getallsauces`,
	);
	// console.log(response);
	dispatch({ type: 'GET_SAUCES_SUCCESS', payload: response.data });
};

export const getAllToppings = () => async (dispatch) => {
	dispatch({ type: 'GET_TOPPINGS_REQUEST' });

	const response = await axios.get(
		`${API_BASE_URL}/myobowl/getalltoppings`,
	);
	// console.log(response);
	dispatch({ type: 'GET_TOPPINGS_SUCCESS', payload: response.data });
};

export const getAllCheese = () => async (dispatch) => {
	dispatch({ type: 'GET_CHEESE_REQUEST' });

	const response = await axios.get(
		`${API_BASE_URL}/myobowl/getallcheese`,
	);
	// console.log(response);
	dispatch({ type: 'GET_CHEESE_SUCCESS', payload: response.data });
};

//add base
export const addBase = (base) => async (dispatch) => {
	dispatch({ type: 'ADD_BASE_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/addbase`,
			{ base: base },
		);
		console.log(response);
		dispatch({ type: 'ADD_BASE_SUCCESS' });
	} catch (error) {
		dispatch({ type: 'ADD_BASE_FAILED', payload: error });
	}
};
export const getBaseById = (baseid) => async (dispatch) => {
	dispatch({ type: 'GET_BASE_BY_ID_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/getbasebyid`,
			{ baseid: baseid },
		);
		console.log(response);
		dispatch({ type: 'GET_BASE_BY_ID_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'GET_BASE_BY_ID_FAILED', payload: error });
	}
};

//update base
export const updateBase = (updatedBase) => async (dispatch) => {
	dispatch({ type: 'UPDATE_BASE_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/updatebase`,
			{ updatedBase: updatedBase },
		);
		console.log(response);
		dispatch({ type: 'UPDATE_BASE_SUCCESS' });
		window.location.href = '/admin/baseslist';
	} catch (error) {
		dispatch({ type: 'UPDATE_BASE_FAILED', payload: error });
	}
};

//delete base
export const deleteBase = (baseid) => async (dispatch) => {
	dispatch({ type: 'DELETE_BASE_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/deletebase`,
			{ baseid: baseid },
		);
		console.log(response);
		dispatch({ type: 'DELETE_BASE_SUCCESS' });
		window.location.href = '/admin/baseslist';
	} catch (error) {
		dispatch({ type: 'DELETE_BASE_FAILED', payload: error });
	}
};

//add topping
export const addTopping = (topping) => async (dispatch) => {
	dispatch({ type: 'ADD_TOPPING_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/addtopping`,
			{ topping: topping },
		);
		console.log(response);
		dispatch({ type: 'ADD_TOPPING_SUCCESS' });
	} catch (error) {
		dispatch({ type: 'ADD_TOPPING_FAILED', payload: error });
	}
};

//get topping by id
export const getToppingById = (toppingid) => async (dispatch) => {
	dispatch({ type: 'GET_TOPPING_BY_ID_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/gettoppingbyid`,
			{ toppingid: toppingid },
		);
		console.log(response);
		dispatch({ type: 'GET_TOPPING_BY_ID_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'GET_TOPPING_BY_ID_FAILED', payload: error });
	}
};

//update topping
export const updateTopping = (updatedTopping) => async (dispatch) => {
	dispatch({ type: 'UPDATE_TOPPING_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/updatetopping`,
			{ updatedTopping: updatedTopping },
		);
		console.log(response);
		dispatch({ type: 'UPDATE_TOPPING_SUCCESS' });
		window.location.href = '/admin/toppingslist';
	} catch (error) {
		dispatch({ type: 'UPDATE_TOPPING_FAILED', payload: error });
	}
};
//delete topping
export const deleteTopping = (toppingid) => async (dispatch) => {
	dispatch({ type: 'DELETE_TOPPING_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/myobowl/deletetopping`,
			{ toppingid: toppingid },
		);
		console.log(response);
		dispatch({ type: 'DELETE_TOPPING_SUCCESS' });
		window.location.href = '/admin/toppingslist';
	} catch (error) {
		dispatch({ type: 'DELETE_TOPPING_FAILED', payload: error });
	}
};
