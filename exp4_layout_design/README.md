# Experiment 4: Flutter Layout Widgets

## Aim
To build a Flutter application demonstrating the usage of various layout widgets like `Column`, `Row`, `Container`, `Padding`, and `Expanded`.

## Theory
### What is Layout?
In Flutter, layout is the process of determining the size and position of widgets on the screen. It is a core part of building responsive and adaptive user interfaces.

### Why Layout Widgets?
Layout widgets do not have a visual representation themselves but control the positioning, sizing, and alignment of their child widgets.

### Column, Row, Container
- **Column**: Arranges children vertically.
- **Row**: Arranges children horizontally.
- **Container**: A convenience widget that combines common painting, positioning, and sizing widgets.

### Padding
Used to inscribe space around its child widget.

### Expanded
Expands a child of a `Row` or `Column` so that the child fills the available space.

### Scaffold
Implements the basic Material Design visual layout structure.

## Implementation
The UI is composed of:
- A top `Container` for the Header.
- A middle section using a `Row` with three `Expanded` `Container`s of equal width.
- A bottom `Container` for the Footer.
- `Padding` around sections for clean spacing.

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
      title: 'Layout Design',
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}
```

### lib/screens/home_screen.dart
```dart
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Layout Design'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Top Section (Header)
            Container(
              height: 100,
              color: Colors.blue,
              alignment: Alignment.center,
              child: const Text(
                'Header',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 16),
            
            // Middle Section (Row with Expanded)
            Expanded(
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      color: Colors.red,
                      alignment: Alignment.center,
                      child: const Text(
                        'Red',
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Container(
                      color: Colors.green,
                      alignment: Alignment.center,
                      child: const Text(
                        'Green',
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Container(
                      color: Colors.orange,
                      alignment: Alignment.center,
                      child: const Text(
                        'Orange',
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            
            // Bottom Section (Footer)
            Container(
              height: 100,
              color: Colors.grey,
              alignment: Alignment.center,
              child: const Text(
                'Footer',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Output
The application successfully renders a structured layout with a header, footer, and a dynamic middle section.

## Conclusion
We have successfully implemented basic layout constructs in Flutter to create a responsive user interface.
