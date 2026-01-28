# Create Component Prompt with Variables

Template for creating new React components with input variables.

## Input Variables

- **COMPONENT_NAME**: The name of the component to create (e.g., "UserCard", "ProductList")
- **COMPONENT_TYPE**: Type of component (e.g., "functional", "class", "mui")
- **PROPS_INTERFACE**: Name of the props interface (optional)
- **STYLESHEET**: Whether to create a separate CSS file (true/false)
- **NEEDS_HOOKS**: Whether the component needs custom hooks (true/false)

## Instructions

Create a new React component following these requirements:

1. Create the component file in `app/components/common/{{COMPONENT_NAME}}.tsx`
2. If `STYLESHEET` is true, create a corresponding CSS module file
3. Implement proper TypeScript typing with the `{{PROPS_INTERFACE}}` interface
4. Use Material-UI v7 components if `COMPONENT_TYPE` includes "mui"
5. Add appropriate React hooks if `NEEDS_HOOKS` is true
6. Include proper JSDoc comments and prop validation

The component should be a {{COMPONENT_TYPE}} component named {{COMPONENT_NAME}} with the specified functionality.

## Expected Output

- A new component file in `app/components/common/`
- Proper TypeScript typing with interface definitions
- Component properly exported for use in other modules
- JSDoc comments explaining component usage
- Separate CSS module file if requested
