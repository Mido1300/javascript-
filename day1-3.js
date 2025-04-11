// State Management Exercise
// Demonstrates state management patterns similar to those used in React

// Simple state manager implementing observer pattern
export function createStateManager(initialState = {}) {
  // Private state storage
  let state = { ...initialState };
  const listeners = [];
  const history = [{ state: { ...initialState }, timestamp: Date.now() }];
  
  // State change notification
  const notifyListeners = () => {
    listeners.forEach(listener => listener(state));
  };
  
  // Public API with closures
  return {
    // Get current state (immutable return)
    getState: () => ({ ...state }),
    
    // Update state (similar to React's setState pattern)
    setState: (update) => {
      // Support both object and function updater
      const newState = typeof update === 'function' 
        ? update(state) 
        : { ...state, ...update };
      
      // Record previous state for debugging
      const previousState = { ...state };
      
      // Update internal state
      state = newState;
      
      // Track history for time-travel debugging
      history.push({ 
        state: { ...state }, 
        previousState,
        timestamp: Date.now(),
        changedKeys: Object.keys(typeof update === 'function' ? state : update)
      });
      
      // Notify all subscribers
      notifyListeners();
      return state;
    },
    
    // Subscribe to state changes (returns unsubscribe function)
    subscribe: (listener) => {
      listeners.push(listener);
      
      // Return unsubscribe function (closure over listener reference)
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      };
    },
    
    // Reset state to initial value
    reset: () => {
      state = { ...initialState };
      history.push({ state: { ...state }, timestamp: Date.now(), reset: true });
      notifyListeners();
    },
    
    // For debugging
    getHistory: () => [...history]
  };
}

// Example usage: Creating an application state manager
const appState = createStateManager({ 
  user: null,
  theme: 'light',
  notifications: [],
  isLoading: false
});

// Subscribe to state changes
const unsubscribe = appState.subscribe(state => {
  console.log('State updated:', state);
  // This would trigger UI updates in React
});

// Example state changes
appState.setState({ isLoading: true });
appState.setState({ user: { id: 1, name: 'Alex' } });
appState.setState({ notifications: ['New message'] });
appState.setState({ isLoading: false });

// Using function updater for state that depends on previous state
appState.setState(prevState => ({
  notifications: [...prevState.notifications, 'Another notification']
}));

// Unsubscribe when component would unmount
unsubscribe();

// Access current state
console.log('Final state:', appState.getState());
