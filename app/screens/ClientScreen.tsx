// import { getClients, initDatabase, insertClient } from "@/app/db/database";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, DataTable, Searchbar, TextInput } from "react-native-paper";
import { getClients, initDatabase, insertClient } from "../db/database";

const rowsPerPage = 3;

export default function ClientScreen() {
    const [clients, setClients] = useState<any[]>([]),
        [filteredClients, setFilteredClients] = useState<any[]>([]);

    const [name, setName] = useState(''),
        [phone, setPhone] = useState(''),
        [email, setEmail] = useState(''),
        [search, setSearch] = useState(''),
        [page, setPage] = useState(0);

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
            setFilteredClients(data);
        })
    };

    const handleAdd = () => {
        if (name && phone && email) {
            insertClient(name, phone, email, () => {
                setName('');
                setPhone('');
                setEmail('');
                loadClients();
            });
        }
    }

    const handleSearch = (query: any) => {
        setSearch(query);

        const filtered = clients.filter(c =>
            c.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
            c.phone.includes(query) ||
            c.email.toLowerCase().includes(query.toLocaleLowerCase())
        );

        setFilteredClients(filtered);
        setPage(0);
    };

    const from = page * rowsPerPage;
    const to = Math.min((page + 1) * rowsPerPage, filteredClients.length);

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Searchbar
                placeholder="Search clients . . ."
                value={search}
                onChangeText={handleSearch}
                style={{ marginBottom: 12 }}
            />

            <TextInput label="Name" value={name} onChangeText={setName} style={{ marginBottom: 8 }} ></TextInput>
            <TextInput label="Phone" value={phone} onChangeText={setPhone} style={{ marginBottom: 8 }} ></TextInput>
            <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 8 }} ></TextInput>

            <Button mode="contained" onPress={handleAdd} style={{ marginBottom: 16 }}>
                Add new client
            </Button>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Phone</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                </DataTable.Header>

                {filteredClients.slice(from, to).map((client) => (
                    <DataTable.Row key={client.id}>
                        <DataTable.Cell>{client.name}</DataTable.Cell>
                        <DataTable.Cell>{client.phone}</DataTable.Cell>
                        <DataTable.Cell>{client.email}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(filteredClients.length / rowsPerPage)}
                    onPageChange={setPage}
                    label={`${from + 1}-${to} / ${filteredClients.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPage={rowsPerPage}
                />

            </DataTable>

        </SafeAreaView>
    )
}