import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl text-red-500 font-bold mb-4">Welcome</Text>
    </View>
  );
}
