import { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { account } from "../lib/appwriteConfig.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            try {
                const response = await account.get();
                if (mounted) {
                    setUser(response);
                    setSession(response);
                }
            } catch (error) {
                if (mounted) {
                    setUser(null);
                    setSession(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        checkAuth();

        return () => {
            mounted = false;
        };
    }, []);

    const signin = async ({ email, password }) => {
        setLoading(true);
        try {
            const responseSession = await account.createEmailPasswordSession(
                email,
                password
            );
            const responseUser = await account.get();
            
            setSession(responseSession);
            setUser(responseUser);
            return responseUser;
        } catch (error) {
            console.log("Signin error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signout = async () => {
        setLoading(true);
        try {
            await account.deleteSession("current");
            setSession(null);
            setUser(null);
        } catch (error) {
            console.log("Signout error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const contextData = {
        session,
        user,
        signin,
        signout,
        loading,
        isAuthenticated: !!session
    };
    
    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };

