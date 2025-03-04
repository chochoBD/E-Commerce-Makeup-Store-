const { default: SummaryApi } = require("../common/index");

/**
 * Fetch category-wise products from the API.
 * @param {string} category - The category for which products are to be fetched.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category })
        });

        // Check if the response is okay (status 200-299)
        if (!response.ok) {
            const errorMessage = `Error: Received status ${response.status}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error("Error fetching category-wise products:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export default fetchCategoryWiseProduct;
