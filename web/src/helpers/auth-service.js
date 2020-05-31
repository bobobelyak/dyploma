import jwtDecode from 'jwt-decode';

export class AuthService {
  static tokenExists() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  static getToken() {
    const token = localStorage.getItem('token');
    if (this.tokenExists()) {
      return token;
    }
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static decodeToken() {
    if (this.tokenExists()) {
      return jwtDecode(this.getToken());
    }
  }
}
