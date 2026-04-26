# Experiment 5: Navigation, Routing and Gestures using Task Manager App

## Aim
To build a real-world Task Manager application demonstrating Navigation, Named Routing, and complex Gestures (Tap, Long Press, Swipe).

## Theory
### Navigation & Routing
Navigation allows users to move between different screens. Named Routing centralizes route definitions, making large apps easier to maintain.

### Gestures
Flutter provides powerful touch interaction detection:
- **Tap**: Primary action (e.g., opening details).
- **Long Press**: Secondary action (e.g., deleting an item).
- **Swipe**: Uses the `Dismissible` widget for quick actions (e.g., marking complete).

## Implementation
- `Task` Model: Tracks task state.
- `HomeScreen`: Allows adding tasks, deleting via long press, and marking complete via swipe.
- `DetailScreen`: Displays detailed information passed via route arguments.

## Code
### lib/models/task.dart
```dart
class Task {
  String title;
  bool isCompleted;

  Task({required this.title, this.isCompleted = false});
}
```

### lib/main.dart
```dart
import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/detail_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Task Manager',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/detail': (context) => const DetailScreen(),
      },
    );
  }
}
```

### lib/screens/home_screen.dart
```dart
import 'package:flutter/material.dart';
import '../models/task.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Task> _tasks = [];
  final TextEditingController _controller = TextEditingController();

  void _addTask() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _tasks.add(Task(title: _controller.text));
        _controller.clear();
      });
    }
  }

  void _deleteTask(int index) {
    setState(() {
      _tasks.removeAt(index);
    });
  }

  void _toggleComplete(int index) {
    setState(() {
      _tasks[index].isCompleted = !_tasks[index].isCompleted;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Manager'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      labelText: 'Enter Task',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: _addTask,
                  child: const Text('Add Task'),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: _tasks.length,
                itemBuilder: (context, index) {
                  final task = _tasks[index];
                  return Dismissible(
                    key: Key(task.title + index.toString()),
                    background: Container(
                      color: Colors.green,
                      alignment: Alignment.centerLeft,
                      padding: const EdgeInsets.only(left: 20.0),
                      child: const Icon(Icons.check, color: Colors.white),
                    ),
                    confirmDismiss: (direction) async {
                      _toggleComplete(index);
                      return false;
                    },
                    child: GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(
                          context,
                          '/detail',
                          arguments: task,
                        );
                      },
                      onLongPress: () {
                        _deleteTask(index);
                      },
                      child: Card(
                        child: ListTile(
                          title: Text(
                            task.title,
                            style: TextStyle(
                              decoration: task.isCompleted
                                  ? TextDecoration.lineThrough
                                  : null,
                            ),
                          ),
                          trailing: Icon(
                            task.isCompleted
                                ? Icons.check_circle
                                : Icons.radio_button_unchecked,
                            color: task.isCompleted ? Colors.green : null,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### lib/screens/detail_screen.dart
```dart
import 'package:flutter/material.dart';
import '../models/task.dart';

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final task = ModalRoute.of(context)!.settings.arguments as Task;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Details'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Card(
            elevation: 4,
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    task.title,
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    task.isCompleted ? 'Status: Completed' : 'Status: Pending',
                    style: TextStyle(
                      fontSize: 18,
                      color: task.isCompleted ? Colors.green : Colors.orange,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: const Text('Go Back'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```

## Output
The application flawlessly manages tasks dynamically.

## Conclusion
We successfully designed state-dependent interactive pipelines.
