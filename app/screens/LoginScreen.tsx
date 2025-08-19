import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { storageToken } from "../utils/auth";


export default function LoginScreen({ navigation }: any) {
    const [username, setUsername] = useState<string>(''),
        [password, setPassword] = useState<string>(''),
        [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = async () => {
        if (username === 'admin' && password === '1234') {
            await storageToken('demo-token');
            navigation.replace('Home');
        }
        else {
            Alert.alert('Invalid Login');
        }
    };

    return (
        <View style={styles.container} >
            <View style={styles.subContainer}>
                <TextInput style={styles.input} placeholder="Enter username" value={username} onChangeText={setUsername} />
            </View>

            <View style={styles.subContainer}>

                <TextInput
                    placeholder="Enter password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)} >
                    <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={22} color='gray' />
                </TouchableOpacity>

            </View>

            <Button title="Login" onPress={handleLogin}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 5
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 0,
        outline: '',
        userSelect: 'none'
    },
    icon: {
        padding: 5
    }
})