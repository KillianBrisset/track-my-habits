import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip, IconButton, Text } from 'react-native-paper';

export const HabitItem = ({
  habit,
  onEdit,
  onDelete,
  onMark,
  doneToday = false,
}: {
  habit: any;
  onEdit: () => void;
  onDelete: () => void;
  onMark: () => Promise<void>;
  doneToday?: boolean;
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMark = async () => {
    setIsValidating(true);
    await onMark();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1200);
    setIsValidating(false);
  };

  // Dernière date validée (ISO yyyy-mm-dd)
  const lastDate : string | null = habit.dates && habit.dates.length
    ? habit.dates[habit.dates.length - 1]
    : null;

  // RightActions moved outside HabitItem and receives props
  const RightActions = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconButton icon="pencil" onPress={onEdit} />
      <IconButton icon="delete" onPress={onDelete} />
    </View>
  );

  return (
    <Card style={styles.card}>
      <Card.Title
        title={<Text>{habit.name}</Text>}
        subtitle={<Text
          style={{ color: 'gray', fontStyle: 'italic' }}>{habit.description}</Text>}
        right={() => <RightActions onEdit={onEdit} onDelete={onDelete} />}
      />
      <Card.Content>
        {lastDate && (
          <Chip style={styles.chip} icon="check-circle">
            <Text>Dernière validation : {lastDate}</Text>
          </Chip>
        )}
        {doneToday && (
          <Chip style={styles.doneChip} icon="calendar-check">
            Fait aujourd'hui
          </Chip>
        )}
      
          <TouchableOpacity
            disabled={isValidating }
            style={[
              styles.button,
              doneToday ? styles.canceledButton : {},
            ]}
            onPress={handleMark}
          >
            <Text style={styles.buttonText}>{!doneToday ? 'Marquer comme fait' : 'Marquer comme non fait'}</Text>
          </TouchableOpacity>
        
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  chip: { marginVertical: 8, alignSelf: 'flex-start' },
  doneChip: { marginVertical: 4, alignSelf: 'flex-start', backgroundColor: '#d1fae5' },
  button: {
    marginTop: 12,
    backgroundColor: '#42c37b',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  canceledButton: {
    backgroundColor: '#ef4444',
  },

  buttonText: { color: '#fff', fontWeight: 'bold' },
  lottieContainer: {
    position: 'absolute',
    right: 0, top: 0,
    zIndex: 10,
  },
  lottie: { width: 80, height: 80 },
});
