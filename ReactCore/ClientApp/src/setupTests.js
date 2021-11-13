const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:16208';
// Mock the request issued by the react app to get the client configuration parameters.
window.fetch = () => {
  return Promise.resolve(
    {
      ok: true,
      json: () => Promise.resolve({
        "authority": `${target}`,
        "client_id": "ReactCore",
        "redirect_uri": `${target}/authentication/login-callback`,
        "post_logout_redirect_uri": `${target}/authentication/logout-callback`,
        "response_type": "id_token token",
        "scope": "ReactCoreAPI openid profile"
     })
    });
};
