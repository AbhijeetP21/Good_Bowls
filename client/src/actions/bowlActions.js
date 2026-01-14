import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const getAllBowls = () => async (dispatch) => {
	dispatch({ type: 'GET_BOWLS_REQUEST' });

	try {
		const response = await axios.get(
			`${API_BASE_URL}/bowls/getallbowls`,
		);
		// console.log(response);
		dispatch({ type: 'GET_BOWLS_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'GET_BOWLS_FAILED', payload: error });
	}
};

export const addBowl = (bowl) => async (dispatch) => {
	dispatch({ type: 'ADD_BOWL_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/bowls/addbowl`,
			{ bowl: bowl },
		);
		console.log(response);
		dispatch({ type: 'ADD_BOWL_SUCCESS' });
	} catch (error) {
		dispatch({ type: 'ADD_BOWL_FAILED', payload: error });
	}
};

//get bowl by id
export const getBowlById = (bowlid) => async (dispatch) => {
	dispatch({ type: 'GET_BOWL_BY_ID_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/bowls/getbowlbyid`,
			{ bowlid: bowlid },
		);
		console.log(response);
		dispatch({ type: 'GET_BOWL_BY_ID_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'GET_BOWL_BY_ID_FAILED', payload: error });
	}
};

//update bowl
export const updateBowl = (updatedBowl) => async (dispatch) => {
	dispatch({ type: 'UPDATE_BOWL_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/bowls/updatebowl`,
			{ updatedBowl: updatedBowl },
		);
		console.log(response);
		dispatch({ type: 'UPDATE_BOWL_SUCCESS' });
		window.location.href = '/admin/bowlslist';
	} catch (error) {
		dispatch({ type: 'UPDATE_BOWL_FAILED', payload: error });
	}
};

//delete bowl
export const deleteBowl = (bowlid) => async (dispatch) => {
	dispatch({ type: 'DELETE_BOWL_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/bowls/deletebowl`,
			{ bowlid: bowlid },
		);
		console.log(response);
		alert('Bowl deleted successfully');
		dispatch({ type: 'DELETE_BOWL_SUCCESS' });
		window.location.reload();
	} catch (error) {
		dispatch({ type: 'DELETE_BOWL_FAILED', payload: error });
	}
};
