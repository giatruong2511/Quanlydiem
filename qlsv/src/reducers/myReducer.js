import cookies from "react-cookies"

// const state = { user: cookies.load('user') };


const myReducer = (user, action) => {
  switch (action.type) {
      case "login": 
          return action.payload
      case "logout":
          return null

  }

  return user
}

export default myReducer