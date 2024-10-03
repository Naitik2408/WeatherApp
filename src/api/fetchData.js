const fetchData = async (subUrl, location) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/${subUrl}?key=${import.meta.env.VITE_API_KEY}&q=${location}&days=7`);

        // Check if the response is ok (status 200-299)
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Parse response as JSON
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error.message);
        return null; // or return a fallback value or throw an error, based on your needs
    }
};

export default fetchData;
