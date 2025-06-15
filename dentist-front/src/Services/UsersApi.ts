const BASE_URL = "http://localhost:8080/api/users";

export const UsersApi = {
  async fetchUsers() {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },

  async fetchUsersByEmail(email:any) {
    const response = await fetch(`${BASE_URL}/by-email/${email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    return response.json();
  },

  async addUser(user: {
    fullName: string;
    email: string;
    phoneNumber: string;
  }) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return response.json();
  },
};
