// import {
//   Button,
//   Paper,
//   PasswordInput,
//   Text,
//   TextInput,
//   Title,
// } from '@mantine/core';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import classes from './Auth.module.css';
// import { changePassword } from '../models/authThunks';
// import { useDispatch, useSelector } from 'react-redux';

// export default function ChangePasswordPage() {
//   const [email, setEmail] = useState('');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//     //   state => state.auth.user
//     // );
  
  
//     // useEffect(() => {
//     //   if (!user) return;
  
//     //   if (user.role === "faculty") {
//     //       navigate("/Faculty");
//     //   }
  
//     //   if (user.role === "student") {
//     //       navigate("/student");
//     //   }
  
//     //   if (user.role === "admin") {
//     //       navigate("/admin");
//     //   }
//     // }, [user]);

// function handleSubmit() {
// //   console.log("BUTTON CLICKED");

//   console.log({
//     email,
//     currentPassword,
//     newPassword,
//   });

//   if (!email || !currentPassword || !newPassword) {
//     // console.log("A field is empty");
//     return;
//   }

// //   console.log("DISPATCHING");

//   dispatch(
//     changePassword({
//       email,
//       currentPassword,
//       newPassword,
//     })
//   );
// }

//   return (
//     <div className={classes.wrapper}>
//       <Paper className={classes.form}>
//         <Title order={2} className={classes.title}>
//           Change your password
//         </Title>

//         <TextInput
//           label="Email address"
//           placeholder="your@email.com"
//           size="md"
//           radius="md"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <PasswordInput
//           label="Current password"
//           placeholder="Your current password"
//           mt="md"
//           size="md"
//           radius="md"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//         />

//         <PasswordInput
//           label="New password"
//           placeholder="Create a new password"
//           mt="md"
//           size="md"
//           radius="md"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />

//         {/* <PasswordInput
//           label="Confirm new password"
//           placeholder="Repeat your new password"
//           mt="md"
//           size="md"
//           radius="md"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         /> */}

//         <Button
//           fullWidth
//           mt="xl"
//           size="md"
//           radius="md"
//           onClick={handleSubmit}
//         >
//           Change password
//         </Button>

//         <Text ta="center" mt="md">
//           Remember your password?{' '}
//           <Text
//             component="button"
//             type="button"
//             fw={500}
//             c="blue"
//             variant="transparent"
//             p={0}
//             onClick={() => navigate('/login')}
//           >
//             Back to login
//           </Text>
//         </Text>
//       </Paper>
//     </div>
//   );
// }

import {
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classes from './Auth.module.css';
import { changePassword } from '../models/authThunks';

export default function ChangePasswordPage() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit() {
    if (!email || !currentPassword || !newPassword) {
      notifications.show({
        title: 'Missing fields',
        message: 'Please fill in all fields.',
        color: 'red',
      });

      return;
    }

    setLoading(true);

    try {
      await dispatch(
        changePassword({
          email,
          currentPassword,
          newPassword,
        })
      ).unwrap();

      notifications.show({
        title: 'Password changed',
        message: 'Your password has been changed successfully.',
        color: 'green',
      });

      setEmail('');
      setCurrentPassword('');
      setNewPassword('');

      navigate("/login");

    } catch (error) {
      notifications.show({
        title: 'Password change failed',
        message: error || 'Unable to change your password.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Change your password
        </Title>

        <TextInput
          label="Email address"
          placeholder="your@email.com"
          size="md"
          radius="md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Current password"
          placeholder="Your current password"
          mt="md"
          size="md"
          radius="md"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <PasswordInput
          label="New password"
          placeholder="Create a new password"
          mt="md"
          size="md"
          radius="md"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          fullWidth
          mt="xl"
          size="md"
          radius="md"
          onClick={handleSubmit}
          loading={loading}
        >
          Change password
        </Button>

        <Text ta="center" mt="md">
          Remember your password?{' '}
          <Text
            component="button"
            type="button"
            fw={500}
            c="blue"
            variant="transparent"
            p={0}
            onClick={() => navigate('/login')}
          >
            Back to login
          </Text>
        </Text>
      </Paper>
    </div>
  );
}