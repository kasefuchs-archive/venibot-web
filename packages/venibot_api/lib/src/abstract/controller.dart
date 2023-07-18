import 'package:shelf/shelf.dart';

abstract base class AbstractController {
  Handler get entryPoint;
}
