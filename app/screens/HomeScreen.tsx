import ClientChart from "@/components/charts/ClientChart";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getClients, initDatabase } from "../db/database";
import { removeToken } from "../utils/auth";

export default function HomeScreen({ navigation }: any) {
    const [clients, setClients] = useState<any[]>([]);

    const logout = async () => {
        await removeToken();
        navigation.replace('Login');
    };

    useEffect(() => {
        (async () => {
            await initDatabase();
            await loadClients();
        })();

    }, []);

    const loadClients = async () => {
        await getClients((data) => {
            console.log("data",data);
            setClients(data);
        })
    };
    const clientsData=clients ?? [];
    return (
        <View>
            <Text>
                Welcome to BizMan!
            </Text>

            <ClientChart clients={clients} />

            <Button title="Go Clients" onPress={() => navigation.navigate('Clients', { clientsData })} />
            <Button title="Logout" onPress={logout} />
        </View>
    )
}