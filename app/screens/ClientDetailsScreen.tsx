import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getClientSales } from "../db/database";

export default function ClientDetails({ route }: any) {
    const navigation: any = useNavigation();

    const { client } = route.params;
    const [sales, setSales] = useState<any[]>([]);

    useEffect(() => {
        getClientSales(client.id, (data: any[]) => {
            setSales(data);
        });
    }, []);

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{client.name}</Text>
            <Text>{client.phone}</Text>
            <Text>{client.email}</Text>

            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>Sales</Text>
            {
                sales.map((sale) => (
                    <View key={sale.id} style={{ marginVertical: 8, padding: 8, backgroundColor: '#eee' }}>
                        <Text>Amount : {sale.amount}</Text>
                        <Text>Date : {sale.date}</Text>
                    </View>
                ))
            }

            <Button mode="contained" style={{ marginTop: 16 }} onPress={() => navigation.navigate('AddSale', { client })}>
                Add Sale
            </Button>
        </ScrollView>
    )
}