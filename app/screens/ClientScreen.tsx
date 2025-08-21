// import { getClients, initDatabase, insertClient } from "@/app/db/database";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, DataTable, IconButton, Searchbar, Snackbar, TextInput } from "react-native-paper";
import { deleteClient, getClients, initDatabase, insertClient, updateClient } from "../db/database";

const rowsPerPage = 3;

export default function ClientScreen({ navigation }: any) {
    const [clients, setClients] = useState<any[]>([]),
        [filteredClients, setFilteredClients] = useState<any[]>([]);

    const [name, setName] = useState(''),
        [phone, setPhone] = useState(''),
        [email, setEmail] = useState(''),
        [search, setSearch] = useState(''),
        [page, setPage] = useState(0),
        [editingId, setEditingId] = useState(null),
        [snackbar, setSnackbar] = useState({ visible: false, message: '' });

    useEffect(() => {
        (async () => {
            await initDatabase();
            await loadClients();
        })();

    }, []);

    const loadClients = async () => {
        await getClients((data) => {
            console.log("data", data);
            setClients(data);
            setFilteredClients(data);
        })
    };

    const showMessage = (message: string) => {
        setSnackbar({ visible: true, message: message });
    }

    const handleAddOrUpdate = () => {
        if (!name || !phone || !email) return;

        if (editingId !== null) {
            updateClient(editingId, name, phone, email).then(() => {
                showMessage('Client updated successfully');
                resetForm();
                loadClients();
            })
        }
        else {
            insertClient(name, phone, email, () => {
                showMessage('Client added successfully');
                resetForm();
                loadClients();
            });
        }
    };

    const handleEdit = (client: any) => {
        setName(client.name);
        setPhone(client.phone);
        setEmail(client.email);
        setEditingId(client.id);
    };

    const handleDelete = (id: number) => {
        deleteClient(id).then(() => {
            showMessage('Client deleted successfully');
            loadClients();
        });
    };

    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setEditingId(null);
    };

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
            <ScrollView>

                <Searchbar
                    placeholder="Search clients . . ."
                    value={search}
                    onChangeText={handleSearch}
                    style={{ marginBottom: 12 }}
                />

                <TextInput label="Name" value={name} onChangeText={setName} style={{ marginBottom: 8 }} ></TextInput>
                <TextInput label="Phone" value={phone} onChangeText={setPhone} style={{ marginBottom: 8 }} ></TextInput>
                <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 8 }} ></TextInput>

                <Button mode="contained" onPress={handleAddOrUpdate} style={{ marginBottom: 16 }}>
                    {editingId ? 'Update Client' : 'Add Client'}
                </Button>
                {editingId && <Button mode="contained" onPress={resetForm} style={{ marginBottom: 16 }}>
                    {'Cancel'}
                </Button>}

                {/* <ClientChart clients={clients} >

                </ClientChart> */}

                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Phone</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title>Actions</DataTable.Title>
                    </DataTable.Header>

                    {filteredClients.slice(from, to).map((client) => (
                        <DataTable.Row key={client.id} onPress={() => navigation.navigate('ClientDetails', { client })}>
                            <DataTable.Cell>{client.name}</DataTable.Cell>
                            <DataTable.Cell>{client.phone}</DataTable.Cell>
                            <DataTable.Cell>{client.email}</DataTable.Cell>
                            <DataTable.Cell>
                                <View style={{ flexDirection: 'row' }}>
                                    <IconButton icon="pencil" onPress={() => handleEdit(client)} />
                                    <IconButton icon="delete" onPress={() => handleDelete(client.id)} />
                                </View>
                            </DataTable.Cell>
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

                <Snackbar visible={snackbar.visible}
                    onDismiss={() => setSnackbar({ visible: false, message: '' })}
                    duration={3000}
                >
                    {snackbar.message}
                </Snackbar>
            </ScrollView>

        </SafeAreaView>
    )
}