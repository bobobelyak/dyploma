const defaultHeaders = new Headers();
defaultHeaders.append('Content-Type', 'application/json');

export const request = async (method, url, params, clean, isFormData) => {
  let headers = defaultHeaders;

  if (isFormData) {
    headers = {};
  }

  const token = localStorage.getItem('token');

  if (token) {
    headers = new Headers(isFormData ? {} : defaultHeaders);
    headers.set('Authorization', `Bearer ${token}`);
  }

  let body;

  if (params) {
    body = JSON.stringify(params);
  }
  if (params && isFormData) {
    body = params;
  }

  try {
    const response = await fetch(clean ? url : `${API_BASE}/${url}`, {headers, method, body});

    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return {};
};

export const get = async url => request('GET', url, null);
export const create = async (url, params, isFormData) => request('POST', url, params, false, isFormData);
export const update = async (url, params) => request('PATCH', url, params);
export const remove = async (url, token, params) => request('DELETE', url, params);
