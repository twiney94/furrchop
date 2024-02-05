import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface AuthState {
  username: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  username: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    authLogout: () => initialState,
  },
});

export const { authLogin, authLogout } = authSlice.actions;

// mimicking an async API login endpoint
const fakeLoginRequest = (username: string) =>
  new Promise<string>((resolve, reject) =>
    setTimeout(() => {
      username === "foo" ? resolve(username) : reject("No such user");
    }, 1000)
  );

// handling async login
export const doLogin = (username: string) => async (dispatch: AppDispatch) => {
  // incrementProgress is responsible for progress status.
  // Firing a spinner while fetching login info.
  // Replace incrementProgress, decrementProgress, and handleError with your actual implementations
  dispatch(incrementProgress()); // Assuming incrementProgress is a valid action creator
  const navigate = useNavigate();
  try {
    const userResponse = await fakeLoginRequest(username);
    dispatch(authLogin(userResponse));
    // if successful change our route to "dashboard"
    navigate("/dashboard");
  } catch (error) {
    handleError();
  } finally {
    dispatch(decrementProgress()); // Assuming decrementProgress is a valid action creator
  }
};

export const authReducer = authSlice.reducer;

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

function incrementProgress(): any {
  throw new Error("Function not implemented.");
}

function handleError() {
  throw new Error("Function not implemented.");
}

function decrementProgress(): any {
  throw new Error("Function not implemented.");
}
