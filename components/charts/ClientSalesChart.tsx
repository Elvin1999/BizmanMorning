import { getClientSales } from "@/app/db/database";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

export default function ClientSalesChart({ clientId }: any) {
    const [salesData, setSalesData] = useState<any[]>([]);

    useEffect(() => {
        const fetch = async () => {
            await getClientSales(clientId, (sales) => {
                const data = sales.map((s, index) => ({
                    x: s.date.slice(5),// only MM-DD
                    //x: (new Date(s.date)).getFullYear(),// only MM-DD
                    y: s.amount
                }));

                setSalesData(data);
            });
        };

        fetch();
    },[clientId]);

    if (salesData.length === 0) {
        return <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>No data available</Text>
    }

    return (
        <View style={{marginVertical:12}}>
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold'}}>Sales trend</Text>
            <VictoryChart theme={VictoryTheme.material} domainPadding={20} >
                <VictoryBar data={salesData} />
            </VictoryChart>
        </View>
    );

}