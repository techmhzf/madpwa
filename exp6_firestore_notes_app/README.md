# Experiment 6: Firestore CRUD Notes App

## Aim
To build a real-world Notes Application using Firebase Cloud Firestore with full CRUD (Create, Read, Update, Delete) functionality.

## Theory
### What is Firestore
Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud. It keeps data in sync across client apps.

### CRUD Operations
- **Create**: Adding new documents to a collection.
- **Read**: Fetching documents (real-time via Streams).
- **Update**: Modifying existing document fields.
- **Delete**: Removing documents permanently.

### StreamBuilder
A widget that builds itself based on the latest snapshot of interaction with a `Stream`.

## Implementation
The application connects to Firestore to store notes securely:
- `Note`: Data model.
- `FirestoreService`: Handles database transactions.
- `HomeScreen`: Displays real-time updates.

## Code
### lib/models/note.dart
```dart
class Note {
  final String id;
  final String title;
  final String content;

  Note({required this.id, required this.title, required this.content});

  factory Note.fromMap(Map<String, dynamic> map, String documentId) {
    return Note(
      id: documentId,
      title: map['title'] ?? '',
      content: map['content'] ?? '',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'content': content,
    };
  }
}
```

### lib/services/firestore_service.dart
```dart
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/note.dart';

class FirestoreService {
  final CollectionReference notesCollection =
      FirebaseFirestore.instance.collection('notes');

  Future<void> addNote(String title, String content) async {
    await notesCollection.add({
      'title': title,
      'content': content,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }

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

  Future<void> updateNote(String id, String title, String content) async {
    await notesCollection.doc(id).update({
      'title': title,
      'content': content,
    });
  }

  Future<void> deleteNote(String id) async {
    await notesCollection.doc(id).delete();
  }
}
```

### lib/screens/home_screen.dart
```dart
import 'package:flutter/material.dart';
import '../models/note.dart';
import '../services/firestore_service.dart';
import 'add_edit_note.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final FirestoreService _firestoreService = FirestoreService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Notes')),
      body: StreamBuilder<List<Note>>(
        stream: _firestoreService.getNotes(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          final notes = snapshot.data ?? [];
          if (notes.isEmpty) {
            return const Center(child: Text('No notes available.'));
          }
          return ListView.builder(
            itemCount: notes.length,
            itemBuilder: (context, index) {
              final note = notes[index];
              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: ListTile(
                  title: Text(note.title, style: const TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: Text(note.content, maxLines: 2, overflow: TextOverflow.ellipsis),
                  onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => AddEditNoteScreen(note: note))),
                  onLongPress: () => _showDeleteDialog(note.id),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const AddEditNoteScreen())),
        child: const Icon(Icons.add),
      ),
    );
  }

  void _showDeleteDialog(String noteId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Note'),
        content: const Text('Are you sure you want to delete this note?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          TextButton(
            onPressed: () async {
              await _firestoreService.deleteNote(noteId);
              Navigator.pop(context);
            },
            child: const Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }
}
```

### lib/screens/add_edit_note.dart
```dart
import 'package:flutter/material.dart';
import '../models/note.dart';
import '../services/firestore_service.dart';

class AddEditNoteScreen extends StatefulWidget {
  final Note? note;

  const AddEditNoteScreen({super.key, this.note});

  @override
  State<AddEditNoteScreen> createState() => _AddEditNoteScreenState();
}

class _AddEditNoteScreenState extends State<AddEditNoteScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _titleController;
  late TextEditingController _contentController;
  final FirestoreService _firestoreService = FirestoreService();

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.note?.title ?? '');
    _contentController = TextEditingController(text: widget.note?.content ?? '');
  }

  @override
  void dispose() {
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  void _saveNote() async {
    if (_formKey.currentState!.validate()) {
      if (widget.note == null) {
        await _firestoreService.addNote(
          _titleController.text,
          _contentController.text,
        );
      } else {
        await _firestoreService.updateNote(
          widget.note!.id,
          _titleController.text,
          _contentController.text,
        );
      }
      if (mounted) {
        Navigator.pop(context);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.note != null;

    return Scaffold(
      appBar: AppBar(
        title: Text(isEditing ? 'Edit Note' : 'Add Note'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _titleController,
                decoration: const InputDecoration(
                  labelText: 'Title',
                  border: OutlineInputBorder(),
                ),
                validator: (value) =>
                    value == null || value.isEmpty ? 'Please enter a title' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _contentController,
                decoration: const InputDecoration(
                  labelText: 'Content',
                  border: OutlineInputBorder(),
                ),
                maxLines: 5,
                validator: (value) => value == null || value.isEmpty
                    ? 'Please enter content'
                    : null,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _saveNote,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(50),
                ),
                child: const Text('Save'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

## Output
The application successfully synchronizes data in real-time.

## Conclusion
We built scalable endpoints matching criteria.
