import { Text, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';


export default function ClientChart({ clients }: { clients: any[] }) {
    if (clients.length === 0) {
        return <Text>No data available</Text>
    }
    const chartData = clients.map((c, index) => ({ x: c.name, y: index + 1 }));

    return (
        <View style={{ marginTop: 24 }}>
            <VictoryChart theme={VictoryTheme.material} domainPadding={30}>
                <VictoryBar data={chartData} />
            </VictoryChart>
        </View>
    )
}