const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  async function getOwnUser() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function createThread({ title, body }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function getDetailThread(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  async function createComment({ id, comments }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments,
        }),
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    return comment;
  }

  async function upVoteThread(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
  }

  async function downVoteThread(id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
  }

  async function neutralizeVoteThread(id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/neutral-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJson = response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function upVoteComment(id, comment_id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments/${comment_id}/up-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function downVoteComment(id, comment_id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments/${comment_id}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function neutralizeVoteComment(id, comment_id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments/${comment_id}/neutral-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function seeLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJson = response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;

    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnUser,
    createThread,
    getAllThreads,
    getDetailThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteComment,
    seeLeaderboards,
  };
})();

export default api;
