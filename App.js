import { StyleSheet } from 'react-native';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import initialScreen from './screens/initialScreen';
import loginScreen from './screens/loginScreen';
import registerScreen from './screens/registerScreen';
import passResetScreen from './screens/passResetScreen';
import homeScreen from './screens/homeScreen';
import favoritesScreen from './screens/favoritesScreen';
import movieOverview from './screens/movieOverview';


export default function App() {

  const Stack = createStackNavigator();

  const fonts = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });


  if (!fonts) {
    return <AppLoading />;
  }

  const Dark = {
    dark: true,
    colors: {
      primary: '#F54038',
      background: '#000000',
      card: '#000',
      text: '#ffff',
      border: '#000',
      notification: '#000',
    },
  };

  return (
    <NavigationContainer theme={Dark}>

      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          ...TransitionPresets.DefaultTransition,
        }}>
        <Stack.Screen options={{ headerShown: false }} name="Initial" component={initialScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular' }} name="Login" component={loginScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular', title: 'Cadastro' }} name="Register" component={registerScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular', title: 'Redefinir Senha' }} name="PassReset" component={passResetScreen} />
        <Stack.Screen options={{ headerBackVisible: false, headerTransparent: true, headerShadowVisible: false }} name="Home" component={homeScreen} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular', title: '', headerTransparent: true, headerShadowVisible: false }} name="Overview" component={movieOverview} />
        <Stack.Screen options={{ headerTitleAlign: 'center', headerTitleStyle: 'Inter_400Regular', title: 'Favoritos', headerTransparent: true, headerShadowVisible: false }} name="Favorites" component={favoritesScreen} />
      </Stack.Navigator>

    </NavigationContainer>


  );
}

const styles = StyleSheet.create({});
