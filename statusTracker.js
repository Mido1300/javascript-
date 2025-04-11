// State Management Module
export function createStatusTracker(initialState) {
  let state = { ...initialState };
  const subscribers = [];
  
  const stateHistory = [{ ...initialState, timestamp: Date.now() }];
  
  console.log(
    '%cStatus Tracker Initialized', 
    'background: #c70000; color: white; padding: 2px 5px; border-radius: 2px;',
    initialState
  );
  return {
    getState: () => ({ ...state }),
    
    setState: (newState) => {
      const prevState = { ...state };
      state = { ...state, ...newState };
      
      stateHistory.push({ 
        ...state, 
        timestamp: Date.now(),
        changedKeys: Object.keys(newState)
      });
      
      console.log('🔄 Status Change:', {
        previous: prevState,
        changes: newState,
        current: state
      });
      
      subscribers.forEach((callback) => callback(state));
    },
    
    subscribe: (callback) => {
      subscribers.push(callback);
      console.log(`📮 New subscriber added. Total subscribers: ${subscribers.length}`);
      
      return () => {
        const index = subscribers.indexOf(callback);
        if (index !== -1) {
          subscribers.splice(index, 1);
          console.log(`🗑️ Subscriber removed. Remaining subscribers: ${subscribers.length}`);
        }
      };
    },
    
    __DEBUG_getHistory: () => [...stateHistory]
  };
}
