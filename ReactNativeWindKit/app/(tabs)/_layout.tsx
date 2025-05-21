import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View, Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";

function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} className="w-5 h-5" tintColor="#151312" />
                <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        );
    }

    return (
        <View className="w-full h-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} className="w-5 h-5" tintColor="#A8B5DB" />
        </View>
    );
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: Platform.select({ ios: 36, android: 50 }),
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: Colors[colorScheme ?? "light"].background,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile" />
                    ),
                }}
            />
            <Tabs.Screen
                name="signIn"
                options={{
                    title: "SignIn",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Login" />
                    ),
                }}
            />
        </Tabs>
    );
}
