# Create Routes Prompt Template

Template for creating new routes in the React Router v7 application with input variables.

## Input Variables

- **ROUTE_NAME**: The name of the route (e.g., "user-management", "product-catalog")
- **ROUTE_PATH**: The URL path for the route (e.g., "/users", "/products")
- **COMPONENT_NAME**: The name of the component to be created
- **PARENT_LAYOUT**: The parent layout component (optional)
- **NEED_AUTH**: Whether the route requires authentication (true/false)

## Instructions

Create the necessary files and configurations for a new route in the React Router v7 application:

1. Create a new route component file in `app/routes/{{ROUTE_NAME}}.tsx`
2. Add the route definition to `app/routes.ts` following React Router v7 conventions
3. If needed, update navigation components to include links to the new route
4. Ensure the component follows Material-UI v7 and Tailwind CSS v4 styling standards
5. Implement proper TypeScript typing

The route should be accessible at `{{ROUTE_PATH}}` and use the component `{{COMPONENT_NAME}}`.

If `NEED_AUTH` is true, implement appropriate authentication checks.

## Expected Output

- A new route component file in `app/routes/`
- Updated `app/routes.ts` with the new route definition
- Updated navigation if required
- Properly typed and styled component following project standards
- Dont forget to add meta to route file
