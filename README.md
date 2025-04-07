# @vived/core

Core Components for VIVED Apps and Hosts

## Overview

@vived/core provides foundational architecture components used across VIVED applications. This library implements a component-based architecture pattern that enables building complex applications with proper separation of concerns.

## Installation

```bash
npm install @vived/core
```

## Core Concepts

The package is built around the "AppObject" architecture, which follows a component-based design pattern:

### AppObject

- The central entity that acts as a container for components
- Each AppObject has a unique ID and belongs to an AppObjectRepo
- Components can be added, removed, and queried
- AppObjects are observable entities, notifying observers when components change

### AppObjectRepo

- Manages a collection of AppObjects 
- Provides methods to find, create, and manage AppObjects
- Handles singleton components across the application
- Includes logging infrastructure for debugging

### Component Types

The architecture implements a clean separation of concerns through specialized components:

1. **Entity (AppObjectEntity)**
   - Holds and manages application state
   - Provides change notifications when state is modified

2. **Presentation Manager (AppObjectPM)**
   - Manages view models for UI representation
   - Transforms application state into UI-ready data
   - Notifies views when view models change

3. **Use Case (AppObjectUC)**
   - Implements business logic
   - Coordinates between data layer and presentation

4. **Controller (AppObjectController)**
   - Handles external inputs (user actions, system events)
   - Delegates to appropriate use cases

5. **View (AppObjectView)**
   - UI representation components
   - Consumes view models and renders UI

## Example Usage

```typescript
// Create a repository and an app object
const repo = makeAppObjectRepo();
const appObject = repo.getOrCreate("myObject");

// Add an entity component to hold state
class MyEntity extends AppObjectEntity {
  private _value = 0;
  
  get value() { return this._value; }
  set value(newValue: number) {
    this._value = newValue;
    this.notifyOnChange();
  }
}

// Add the entity to the app object
const entity = new MyEntity(appObject, "MyEntity");

// Create a presentation manager
class MyPM extends AppObjectPM<{value: number}> {
  vmsAreEqual(a: {value: number}, b: {value: number}): boolean {
    return a.value === b.value;
  }
  
  updateViewModel() {
    const entity = this.getCachedLocalComponent<MyEntity>("MyEntity");
    if (entity) {
      this.doUpdateView({value: entity.value});
    }
  }
}

// The architecture enables clean, testable, and maintainable code
```

## Value Objects

The package provides immutable value objects for mathematical and graphical operations:

### Geometric & Mathematical Types
- **Vector2**: 2D vector with operations like addition, dot product, rotation, and unit vector calculation
- **Vector3**: 3D vector with similar operations plus cross product and coordinate transformations
- **Quaternion**: For 3D rotations with methods for creation from angles, Euler angles, and matrices plus interpolation
- **Matrix**: For transformation operations like translation, rotation, and scaling
- **Angle**: Encapsulates angle values with automatic conversion between degrees and radians
- **Rectangle**: For 2D rectangular regions with intersection testing

### Parametric Geometry
- **ParametricLine**: Represents lines with point and direction for intersection calculations
- **ParametricPlane**: Represents planes with point and normal for 3D geometric operations
- **LineSegment2D**: Represents finite line segments with intersection testing

### Graphics & Utilities
- **Color**: RGBA color representation with utility methods for conversion between formats (RGB, Hex, X11 names)
- **Version**: Semantic versioning implementation with comparison operators

## Utilities

The package also includes various utility functions:
- Color manipulation (adding alpha to hex, converting alpha to hex)
- Length converters for different measurement systems
- Linear interpolation and easing functions
- Angle conversion between degrees and radians
- File operations like downloading

## License
ISC