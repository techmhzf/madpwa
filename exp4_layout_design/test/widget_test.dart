import 'package:flutter_test/flutter_test.dart';
import 'package:exp4_layout_design/main.dart';

void main() {
  testWidgets('Layout smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that our app shows the correct text.
    expect(find.text('Layout Design'), findsOneWidget);
    expect(find.text('Header'), findsOneWidget);
    expect(find.text('Footer'), findsOneWidget);
  });
}
