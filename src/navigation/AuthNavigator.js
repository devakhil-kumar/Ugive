import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/Login';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ResetPasswordScreen from '../screens/auth/forgotScreens/ResetPasswordScreen';
import VerfyOtp from '../screens/auth/forgotScreens/VerfyOtp';
import SplashScreen from '../screens/auth/SplashScreen';
import TermsScreen from '../screens/auth/TermsScreen'
import PrivacyPolicy from '../screens/auth/PrivacyPolicyScreen'
import YourRegistrationScreen from '../screens/auth/YourRegistrationScreen'

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="VerfyOtp" component={VerfyOtp} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="YourRegistrationScreen" component={YourRegistrationScreen} />

    </Stack.Navigator>
  );
};

export default AuthNavigator;
