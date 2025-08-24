import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { insertSale } from "../db/database";

export default function AddSaleScreen({ route, navigation }: any) {
    const { client,loadClients } = route.params;

    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const handleAdd = async () => {
        if (!amount || !date) return;

        await insertSale(client.id, parseFloat(amount), date)
            .then(() => {
                //navigation.navigate('ClientDetails', { client });
                    loadClients();
                    navigation.goBack();
                
            });
    }

    return (
        <View style={{ padding: 16 }}>
            <TextInput label="Amount " value={amount} onChangeText={setAmount} keyboardType="numeric" style={{ marginBottom: 12 }} />
            <TextInput label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={{ marginBottom: 12 }} />
            <Button mode="contained" onPress={handleAdd} >Add Sale</Button>
        </View>
    )
}