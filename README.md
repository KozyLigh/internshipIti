Section 13 - NgRx

NgRx Store provides reactive state management for Angular apps inspired by Redux.

Shopping-list NgRx/store
- Create shopping-list.reducer.ts inside the shopping-list folder - Reducers in NgRx are responsible for handling transitions from one state to the next state in your application
- Add logic to the reducer - The reducer function's responsibility is to handle the state transitions in an immutable way
- Create shopping-list.actions.ts inside the shopping-list folder - Actions are one of the main building blocks in NgRx. Actions express unique events that happen throughout your application
- Create a new folder called "Store" and move both files inside the Store folder
- Add shopping-list actions
- Import all the actions to the reducer with import * as ShoppingListActions from "./shopping-list.actions";
- Register the global Store within your application, use the StoreModule.forRoot() method with a map of key/value pairs that define your state.
- Add  StoreModule.forRoot({shoppingList: shoppingListReducer}) to the app.mpdul.ts
- In shopping-list.component.ts inject the ShoppingList Store, use the store to get access to all the ingredients via store.select method (get access to the state)
- In shopping-edit.component.ts also inject the ShoppingList Store, and dispatch necessary actions
- Add multiple actions and add reducer functions to reflect the new state
- Add "update" and "delete" actions, and dispatch necessary actions in shopping-edit.component.ts
- Expand ShoppingList state to application wide state in shopping-list.reducer.ts
- Add "StartEdit" and "StopEdit" actions, and dispatch necessary actions in shopping-edit.component.ts
- Since we are managing everything with NgRx store, we can remove shopping-list.service.ts file and all imports

Global NgRx/store
- Add global "store" folder to the root of the app
- Add app.reducer.ts file to the folder, this where all the component stores application state is set (collective set of slices of data)
- Configure app.reducer.ts
- Configure app.module.ts accordingly
- Update components where AppState was added with the root "Store" instead of the component store

Auth NgRx/store
- Add "store" folder to the root of the auth folder
- Add auth.reducer.ts file to the folder
- Add auth.actions.ts to the folder
- Configure auth.reducer.ts
- Add login and logout actions to the auth.actions.ts
- Add login and logout reducer functions to the auth.reducer.ts
- Dispatch auth actions to the service and components
- Remove the User subject from the service file
- Update the components where "User" state inside service with the new "User" state inside auth.reducer.ts

@ngrx/effects - In a service-based Angular application, components are responsible for interacting with external resources directly through services. Instead, effects provide a way to interact with those services and isolate them from the components. Effects are where you handle tasks such as fetching data, long-running tasks that produce multiple events, and other external interactions

Auth NgRx/effects
- Add auth.effects.ts inside auth "store" folder
- Set up AuthLogin effect
- Set up AuthLogout effect 
- Set up AuthenticateSuccess effect
- Set up AuthenticateFail effect
- Set up AuthSignup effect
- Set up AutoLogin effect
- Set up AutoLogout effect
- Set up setLogoutTimeout and clearLogoutTimeout in auth.service.ts and clean the file

@ngrx/store-devtools - Store Devtools provides developer tools and instrumentation for Store
- Install Chrome extension
- Install @ngrx/store-devtools via terminal
- Set up the module in app.module.ts and configure

@ngrx/router-store - bindings to connect the Angular Router with Store. During each router navigation cycle, multiple actions are dispatched that allow you to listen for changes in the router's state. You can then select data from the state of the router to provide additional information to your application
- Install @ngrx/router-store via terminal
- Set up the module in app.module.ts and configure


