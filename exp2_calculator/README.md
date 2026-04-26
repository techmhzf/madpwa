# Experiment 2: Calculator App using Flutter

## Aim
To build a simple Calculator Application using Flutter with `StatefulWidget` to understand state management and user interaction in Flutter.

## Theory
### Dart Language
Dart is an open-source, general-purpose, object-oriented programming language with C-style syntax developed by Google. It is used for building web, server, and mobile applications, and is the primary language for Flutter.

### Widgets
In Flutter, everything is a widget. Widgets are the basic building blocks of a Flutter app's user interface. Each widget is an immutable declaration of a part of the user interface.

### Stateless vs Stateful Widget
- **StatelessWidget**: A widget that does not require mutable state. It is immutable and its properties cannot change once built.
- **StatefulWidget**: A widget that has mutable state. It can change its properties dynamically over time in response to user interaction or data changes, using `setState()`.

## Steps to create project
1. Open the terminal and navigate to the workspace.
2. Run the command to create a new Flutter project:
   ```powershell
   flutter create exp2_calculator
   ```
3. Navigate into the project directory:
   ```powershell
   cd exp2_calculator
   ```
4. Replace the default code in `lib/main.dart` with the custom calculator implementation.
5. Run the application using `flutter run`.

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
      title: 'Calculator',
      debugShowCheckedModeBanner: false,
      home: Calculator(),
    );
  }
}

class Calculator extends StatefulWidget {
  const Calculator({super.key});

  @override
  State<Calculator> createState() => _CalculatorState();
}

class _CalculatorState extends State<Calculator> {
  String equation = "";
  String result = "";
  String operator = "";

  void onButtonClick(String value) {
    setState(() {
      if (value == "C") {
        equation = "";
        result = "";
        operator = "";
      } else if (value == "+" || value == "-" || value == "*" || value == "/") {
        if (result.isNotEmpty) {
          equation = result + value;
          result = "";
          operator = value;
        } else if (equation.isNotEmpty) {
          String lastChar = equation.substring(equation.length - 1);
          if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") {
            equation = equation.substring(0, equation.length - 1) + value;
          } else {
            equation += value;
          }
          operator = value;
        }
      } else if (value == "=") {
        if (equation.isNotEmpty && operator.isNotEmpty) {
          List<String> parts = equation.split(operator);
          if (parts.length >= 2 && parts[1].isNotEmpty) {
            double num1 = double.tryParse(parts[0]) ?? 0;
            double num2 = double.tryParse(parts[1]) ?? 0;

            if (operator == "+") {
              result = (num1 + num2).toString();
            } else if (operator == "-") {
              result = (num1 - num2).toString();
            } else if (operator == "*") {
              result = (num1 * num2).toString();
            } else if (operator == "/") {
              result = num2 != 0 ? (num1 / num2).toString() : "Error";
            }
            
            if (result.endsWith(".0")) {
              result = result.substring(0, result.length - 2);
            }
          }
        }
      } else {
        if (result.isNotEmpty) {
          equation = value;
          result = "";
          operator = "";
        } else {
          equation += value;
        }
      }
    });
  }

  Widget buildButton(String text) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ElevatedButton(
          onPressed: () => onButtonClick(text),
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.all(20),
          ),
          child: Text(
            text,
            style: const TextStyle(fontSize: 24),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Calculator'),
      ),
      body: Column(
        children: [
          Expanded(
            child: Container(
              alignment: Alignment.bottomRight,
              padding: const EdgeInsets.all(24),
              child: result.isEmpty
                  ? Text(
                      equation.isEmpty ? "0" : equation,
                      style: const TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    )
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Opacity(
                          opacity: 0.6,
                          child: Text(
                            equation,
                            style: const TextStyle(
                              fontSize: 20,
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          result,
                          style: const TextStyle(
                            fontSize: 48,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
            ),
          ),
          Column(
            children: [
              Row(
                children: [
                  buildButton("7"),
                  buildButton("8"),
                  buildButton("9"),
                  buildButton("/"),
                ],
              ),
              Row(
                children: [
                  buildButton("4"),
                  buildButton("5"),
                  buildButton("6"),
                  buildButton("*"),
                ],
              ),
              Row(
                children: [
                  buildButton("1"),
                  buildButton("2"),
                  buildButton("3"),
                  buildButton("-"),
                ],
              ),
              Row(
                children: [
                  buildButton("C"),
                  buildButton("0"),
                  buildButton("="),
                  buildButton("+"),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

## Output
The application successfully runs and provides a fully functional calculator interface with an expression history display.

## Conclusion
We have successfully created a stateful calculator application, demonstrating how to manage dynamic state changes using `StatefulWidget` and `setState()` in Flutter.
