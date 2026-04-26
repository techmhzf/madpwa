# Experiment 1: Flutter Hello World App

## Aim
To create a simple "Hello World" application using Flutter to understand the basic structure of a Flutter project and the usage of StatelessWidgets.

## Theory
### What is Flutter
Flutter is an open-source UI software development kit created by Google. It is used to develop cross-platform applications for Android, iOS, Linux, macOS, Windows, Google Fuchsia, and the web from a single codebase.

### Features of Flutter
- **Single Codebase**: Write once, run everywhere. Flutter allows developers to build apps for multiple platforms using a single Dart codebase.
- **Hot Reload**: Developers can see changes made to the code in real-time without restarting the app or losing the application state.
- **Cross-Platform**: Provides consistent UI and performance across different operating systems.
- **Rich Widgets**: Offers a wide range of pre-designed widgets following Material Design (Android) and Cupertino (iOS) guidelines.

## Steps to create project
1. Open the terminal and navigate to the desired workspace.
2. Run the command to create a new Flutter project:
   ```powershell
   flutter create exp1_helloworld
   ```
3. Navigate into the project directory:
   ```powershell
   cd exp1_helloworld
   ```
4. Open the project in an editor.
5. Replace the default code in `lib/main.dart` with the custom Hello World implementation.
6. Run the application using `flutter run`.

## Code
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Experiment 1',
      debugShowCheckedModeBanner: false,
      home: HelloWorldScreen(),
    );
  }
}

class HelloWorldScreen extends StatelessWidget {
  const HelloWorldScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Experiment 1'),
      ),
      body: const Center(
        child: Text(
          'Hello World',
          style: TextStyle(
            fontSize: 24,
          ),
        ),
      ),
    );
  }
}
```

## Output
The application successfully runs and displays "Hello World" in the center of the screen with an AppBar titled "Experiment 1".

## Conclusion
We have successfully created and executed a basic Flutter application, gaining a foundational understanding of Flutter's widget tree and the `StatelessWidget`.
