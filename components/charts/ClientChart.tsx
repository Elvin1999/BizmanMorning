import { getClientSales } from "@/app/db/database";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { VictoryPie } from 'victory-native';

export default function ClientChart({ clients }: any) {
    console.log("CLIENT CHART",clients);
    const [chartData, setChartData] = useState<any[]>([]);


    useEffect(() => {
        (async () => {
            await loadClients();
        })();

    }, []);

    const loadClients = async () => {
        const data: any[] = [];
        for (let client of clients) {
            await getClientSales(client.id, (sales) => {
                console.log("SALES", sales);
                const totalAmount = sales.reduce((sum, s) => sum + s.amount, 0);
                if (totalAmount > 0) {
                    data.push({ x: client.name, y: totalAmount });
                }
            })
        }
        setChartData(data);
    };

    if (chartData.length === 0) {
        return <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>No data available</Text>
    }

    return (
        <View style={{ margin: 16 }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Sales Distribution by Client</Text>
            <VictoryPie
                data={chartData}
                colorScale={"qualitative"}
                labels={({ datum }) => `${datum.x}:${datum.y}`}
                style={{ labels: { fontSize: 12, padding: 10 } }}
                width={350}
                height={350}
            />
        </View>
    )
}