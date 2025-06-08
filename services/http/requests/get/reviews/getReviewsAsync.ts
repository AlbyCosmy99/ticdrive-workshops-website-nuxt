import type { AxiosInstance } from "axios";

const getReviewsAsync = async (axios: AxiosInstance, workshopId: string) => {
    return await axios.get('reviews/' + workshopId)
}

export default getReviewsAsync