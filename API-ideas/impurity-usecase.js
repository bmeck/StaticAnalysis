var script = new Script("function f() {return x;}", "index.js");

// hint: 1 scope for basic script
function* getImpureAssignments(scope, ignore = new Set()) {
  if (scope.type == Scope.TYPE.WITH) {
    yield {
      type: 'WithScope',
      // will point to w/e was in with($ref)
      // since with scopes always have only 1 declaration use it
      reference: scope.declarations().next().reference()
    };
  }
  if (!ignore.has('eval')) {
    for (let call of scope.calls()) {
      let reference = call.reference();
      // calculation = property access, function invocation
      // literal = object literal of some form
      if (reference.child() === null && reference.ast.type === 'Identifier' && reference.ast.name === 'eval') {
        yield {
          type: 'eval',
          // will point to w/e was in with($ref)
          reference: reference
        };
      }
    }
  }
  // added by arguments,catch,const,let,var
  for (let declaration of scope.declarations()) {
    ignore.add(declaration.name);
  }
  for (let assignment of scope.assignments()) {
    // get left most variable of the target, ie: arr[0] => arr , a.x => a , ({}) => null
    let variable = assignment.variableRoot;
    if (variable != null) {
      if (!ignore.has(ast.name)) {
        yield {
          type: 'Assignment',
          assignment
        }
      }
    }
  }
  for (let subscope of scope.childScopes()) {
    yield* getImpureAssignments(subscope, new Set(ignore));
  }
}

for (let impurity of getImpureAssignments(script.rootScope)) {
  console.log(impurity);
}
