import 'package:flutter_test/flutter_test.dart';
import 'package:exp1_helloworld/main.dart';

void main() {
  testWidgets('Hello World smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that our app shows the correct text.
    expect(find.text('Hello World'), findsOneWidget);
    expect(find.text('Experiment 1'), findsWidgets); // Finds in title and AppBar
  });
}
