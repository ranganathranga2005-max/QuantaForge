/**
 * Core API Service — Shared Request Handler & Error Normalizer
 */

export async function request(url, options = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const res = await fetch(url, config);
    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { rawText: text };
    }

    if (!res.ok) {
      const errorMsg = data.detail?.message || data.detail || data.message || `Request failed with status ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    if (!err.status) {
      console.error(`Network or fetch error for ${url}:`, err);
    }
    throw err;
  }
}

export async function get(url) {
  return request(url, { method: 'GET' });
}

export async function post(url, body) {
  return request(url, { method: 'POST', body: JSON.stringify(body) });
}
