const BASE_URL = "http://localhost:8080/api/history-records";

export const UsersRecordApi = {
  async fetchUserRecords(userId: number) {
    const response = await fetch(`${BASE_URL}/users/${userId}/records`);
    if (!response.ok) {
      throw new Error(`Failed to fetch records for user ID: ${userId}`);
    }
    return response.json();
  },

  async addUserRecord(
    userId: number,
    record: { title: string; date: string; description: string }
  ) {
    const response = await fetch(`${BASE_URL}/${userId}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });
    if (!response.ok) {
      throw new Error("Failed to add user record");
    }
    return response.json();
  },
};
