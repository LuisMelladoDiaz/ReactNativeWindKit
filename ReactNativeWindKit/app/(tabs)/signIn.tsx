import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function SignInScreen() {
    const { session, signin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        signin({ email, password });
    };

    if (session) return <Redirect href="/" />;

    return (
        <SafeAreaView className="flex-1 justify-center px-5 bg-white dark:bg-black">
            <View>
                <Text className="text-6xl font-bold italic text-center mb-12 text-black dark:text-white">
                    SignIn
                </Text>

                <Text className="text-base mb-1 text-black dark:text-white">Email:</Text>
                <TextInput
                    placeholder="Enter your email..."
                    placeholderTextColor="#888"
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-black dark:text-white mb-4"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Text className="text-base mb-1 text-black dark:text-white">Password:</Text>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-black dark:text-white mb-6"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-black dark:bg-white py-3 rounded-lg items-center"
                >
                    <Text className="text-white dark:text-black text-lg font-semibold">Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
