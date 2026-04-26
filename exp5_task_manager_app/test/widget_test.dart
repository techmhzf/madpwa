import 'package:flutter_test/flutter_test.dart';
import 'package:exp5_task_manager_app/main.dart';

void main() {
  testWidgets('Task Manager smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that our app shows the correct text.
    expect(find.text('Task Manager'), findsWidgets);
    expect(find.text('Add Task'), findsOneWidget);
  });
}
