# Experiment 3: Stateful, Stateless Widgets and Layout in Flutter

## Aim
To build a multi-screen Flutter application demonstrating the usage of `StatelessWidget`, `StatefulWidget`, and animations using `AnimatedContainer`, with proper file organization.

## Theory
### Why Flutter
Flutter is a popular choice for developers because it allows building high-performance, visually appealing apps for multiple platforms from a single codebase. It reduces development time and resources significantly.

### Features
- **Hot Reload**: Allows developers to see code changes instantly without losing app state.
- **Animation**: Provides robust and easy-to-use animation libraries for smooth UI transitions.
- **Cross-platform**: Single codebase for Android, iOS, Web, and Desktop.
- **Integration**: Easily integrates with existing native code.

### Components
- **Dart Framework**: A collection of libraries providing core functionality, widgets, rendering, and gestures.
- **Flutter Engine**: A portable runtime written in C++ for hosting Flutter applications, including Skia/Impeller for graphics.

### Types of Widgets
- **StatelessWidget**: Immutable widgets whose properties cannot change (e.g., `Text`, `Icon`).
- **StatefulWidget**: Mutable widgets that can maintain state and update the UI dynamically (e.g., `Checkbox`, `TextField`).

## Implementation
The application is organized into separate files for better code maintainability:
- `lib/main.dart`: Entry point of the application.
- `lib/screens/home_screen.dart`: `StatelessWidget` with navigation buttons.
- `lib/screens/counter_screen.dart`: `StatefulWidget` for counter functionality.
- `lib/screens/animation_screen.dart`: `StatefulWidget` for implicit animation.

## Code
### lib/main.dart
```dart
import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Experiment 3',
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}
```

### lib/screens/home_screen.dart
```dart
import 'package:flutter/material.dart';
import 'counter_screen.dart';
import 'animation_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const CounterScreen()),
                );
              },
              child: const Text('Go to Counter Screen'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const AnimationScreen()),
                );
              },
              child: const Text('Go to Animation Screen'),
            ),
          ],
        ),
      ),
    );
  }
}
```

### lib/screens/counter_screen.dart
```dart
import 'package:flutter/material.dart';

class CounterScreen extends StatefulWidget {
  const CounterScreen({super.key});

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Counter Screen'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Count:',
              style: TextStyle(fontSize: 24),
            ),
            Text(
              '$_counter',
              style: const TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _incrementCounter,
              child: const Text('Increment'),
            ),
          ],
        ),
      ),
    );
  }
}
```

### lib/screens/animation_screen.dart
```dart
import 'package:flutter/material.dart';
import 'dart:math';

class AnimationScreen extends StatefulWidget {
  const AnimationScreen({super.key});

  @override
  State<AnimationScreen> createState() => _AnimationScreenState();
}

class _AnimationScreenState extends State<AnimationScreen> {
  double _width = 100;
  double _height = 100;
  Color _color = Colors.blue;
  BorderRadiusGeometry _borderRadius = BorderRadius.circular(8);

  void _animate() {
    setState(() {
      final random = Random();
      _width = random.nextInt(200).toDouble() + 50;
      _height = random.nextInt(200).toDouble() + 50;
      _color = Color.fromRGBO(
        random.nextInt(256),
        random.nextInt(256),
        random.nextInt(256),
        1,
      );
      _borderRadius = BorderRadius.circular(random.nextInt(50).toDouble());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Animation Screen'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedContainer(
              width: _width,
              height: _height,
              decoration: BoxDecoration(
                color: _color,
                borderRadius: _borderRadius,
              ),
              duration: const Duration(seconds: 1),
              curve: Curves.fastOutSlowIn,
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: _animate,
              child: const Text('Animate'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Output
The application successfully navigates between the three distinct screens organized in separate files.

## Conclusion
We have successfully implemented a multi-screen application in Flutter with proper architectural separation of UI components.
