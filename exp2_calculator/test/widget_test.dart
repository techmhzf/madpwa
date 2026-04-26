import 'package:flutter_test/flutter_test.dart';
import 'package:exp2_calculator/main.dart';

void main() {
  testWidgets('Calculator smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that our app shows the correct text.
    expect(find.text('0'), findsOneWidget);
    expect(find.text('Calculator'), findsWidgets);
  });
}
