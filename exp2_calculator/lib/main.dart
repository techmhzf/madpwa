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
