```
ScopeContainer {
  Scope *childScopes();
}
Script implements ScopeContainer {
  String name;
  Script parent = null;
}
Scope implements ScopeContainer {
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
  Node ast;
}
Calculation {
  Reference value;
}
Assignment implements Calculation {
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
