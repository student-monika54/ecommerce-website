const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL?.replace(/\/$/, '');

function toReadableMessage(responsePayload) {
  if (!responsePayload) {
    return 'Authentication failed. Please try again.';
  }

  return (
    responsePayload.message ||
    responsePayload.error ||
    responsePayload.detail ||
    'Authentication failed. Please try again.'
  );
}

function buildMockToken(email) {
  return `mock-${btoa(`${email}:${Date.now()}`)}`;
}

export async function login(credentials) {
  if (AUTH_API_BASE_URL) {
    const response = await fetch(`${AUTH_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        rememberMe: credentials.rememberMe,
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(toReadableMessage(payload));
    }

    const token = payload.token || payload.accessToken || payload.data?.token;

    if (!token) {
      throw new Error('The authentication response did not include a token.');
    }

    return {
      token,
      user: payload.user || payload.data?.user || null,
    };
  }

  // TODO: Replace this placeholder with the real backend auth endpoint when it becomes available.
  await new Promise((resolve) => setTimeout(resolve, 900));

  const email = credentials.email.trim().toLowerCase();
  const password = credentials.password.trim();

  if (email.includes('fail') || password.toLowerCase() === 'wrong-password') {
    throw new Error('Invalid email or password.');
  }

  return {
    token: buildMockToken(email),
    user: {
      email: credentials.email,
      name: credentials.email.split('@')[0] || 'ShopEase member',
    },
  };
}