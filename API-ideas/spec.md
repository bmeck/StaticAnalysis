```
ScopeContainer {
  Scope *childScopes();
}
Script implements ScopeContainer {
  String name;
  Script parent = null;
}
Scope implements ScopeContainer {
  {WITH,GLOBAL,FUNCTION,BLOCK,CATCH} type;
  Assignment *assignments();
  Calculation *calculations();
  Call *calls();
  Variable *declarations();
  Entry *entryPoints();
  Completion *explicitCompletions();
  // TODO Branch *branches()?
}
Reference {
  {LITERAL,MEMBER,COMPLETION} type;
  Reference child;
  // LITERAL => Literal
  // MEMBER => Identifier, MemberExpression
  // COMPLETION => CallExpression
  Node ast;
}
Calculation {
  Reference value;
}
Assignment implements Calculation {
  Variable? variableRoot;
  Reference target;
}
Call {
  // TODO
}
ComparableLocation<Type> {
  {BEFORE,SAME,AFTER,UNRELATED} compareLocationTo(Type other);
}
ScriptLocation implements ComparableLocation<Location> {
  Script script;
  Number line;
  Number column;
}
Variable {
  Scope bindingScope;
  {ARGUMENT,CATCH,LET,VAR} type;
  String name;
  ScriptLocation definition;
}
Entry {
  Scope scope;
  ScriptLocation location;
}
Completion implements Calculation {
  {RETURN,THROW,YIELD} type;
}
```
