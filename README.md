### Target User Profile

- [ ] User can see the profile of other user

## Create Project

```
npx create-react-app coder-comm --template redux

- Install libraries

```

npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/lab
npm install react-router-dom@6 react-hook-form @hookform/resolvers yup
npm install axios numeral lodash jwt-decode change-case
npm install react-markdown rehype-raw date-fns react-dropzone react-toastify

```
Reset src/
Create .env, config.js
Setup axios
Setup React Hook Form
Setup utils/

```

Create Pages
Create Layouts
Create Routes

- / : HomePage
- /account : AccountPage
- /user/:userId : UserProfilePage
- /login : LoginPage
- /register : RegisterPage
- /\* : NotFoundPage

```

AuthProvider = AuthContext + userReducer
useAuth
LoginPage = RHF + auth.login
AuthRequire => Navigate to Login if not authenticated

```

RegisterPage
LoadingScreen
Persistent Login : Refresh page không trả về trang login

```

MainHeader & HomePage
 - MainHeader: AppBar, Menu, Avatar
 - HomePage: ProfileCover, Tabs (Profile, Friend, Request, AddFriend)
 - Divider & Conquer

```

```

```

Emoji Reaction
