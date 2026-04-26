import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/note.dart';

class FirestoreService {
  final CollectionReference notesCollection =
      FirebaseFirestore.instance.collection('notes');

  // Add Note
  Future<void> addNote(String title, String content) async {
    await notesCollection.add({
      'title': title,
      'content': content,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }

  // Get Notes Stream
  Stream<List<Note>> getNotes() {
    return notesCollection
        .orderBy('timestamp', descending: true)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) {
        return Note.fromMap(doc.data() as Map<String, dynamic>, doc.id);
      }).toList();
    });
  }

  // Update Note
  Future<void> updateNote(String id, String title, String content) async {
    await notesCollection.doc(id).update({
      'title': title,
      'content': content,
    });
  }

  // Delete Note
  Future<void> deleteNote(String id) async {
    await notesCollection.doc(id).delete();
  }
}
