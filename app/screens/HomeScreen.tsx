import { Button, Text, View } from "react-native";
import { removeToken } from "../utils/auth";

export default function HomeScreen({ navigation }: any) {
    const logout = async () => {
        await removeToken();
        navigation.replace('Login');
    };

    return (
        <View>
            <Text>
                Welcome to BizMan!
            </Text>
            <Button title="Go Clients" onPress={()=>navigation.replace('Clients')} />
            <Button title="Logout" onPress={logout} />
        </View>
    )
}