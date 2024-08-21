import { ENDPOINTS } from "./endpoints";

export const createUser = async (userData) => {
  try {
    const response = await fetch(ENDPOINTS.CREATE_USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed: ", error);
    throw error;
  }
};
