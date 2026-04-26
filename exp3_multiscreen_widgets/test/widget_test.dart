import 'package:flutter_test/flutter_test.dart';
import 'package:exp3_multiscreen_widgets/main.dart';

void main() {
  testWidgets('Multi-screen smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that our app shows the correct text.
    expect(find.text('Home Screen'), findsWidgets);
    expect(find.text('Go to Counter Screen'), findsOneWidget);
    expect(find.text('Go to Animation Screen'), findsOneWidget);
  });
}
