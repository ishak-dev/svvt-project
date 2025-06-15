import axios from "axios";

const API_URL_GET_FREE_SLOTS = "http://localhost:8080/api/availability";

export default class FreeSlotViewModel {
  async addFreeSlot(
    date: string,
    startTime: string,
    endTime: string
  ): Promise<void> {
    try {
      await axios.post(API_URL_GET_FREE_SLOTS, {
        date,
        startTime,
        endTime,
        isAvailable: true,
      });
    } catch (error) {
      throw new Error("Failed to add free slot");
    }
  }
}
