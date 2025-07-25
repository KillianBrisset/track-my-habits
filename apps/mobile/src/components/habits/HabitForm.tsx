import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

interface HabitFormProps {
  visible: boolean;
  onSubmit: (data: { name: string; description?: string }) => void;
  onCancel: () => void;
  defaultValues?: { name?: string; description?: string };
}

export const HabitForm = ({ visible, onSubmit, onCancel, defaultValues }: HabitFormProps) => {
  const [name, setName] = useState(defaultValues?.name || '');
  const [description, setDescription] = useState(defaultValues?.description || '');

  // Reset form when modal is (re)opened
  React.useEffect(() => {
    setName(defaultValues?.name || '');
    setDescription(defaultValues?.description || '');
  }, [visible, defaultValues]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.form}>
          <Text style={styles.label}>Nom de l’habitude</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Boire de l'eau"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="(optionnel)"
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.buttons}>
            <Button 
            color={'#ef4444'}
            title="Annuler" onPress={onCancel} />
            <Button
              color={'#57c167'}
              title="Valider"
              onPress={() => onSubmit({ name, description })}
              disabled={!name.trim()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#0008', justifyContent: 'center', alignItems: 'center' },
  form: { backgroundColor: '#fff', padding: 24, borderRadius: 10, width: '90%' },
  label: { marginTop: 8, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 16, marginTop: 4,  },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { flex: 1, marginHorizontal: 4, padding: 10, borderRadius: 5},
});
