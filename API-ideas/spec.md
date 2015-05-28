// ALL OPERATIONS RUN ON LOOKUP
// implementing well known types (Map/Set)
// still results in lazy lookup
ScopeMap implements Map<Number, Scope> {
}
Step {
  // list of steps that could lead to this one
  // steps could be ahead of this step
  StepSet origins();
  ScriptLocation location();
  Calculation effect();
  BranchSet branches();
}
Calculation {
  Operation operation();
  OperandSet operands();
}
OperandSet implements Set<Operand> {
}
Operand {
  // REFERENCE => Reference, from spec : 6.2.3
  // LITERAL => Value, use the value
  // RESULT => Step, grab from other Calc
  {REFERENCE,LITERAL,RESULT} type();
  Value value;
}
Reference {
  // env records should use a constant as the base?
  Value base;
  String name;
  Boolean strict;
}
StepSet implements Set<Step> {
}
BranchSet implements Set<Branch> {
}
Branch {
  // branch with higher priority than this one
  Branch primary();
  Calculation condition();
  Step target;
}
Scope implements ScopeContainer{
  {LOCAL,FUNCTION,DYNAMIC} type();
  StepSet steps();
  ScopeMap children();
  BindingMap bindings();
}
BindingMap implements Map<String, Binding> {
}
Binding {
  // things like fn f(x) => arguments[0] , x
  // calculation should return what needs to have it's binding updated
  CalculationSet mirrors();
}
Script implements ScopeContainer {
  String name();
  // see eval/Function
  Script parent();
}
ComparableLocation<Type> {
  {BEFORE,SAME,AFTER,UNRELATED} compareLocationTo(Type other);
}
