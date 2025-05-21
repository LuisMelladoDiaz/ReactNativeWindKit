import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function Profile() {
    const { session, signout } = useAuth();

    const handleSignOut = async () => {
        signout();
    };

    //if (!session) return <Redirect href="/signIn" />;

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-4xl text-blue-500 font-bold mb-4">Perfil de Usuario</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                className="bg-black dark:bg-white py-3 rounded-lg items-center"
            >
                <Text className="text-white dark:text-black text-lg font-semibold">Salir</Text>
            </TouchableOpacity>
        </View>
    );
}
