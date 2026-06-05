// import { GoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { googleLoginUser } from "../models/authThunks";

// export default function GoogleAuthBtn() {
//   const dispatch = useDispatch();

//   return (
//     <GoogleLogin
//     theme="filled_black"
//     size="large"
//     text="continue_with"
//       onSuccess={(credentialResponse) => {
//         if (!credentialResponse.credential) return;

//         dispatch(
//           googleLoginUser(
//             credentialResponse.credential
//           )
//         );
//       }}
//       onError={() => {
//         console.error("Google Login Failed");
//       }}
//     />
//   );
// }

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from '@mantine/core';
import { useDispatch } from "react-redux";
import { googleLoginUser } from "../models/authThunks";

export default function GoogleAuthBtn() {
  const login = useGoogleLogin((credentialResponse) => {
        if (!credentialResponse.credential) return;

        dispatch(
          googleLoginUser(
            credentialResponse.credential
          )
        );
      });

  return (
    <Button
      fullWidth
      size="md"
      color="black"
      leftSection={
        <img
          src="/google-svg.svg"
          alt="Google"
          className="h-6 w-6"
        />
      }
      onClick={() => login()}
    >
      Continue with Google
    </Button>
  );
}