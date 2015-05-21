var script = new Script("function f() {return x;}", "index.js");

// hint: 1 scope for basic script
function* getImpureAssignments(scope, ignore = new Set()) {
  if (scope.type == Scope.TYPE.WITH) {
    yield {
      type: 'WithScope',
      // will point to w/e was in with($ref)
      reference: scope.arguments().next().reference()
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
    // get left most reference (root), ie: arr[0] => arr , a.x => a
    let root = assignment.rootReference();
    if (!ignore.has(root.name)) {
      yield {
        type: 'Assignment',
        assignment: assignment
      }
    }
  }
  for (let subscope of scope.childScopes()) {
    yield* getImpureAssignments(subscope, ignore);
  }
}

for (let impurity of getImpureAssignments(script.rootScope)) {
  console.log(impurity);
}
