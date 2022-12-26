interface PhotosGetType {
  page: number;
  total: number;
  user: string | number;
}

export const API_URL = 'https://dogsapi.origamid.dev/json';

export function TOKEN_POST(body: { username: string; password: string }) {
  return {
    url: `${API_URL}/jwt-auth/v1/token`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token: string) {
  return {
    url: `${API_URL}/jwt-auth/v1/token/validate`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function USER_GET(token: string) {
  return {
    url: `${API_URL}/api/user`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function USER_POST(body: {
  username: string;
  password: string;
  email: string;
}) {
  return {
    url: `${API_URL}/api/user`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function PHOTO_POST(token: string, formData: FormData) {
  return {
    url: `${API_URL}/api/photo`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function PHOTOS_GET({ page, total, user }: PhotosGetType): {
  url: URL | RequestInfo;
  options: RequestInit;
} {
  return {
    url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function PHOTO_GET(id: number): {
  url: URL | RequestInfo;
  options: RequestInit;
} {
  return {
    url: `${API_URL}/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function COMMENT_POST(
  token: string,
  params: { id: number; comment: string }
) {
  return {
    url: `${API_URL}/api/comment/${params.id}`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: params.comment }),
    },
  };
}

export function PHOTO_DELETE(token: string, params: { id: number }) {
  return {
    url: `${API_URL}/api/photo/${params.id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function PASSWORD_LOST_POST(login: string) {
  return {
    url: `${API_URL}/api/password/lost`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, url: window.location.origin + '/resetar' }),
    },
  };
}

export function PASSWORD_RESET_POST(body: {
  login: string;
  key: string;
  password: string;
}) {
  return {
    url: `${API_URL}/api/password/reset`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function STATS_GET(token: string) {
  return {
    url: `${API_URL}/api/stats`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}
