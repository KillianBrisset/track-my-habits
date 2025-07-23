import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Button, Dialog, FAB as Fab, Portal, Provider as PaperProvider, Text } from 'react-native-paper';

import { HabitForm } from '../components/habits/HabitForm';
import { HabitItem } from '../components/habits/HabitItem';
import { useAuthContext } from '../providers/AuthProvider';
import { createHabit, deleteHabit, getHabits, markHabitAsDone, updateHabit } from '../services/api';

export function HomeScreen() {
  const { accessToken } = useAuthContext();
  const [habits, setHabits] = useState<any[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editHabit, setEditHabit] = useState<any | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string, open: boolean }>({ id: '', open: false });

  const fetchHabits = async () => {
    if (accessToken) {
      const res = await getHabits(accessToken);
      setHabits(res.data);
    }
  };

  useEffect(() => { fetchHabits(); }, [accessToken]);

  const handleAdd = async (data: any) => {
    if (accessToken) {
      await createHabit(accessToken, data);
      setFormOpen(false);
      fetchHabits();
    }
  };

  const handleEdit = async (data: any) => {
    if (accessToken && editHabit) {
      await updateHabit(accessToken, editHabit._id, data);
      setEditHabit(null);
      setFormOpen(false);
      fetchHabits();
    }
  };

  const handleDelete = async () => {
    if (accessToken && confirmDelete.id) {
      await deleteHabit(accessToken, confirmDelete.id);
      setConfirmDelete({ id: '', open: false });
      fetchHabits();
    }
  };

  const handleMark = async (id: string) => {
    if (!accessToken) return;
    await markHabitAsDone(accessToken, id, new Date().toISOString().split('T')[0]);
    fetchHabits();
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <FlatList
          data={habits}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <HabitItem
              habit={item}
              onEdit={() => { setEditHabit(item); setFormOpen(true); }}
              onDelete={() => setConfirmDelete({ id: item._id, open: true })}
              onMark={() => handleMark(item._id)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchHabits} />
          }
          ListEmptyComponent={
            <View>
              <Text style={styles.empty}>Aucune habitude... Ajoute-en une !</Text>
            </View>
          }
        />

        <Fab
          icon="plus"
          style={styles.fab}
          label="Ajouter"
          onPress={() => { setEditHabit(null); setFormOpen(true); }}
        />

        {/* Formulaire d’ajout/modif */}
        <HabitForm
          visible={isFormOpen}
          onSubmit={editHabit ? handleEdit : handleAdd}
          onCancel={() => { setFormOpen(false); setEditHabit(null); }}
          defaultValues={editHabit}
        />

        {/* Dialogue de suppression */}
        <Portal>
          <Dialog visible={confirmDelete.open} onDismiss={() => setConfirmDelete({ id: '', open: false })}>
            <Dialog.Title>Supprimer l’habitude ?</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={() => setConfirmDelete({ id: '', open: false })}>Annuler</Button>
              <Button onPress={handleDelete} textColor="red">Supprimer</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#bbb', fontSize: 18 }
});
