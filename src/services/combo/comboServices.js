import { ROOT_DOMAIN } from "../../utils/config";

const createCombo = async (data) => {
	try {
		let response = await fetch(`${ROOT_DOMAIN}/combo`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Network response was not ok');
		}
		const res = await response.json();
		return res;
	} catch (error) {
		throw error;
	}
}

const updateCombo = async (data) => {
	try {
			let response = await fetch(`${ROOT_DOMAIN}/combo/${data._id}`, {
					method: 'PUT',
					headers: {
							'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
					credentials: 'include',
			});
			if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || 'Network response was not ok');
			}
			const res = await response.json();
			return res;
	} catch (error) {
			throw error;
	}
}

const ComboService = {
	createCombo, updateCombo
};
export default ComboService;