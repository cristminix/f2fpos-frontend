# Outlet Selection Observer Pattern

This document explains how to observe and react to outlet selection changes in the application.

## How the Outlet Context Works

The application now uses a React Context to manage the selected outlet state globally. When a user selects a different outlet in the navigation dropdown, the state is updated and all subscribed components are notified.

## Method 1: Using the useOutlet Hook (Recommended)

Components can use the `useOutlet` hook to access the current selected outlet and update it:

```typescript
import React, { useEffect } from 'react';
import { useOutlet } from '~/contexts/OutletContext';

const MyComponent: React.FC = () => {
  const { selectedOutlet, outlets, setSelectedOutlet } = useOutlet();

  useEffect(() => {
    // This effect will run whenever selectedOutlet changes
    console.log('Selected outlet changed:', selectedOutlet);
    
    // Perform any actions when outlet changes
    // For example, refetch data for the new outlet
    fetchDataForOutlet(selectedOutlet);
  }, [selectedOutlet]);

  const fetchDataForOutlet = async (outletId: string) => {
    // Fetch data specific to the selected outlet
    // ...
  };

  return (
    <div>
      <p>Current Outlet ID: {selectedOutlet}</p>
      <p>Available Outlets: {outlets.length}</p>
    </div>
  );
};

export default MyComponent;
```

## Method 2: Using Custom Events

The context also dispatches a custom event `outletChanged` that can be listened to anywhere in the application:

```typescript
import React, { useEffect } from 'react';

const MyComponent: React.FC = () => {
  useEffect(() => {
    const handleOutletChange = (event: CustomEvent) => {
      const { outletId } = event.detail;
      console.log('Outlet changed via custom event:', outletId);
      
      // Perform actions when outlet changes
      refreshData(outletId);
    };

    // Listen to the custom event
    window.addEventListener('outletChanged', handleOutletChange as EventListener);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('outletChanged', handleOutletChange as EventListener);
    };
  }, []);

  const refreshData = async (outletId: string) => {
    // Refresh data based on new outlet
    // ...
  };

  return <div>My Component</div>;
};

export default MyComponent;
```

## Method 3: Using useEffect with Dependency on Outlet

For simple cases where you just need to react to outlet changes:

```typescript
import React, { useEffect, useState } from 'react';
import { useOutlet } from '~/contexts/OutletContext';

const SalesDataComponent: React.FC = () => {
  const { selectedOutlet } = useOutlet();
  const [salesData, setSalesData] = useState<any[]>([]);

  useEffect(() => {
    // This will run every time selectedOutlet changes
    fetchSalesData(selectedOutlet).then(setSalesData);
  }, [selectedOutlet]); // Dependency array includes selectedOutlet

  const fetchSalesData = async (outletId: string) => {
    // Fetch sales data for the specific outlet
    // This function will be called whenever outlet changes
    return []; // placeholder
  };

  return (
    <div>
      <h2>Sales Data for Outlet: {selectedOutlet}</h2>
      {/* Render sales data */}
    </div>
  );
};

export default SalesDataComponent;
```

## Summary

- Use `useOutlet()` hook to access outlet state and setter function
- The `useEffect` hook with `selectedOutlet` as dependency will trigger when outlet changes
- Custom events are dispatched as a fallback mechanism for components that can't use React hooks
- All changes to outlet selection should be done through the `setSelectedOutlet` function to ensure proper state management and event propagation