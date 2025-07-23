import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Button, Chip, Dialog, FAB as Fab, Portal, Provider as PaperProvider, Snackbar, Text } from 'react-native-paper';

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
  const [showDone, setShowDone] = useState(true);
  const [snackbar, setSnackbar] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

  const fetchHabits = async () => {
    if (accessToken) {
      const res = await getHabits(accessToken);
      setHabits(res.data);
    }
  };

  useEffect(() => { fetchHabits(); }, [accessToken]);

  const today = new Date().toISOString().split('T')[0];
  const displayedHabits = useMemo(() => {
    const sorted = [...habits].sort((a, b) => {
      const aDone = a.dates?.includes(today);
      const bDone = b.dates?.includes(today);
      if (aDone === bDone) return 0;
      return aDone ? 1 : -1;
    });
    return showDone ? sorted : sorted.filter(h => !h.dates?.includes(today));
  }, [habits, showDone, today]);

  const handleAdd = async (data: any) => {
    if (accessToken) {
      await createHabit(accessToken, data);
      setFormOpen(false);
      fetchHabits();
      setSnackbar({ visible: true, message: 'Habitude ajoutée' });
    }
  };

  const handleEdit = async (data: any) => {
    if (accessToken && editHabit) {
      await updateHabit(accessToken, editHabit._id, data);
      setEditHabit(null);
      setFormOpen(false);
      fetchHabits();
      setSnackbar({ visible: true, message: 'Habitude mise à jour' });
    }
  };

  const handleDelete = async () => {
    if (accessToken && confirmDelete.id) {
      await deleteHabit(accessToken, confirmDelete.id);
      setConfirmDelete({ id: '', open: false });
      fetchHabits();
      setSnackbar({ visible: true, message: 'Habitude supprimée' });
    }
  };

  const handleMark = async (id: string) => {
    if (!accessToken) return;
    await markHabitAsDone(accessToken, id, new Date().toISOString().split('T')[0]);
    fetchHabits();
    setSnackbar({ visible: true, message: 'Bien joué !' });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Chip
          style={styles.filter}
          onPress={() => setShowDone(!showDone)}
          selected={!showDone}
        >
          {showDone ? 'Masquer faits aujourd\u2019hui' : 'Montrer faits aujourd\u2019hui'}
        </Chip>
        <FlatList
          data={displayedHabits}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <HabitItem
              habit={item}
              doneToday={item.dates?.includes(today)}
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
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ visible: false, message: '' })}
          duration={1500}
        >
          {snackbar.message}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  filter: { alignSelf: 'flex-start', marginBottom: 8 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#bbb', fontSize: 18 }
});
