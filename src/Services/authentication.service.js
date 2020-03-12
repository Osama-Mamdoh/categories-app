import { BehaviorSubject } from "rxjs";
import { Role } from "../Helpers";
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(data) {
  let users = [
    {
      id: 1,
      username: "admin",
      password: "admin",
      firstName: "Admin",
      lastName: "User",
      role: Role.Admin
    },
    {
      id: 2,
      username: "user",
      password: "user",
      firstName: "Normal",
      lastName: "User",
      role: Role.User
    }
  ];
  return new Promise(function(resolve, reject) {
    const user = users.find(
      x => x.username === data.username && x.password === data.password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
      resolve(user);
    } else {
      reject("Username or password is incorrect");
    }
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
